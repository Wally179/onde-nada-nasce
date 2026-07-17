const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

// Get configured AI instance
const getAI = (customKey) => {
  return new GoogleGenAI({ apiKey: customKey || process.env.GEMINI_API_KEY });
};

// All candidate models for generateContent
const ALL_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
];

// Sorted model order (populated by benchmark, default fallback order)
let sortedModels = ['gemini-3-flash-preview', 'gemini-2.0-flash', 'gemini-3.1-flash-lite'];
let benchmarkResults = null;

const SYSTEM_PROMPT = `Você é o Mestre de Jogo (Narrador) de um RPG de texto de survival horror psicológico cósmico chamado "Onde Nada Nasce". Sua função é interpretar a ação livre do jogador, calcular a viabilidade com base nos atributos dos personagens e retornar EXCLUSIVAMENTE um objeto JSON válido, avançando a narrativa.

[O MUNDO E O CONTEXTO HISTÓRICO]
1. O jogo se passa no Brasil, em maio de 1994. 
2. A tecnologia é analógica: não existem telefones celulares, internet ou smartphones. A comunicação à distância é feita estritamente por Telefones Públicos (Orelhões da Telesp) usando fichas.
3. O país vive o caos da transição para o Plano Real e a histeria midiática do sequestro do pai do Romário. As autoridades estão ocupadas. O protagonista está institucionalmente isolado.

[A NATUREZA DO HORROR: A EROSÃO DA REALIDADE]
Esta é a regra de ouro da sua narrativa. O horror do jogo NÃO vem de monstros com garras ou sangue. O horror vem da AUSÊNCIA absoluta e implacável.
1. A ameaça não é um espaço oco ou um monstro, é uma força ativa e silenciosa de apagamento da realidade e das leis da física.
2. Quando a anomalia ataca, descreva a privação sensorial DE FORMA SUTIL. O som não "fica baixo", ele cessa artificialmente, como uma fita pausada. A luz não "apaga", o espaço simplesmente não reflete fótons.
3. Cause fobia através da falta de detalhes e da quebra do cotidiano. Em um lugar afetado, o café perde o calor, a textura da parede parece irreal, a gravidade pesa de forma errada.
4. Os NPCs afetados não gritam nem viram zumbis. Eles entram em dissociação psicológica profunda. Perdem a expressão, deixam de piscar e bloqueiam a quebra cognitiva com apatia mecânica.
5. SUTILEZA ABSOLUTA (REGRA DE OURO): NUNCA use a palavra "Nada" ou "Vazio" de forma forçada, clichê ou como trocadilho (ex: NÃO DIGA "cheiro de nada", "olhou para o nada" ou "o Vazio atacou"). Evite até mesmo capitalizar e nomear a entidade. Descreva O EFEITO de sua passagem: descreva o que deixou de existir, como "o ar estéril que queima os pulmões", "a ausência de temperatura", ou "a estática morta no rádio". Deixe o horror nas entrelinhas.

[OS PERSONAGENS E ATRIBUTOS]
1. Protagonista (Estudante de História): Inteligência máxima. Sagaz, investigativo, mas fraco fisicamente.
2. Mecânica (A Musa Cética): Agilidade e Carisma máximos. Resolve problemas sociais, burla sistemas e fura filas.
3. Ed. Física (O Muro): Força máxima e Instinto. Intimida, protege fisicamente e arromba portas.
Sempre julgue a intenção do jogador cruzando com quem o está acompanhando.

[REGRAS MECÂNICAS DA AÇÃO LIVRE]
1. Magia, tecnologia moderna, invocar armas do nada ou agir fora dos anos 90 são TERMINANTEMENTE INVÁVEIS. O jogador drena sanidade tentando isso por dissonância cognitiva.
2. Armas comuns são inúteis contra sombras ou o Vazio.
3. Se a ação envolve um item escondido ou um caminho oculto listado no contexto da cena, e a dedução foi inteligente, APROVE.
4. NUNCA permita que o jogador mate NPCs aliados sem consequências irreversíveis.
5. DESSENSIBILIZAÇÃO E SANIDADE: Avalie a Sanidade atual do jogador. Quanto MENOR a sanidade, mais ele alucina e mais influenciado pela anomalia ele é nas descrições. PORÉM, ele sofre CADA VEZ MENOS dano de sanidade em eventos assustadores comuns (ele já se machucou tanto que está dormente). Só aplique danos altos (5+) em situações de horror extremo.

[FORMATO DE SAÍDA OBRIGATÓRIO]
Sua resposta deve ser ÚNICA e EXCLUSIVAMENTE um objeto JSON válido, NENHUM texto fora do JSON é permitido. Use este schema exato:
{
  "approved": boolean (true se a ação foi inteligente/viável, false caso contrário),
  "narrative": "A descrição imersiva do resultado, mantendo o tom opressivo e sutil. Se approved for false, explique imersivamente por que falhou.",
  "sanityCost": inteiro (0 para neutro, número positivo (ex: 5) para dano mental em falhas. NUNCA aplique cura de sanidade, o Vazio não cura),
  "staminaCost": inteiro (custo de energia para ações físicas),
  "itemFound": "nome do item ganho, se houver, senão null",
  "itemLost": "nome do item perdido, se houver, senão null",
  "hiddenPathFound": "ID do nó se um caminho secreto for descoberto e a ação tiver sido aprovada, senão null"
}`;

