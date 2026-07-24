import { CutsceneData } from '../../types/cutscene';

export const introCutscene: CutsceneData = {
  id: 'intro',
  allowSkip: true,
  transitionDurationMs: 800,
  slides: [
    // --- Slide 1: Data e local ---
    {
      id: 'slide-1',
      effect: 'fade',
      alignment: 'center',
      durationMs: 0,
      lines: [
        { content: '2 de maio de 1994', className: 'text-2xl font-bold mb-2', delayMs: 0 },
        { content: 'Butantã, São Paulo', className: 'text-lg text-gray-400', delayMs: 400 },
      ],
    },

    // --- Slide 2: O cenário ---
    {
      id: 'slide-2',
      effect: 'typewriter',
      alignment: 'left',
      durationMs: 0,
      lines: [
        { content: 'Na penumbra de uma república estudantil no Butantã,', delayMs: 0 },
        { content: 'entre pilhas de livros de História e cinzeiros transbordando,', delayMs: 150 },
        { content: 'um aluno do sexto semestre da USP encara uma noite como qualquer outra.', delayMs: 150 },
      ],
    },

    // --- Slide 3: A carta chega ---
    {
      id: 'slide-3',
      effect: 'typewriter',
      alignment: 'left',
      durationMs: 0,
      lines: [
        { content: 'Mas entre as contas atrasadas e os panfletos do DCE,', delayMs: 0 },
        { content: 'há algo diferente no correio desta noite — uma carta.', delayMs: 150 },
        { content: '', delayMs: 300 },
        { content: 'O remetente é um nome que a família aprendeu a não pronunciar há muito tempo:', delayMs: 200 },
        { content: 'Maria, a tia-avó que ninguém mais visitava.', delayMs: 200 },
      ],
    },

    // --- Slide 4: Quem era Maria ---
    {
      id: 'slide-4',
      effect: 'typewriter',
      alignment: 'left',
      durationMs: 0,
      lines: [
        { content: 'A tia-avó Maria sempre foi reservada e misteriosa.', delayMs: 0 },
        { content: 'Nunca se casou, nem teve filhos.', delayMs: 150 },
        { content: 'Sempre preferiu viver longe dos olhos curiosos da sociedade.', delayMs: 150 },
        { content: '', delayMs: 250 },
        { content: 'Era uma das herdeiras da fortuna da família,', delayMs: 150 },
        { content: 'mas isso nunca a interessou verdadeiramente.', delayMs: 150 },
        { content: 'Mudou-se para uma pequena cidade no interior de São Paulo,', delayMs: 150 },
        { content: 'onde viveu isolada por anos.', delayMs: 150 },
      ],
    },

    // --- Slide 5: Os rumores ---
    {
      id: 'slide-5',
      effect: 'typewriter',
      alignment: 'left',
      durationMs: 0,
      lines: [
        { content: 'Ninguém sabia ao certo o que a motivou. Mas havia rumores.', delayMs: 0 },
        { content: '', delayMs: 250 },
        { content: 'Alguns diziam que ela havia descoberto segredos inimagináveis', delayMs: 150 },
        { content: 'sobre a família e sobre a história da cidade.', delayMs: 150 },
        { content: 'Outros, que havia se envolvido com práticas ocultas.', delayMs: 150 },
        { content: 'Outros ainda, que havia encontrado tesouros escondidos.', delayMs: 150 },
        { content: '', delayMs: 200 },
        { content: 'Ninguém sabia ao certo a verdade.', delayMs: 200 },
      ],
    },

    // --- Slide 6: O esquecimento ---
    {
      id: 'slide-6',
      effect: 'typewriter',
      alignment: 'left',
      durationMs: 0,
      lines: [
        { content: 'Os anos passaram e Maria ficou cada vez mais reclusa,', delayMs: 0 },
        { content: 'até se tornar praticamente uma lenda urbana.', delayMs: 150 },
        { content: '', delayMs: 250 },
        { content: 'Muitos já haviam se esquecido dela.', delayMs: 150 },
        { content: 'Até que um dia, misteriosamente, você recebe uma carta...', delayMs: 300 },
      ],
    },

    // --- Slide 7: A Carta (parte 1) ---
    {
      id: 'slide-7',
      effect: 'fade',
      alignment: 'center',
      durationMs: 0,
      className: 'cutscene-letter-slide',
      lines: [
        { content: 'Caro herdeiro,', delayMs: 0, className: 'text-2xl mb-3 font-bold' },
        { content: '', delayMs: 500 },
        { content: 'Sou eu, sua tia-avó, a solitária senhora que vive', delayMs: 700 },
        { content: 'isolada na pequena vila do interior de São Paulo.', delayMs: 700 },
        { content: 'Espero que esta carta o encontre bem,', delayMs: 700 },
        { content: 'pois o que tenho a lhe dizer é de extrema importância.', delayMs: 700 },
        { content: '', delayMs: 500 },
        { content: 'Eu posso parecer uma senhora louca e rica apenas,', delayMs: 800 },
        { content: 'mas sou portadora de conhecimentos', delayMs: 700 },
        { content: 'que poucos conseguem compreender.', delayMs: 700 },
      ],
    },

    // --- Slide 8: A Carta (parte 2) ---
    {
      id: 'slide-8',
      effect: 'fade',
      alignment: 'center',
      durationMs: 0,
      className: 'cutscene-letter-slide',
      lines: [
        { content: 'Agora, é chegada a hora de você saber que o que', delayMs: 0 },
        { content: 'herdarás de mim é mais do que um simples objeto', delayMs: 700 },
        { content: 'de valor material e grande quantidade de dinheiro.', delayMs: 700 },
        { content: '', delayMs: 500 },
        { content: 'É uma herança maldita, repleta de sombras', delayMs: 800 },
        { content: 'e mistérios que poucos conseguem suportar.', delayMs: 700 },
        { content: '', delayMs: 500 },
        { content: 'Você precisa vir até a minha vila,', delayMs: 800 },
        { content: 'mas saiba que, terá que temer nada.', delayMs: 700 },
      ],
    },

    // --- Slide 9: A Carta (parte 3) ---
    {
      id: 'slide-9',
      effect: 'fade',
      alignment: 'center',
      durationMs: 0,
      className: 'cutscene-letter-slide',
      lines: [
        { content: 'Se decidir vir, procure pela casa de madeira', delayMs: 0 },
        { content: 'na beira do rio, se preocupe com nada.', delayMs: 700 },
        { content: '', delayMs: 500 },
        { content: 'Se tiver coragem de enfrentar o desconhecido,', delayMs: 800 },
        { content: 'poderá ser o próximo a descobrir', delayMs: 700 },
        { content: 'os terríveis segredos da nossa linhagem.', delayMs: 700 },
        { content: 'Mas saiba que, uma vez que tiver o conhecimento,', delayMs: 700 },
        { content: 'nunca mais será o mesmo.', delayMs: 700 },
        { content: '', delayMs: 600 },
        { content: 'Com pesar e medo,', delayMs: 900, className: 'mt-4 text-xl' },
        { content: 'Sua tia-avó.', delayMs: 800, className: 'text-2xl font-bold' },
      ],
    },
  ],
};