/**
 * Benchmark a single model. Returns { model, latencyMs } or { model, error }.
 */
async function benchmarkModel(model, customKey) {
  const start = Date.now();
  try {
    const ai = getAI(customKey);
    await ai.models.generateContent({
      model,
      contents: 'Responda apenas: {"ok":true}',
      config: {
        temperature: 0,
        maxOutputTokens: 10,
        responseMimeType: 'application/json',
      },
    });
    const latencyMs = Date.now() - start;
    return { model, latencyMs, available: true };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const isRateLimit = err.status === 429 || err.message?.includes('RESOURCE_EXHAUSTED');
    return { model, latencyMs, available: false, error: isRateLimit ? 'rate_limited' : err.message };
  }
}

/**
 * GET /api/free-action/benchmark
 * Tests all models in parallel and returns them sorted by speed.
 * Also caches the sorted order for subsequent free-action calls.
 */
router.get('/benchmark', async (req, res) => {
  console.log('[benchmark] Starting model benchmark...');
  
  // Run all benchmarks in parallel for speed
  const results = await Promise.all(ALL_MODELS.map(m => benchmarkModel(m)));
  
  // Sort: available models first (by latency), then unavailable ones
  results.sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    return a.latencyMs - b.latencyMs;
  });
  
  // Update the cached sorted order (only available models)
  const availableModels = results.filter(r => r.available).map(r => r.model);
  if (availableModels.length > 0) {
    sortedModels = availableModels;
  }
  
  benchmarkResults = results;
  
  console.log('[benchmark] Results:', results.map(r => 
    `${r.model}: ${r.available ? r.latencyMs + 'ms' : 'UNAVAILABLE (' + r.error + ')'}`
  ).join(', '));
  console.log('[benchmark] Model order:', sortedModels.join(' → '));
  
  res.json({
    models: results,
    sortedOrder: sortedModels,
  });
});

/**
 * Calls Gemini using the benchmark-sorted model order.
 * On rate limit, skips to next model immediately (no waiting).
 */
async function callGemini(userPrompt, customKey) {
  const errors = [];
  const ai = getAI(customKey);
  
  for (const model of sortedModels) {
    try {
      console.log(`[free-action] Using model: ${model}`);
      const start = Date.now();
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });
      console.log(`[free-action] ${model} responded in ${Date.now() - start}ms`);
      return response.text;
    } catch (err) {
      const isRateLimit = err.status === 429 || err.message?.includes('RESOURCE_EXHAUSTED');
      const isNotFound = err.status === 404;
      
      console.log(`[free-action] ${model} failed: ${isRateLimit ? 'rate limited' : isNotFound ? 'not found' : err.message}`);
      errors.push({ model, error: err.message });
      
      // Skip to next model immediately — don't wait on rate limits
      continue;
    }
  }
  
  throw new Error(`All models failed: ${errors.map(e => e.model).join(', ')}`);
}

router.post('/', async (req, res) => {
  try {
    const { action, nodeContext, playerStats, inventory, companion, customKey, playerProfile } = req.body;

    if (!action || !nodeContext) {
      return res.status(400).json({ error: 'action e nodeContext são obrigatórios.' });
    }

    // Build the user prompt with full scene context
    const userPrompt = `CONTEXTO DA CENA:
- Local: ${nodeContext.location}
- Descrição: ${nodeContext.baseDescription}
- Detalhes do ambiente: ${nodeContext.freeActionContext?.environmentDetails || 'Não especificado'}
- Itens escondidos neste local: ${JSON.stringify(nodeContext.freeActionContext?.hiddenItems || [])}
- Ações possíveis esperadas: ${JSON.stringify(nodeContext.freeActionContext?.possibleActions || [])}
- Ações proibidas: ${JSON.stringify(nodeContext.freeActionContext?.forbiddenActions || [])}
- Caminhos ocultos: ${JSON.stringify(nodeContext.freeActionContext?.hiddenPaths || [])}
- NPCs presentes: ${JSON.stringify(nodeContext.npcsPresentes || [])}
- Restrições do nó: ${nodeContext.fourthOptionConstraints || 'Nenhuma'}

ESTADO DO JOGADOR:
- Nome: ${playerProfile?.name || 'Desconhecido'}
- Gênero/Apresentação: ${playerProfile?.gender || 'Masculino'}
- Pronomes que a IA DEVE USAR: ${playerProfile?.pronouns || 'Ele/Dele'}. ATENÇÃO: Concorde em gênero, número e grau todas as descrições fisiológicas ou psicológicas usando rigidamente os pronomes escolhidos (${playerProfile?.pronouns || 'Ele/Dele'}).
- Stats: HP ${playerStats.hp}/${playerStats.maxHp}, Sanidade ${playerStats.sanity}, Stamina ${playerStats.stamina}
- Força: ${playerStats.strength}, Agilidade: ${playerStats.agility}, Inteligência: ${playerStats.intelligence}, Carisma: ${playerStats.charisma}
- Inventário: ${JSON.stringify(inventory)}
- Companheiro: ${companion || 'Nenhum'}

AÇÃO DO JOGADOR: "${action}"

Avalie esta ação e responda APENAS com o JSON especificado.`;

    const responseText = await callGemini(userPrompt, customKey);

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response:', responseText);
      result = {
        approved: false,
        narrative: 'Algo estranho acontece. Sua mente falha ao processar a ação e você sente um arrepio na espinha. Melhor tentar outra coisa.',
        sanityCost: 3,
        staminaCost: 0,
        itemFound: null,
        itemLost: null,
        hiddenPathFound: null,
      };
    }

    // Validate and sanitize the response
    const sanitizedResult = {
      approved: !!result.approved,
      narrative: typeof result.narrative === 'string' ? result.narrative : 'Nada acontece.',
      sanityCost: Math.min(Math.max(Number(result.sanityCost) || 0, 0), 20),
      staminaCost: Math.min(Math.max(Number(result.staminaCost) || 0, 0), 30),
      itemFound: typeof result.itemFound === 'string' ? result.itemFound : null,
      itemLost: typeof result.itemLost === 'string' ? result.itemLost : null,
      hiddenPathFound: typeof result.hiddenPathFound === 'string' ? result.hiddenPathFound : null,
    };

    res.json(sanitizedResult);
  } catch (err) {
    console.error('Free action error:', err);
    
    res.json({
      approved: false,
      narrative: 'Um zumbido estático preenche seus ouvidos por um instante. Você balança a cabeça — deve ter sido impressão. Tente algo diferente.',
      sanityCost: 2,
      staminaCost: 0,
      itemFound: null,
      itemLost: null,
      hiddenPathFound: null,
    });
  }
});

module.exports = router;
