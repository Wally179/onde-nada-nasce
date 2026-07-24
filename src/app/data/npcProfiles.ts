import { NpcProfile } from '../types/game';

export const npcProfiles: Record<string, NpcProfile> = {
  mecanica: {
    id: 'mecanica',
    nomeReal: 'Débora Santos',
    codinome: 'Mecânica',
    idade: 22,
    aparencia: 'Cabelo escuro preso com uma bandana, jaqueta de couro surrada, olhos intensos. Bonita de um jeito intimidador (estilo Angelina Jolie em Hackers).',
    personalidade: 'Cética, sarcástica, esperta. Não acredita em nada sobrenatural. Usa humor ácido como escudo. Debaixo da casca dura, é leal até a morte por quem confia. Tem uma vibe sutil de tensão romântica com o Protagonista (possibilidade de romance que transcende gêneros, não importa quem jogue).',
    passado: 'Cresceu consertando carros com o pai na oficina em Osasco. O pai faliu a oficina e ela não tem grana pra nada além do aluguel dividido da república.',
    motivoCurso: 'Engenharia Mecânica (4º ano, USP). Sempre foi fascinada por máquinas. Quer provar que domina qualquer área técnica.',
    relacaoProtagonista: 'Mora na mesma república. Admira a inteligência dele mas acha que ele vive no mundo da lua. É quase um trisal sutil na república entre ela, o protagonista e o Muro, mas de forma muito implícita e leve.',
    porqueSeImporta: 'O protagonista é o único que nunca a tratou como "a mina da república" e sim como igual intelectual. Se ele sumir, ela vai atrás.',
    medos: 'Ter que voltar pra Osasco sem diploma. Ser vista como fracassada.',
    oQueSabe: 'Nada sobre o sobrenatural. Conhece a história da tia-avó apenas pelo que o protagonista contar.',
    oQueNuncaFaria: 'Acreditar em maldições sem provas concretas. Abandonar um amigo. Chorar na frente dos outros.',
    estiloDeFala: 'Gírias paulistanas dos anos 90, direta, sarcástica.',
    atributos: {
      hp: 20, maxHp: 20, sanity: 100, stamina: 100, strength: 3, agility: 10, intelligence: 7, charisma: 8
    }
  },
  muro: {
    id: 'muro',
    nomeReal: 'Renan Oliveira',
    codinome: 'Muro',
    idade: 24,
    aparencia: 'Alto, largo, braços grossos. Usa regata e bermuda o ano inteiro. Tem uma cicatriz no joelho direito.',
    personalidade: 'Calado, leal, age primeiro e pensa depois. Protetor instintivo. É chamado de Muro porque é forte igual uma parede, mas na verdade é porque ele é "burro" igual uma parede. Também tem uma dinâmica de romance sutil e flexível com o grupo.',
    passado: 'Veio do interior de Minas. Jogava futebol semi-profissional mas estourou o joelho.',
    motivoCurso: 'Educação Física (3º ano, USP). Foi o plano B pra continuar no esporte depois de machucar o joelho.',
    relacaoProtagonista: 'Considera ele o "irmão mais novo intelectual". Eles jogam sinuca juntos no bar da esquina.',
    porqueSeImporta: 'O protagonista foi o único que não riu quando ele reprovou em cálculo e o ajudou a passar. Paga dívidas de lealdade com a vida.',
    medos: 'Ser inútil. Não conseguir proteger quem importa.',
    oQueSabe: 'Nada sobre o sobrenatural. Conhece a tia-avó apenas de nome.',
    oQueNuncaFaria: 'Fugir de uma briga. Falar sobre sentimentos abertamente. Deixar alguém ser agredido na sua frente.',
    estiloDeFala: 'Poucas palavras, frases curtas, sotaque mineiro leve.',
    atributos: {
      hp: 30, maxHp: 30, sanity: 100, stamina: 100, strength: 10, agility: 7, intelligence: 2, charisma: 5
    }
  },
  tia_maria: {
    id: 'tia_maria',
    nomeReal: 'Maria Aparecida de Souza',
    codinome: 'Tia Maria',
    idade: 78,
    aparencia: 'Idosa com olhar profundamente vazio. Segura uma velha caixa no colo com as últimas forças. A cidade ao seu redor está sombria e fantasma pelos efeitos dessa Caixa.',
    personalidade: 'Mente estilhaçada. Mistura extrema lucidez investigativa do passado com o terror cósmico do presente.',
    passado: 'Quando jovem, era uma jornalista destemida que investigava um Culto ao Vazio. Ela descobriu a Caixa e a roubou para proteger as pessoas que ama desse culto. Fugiu para o interior para se isolar com a maldição, aguentando o fardo sozinha por décadas.',
    motivoCurso: 'N/A',
    relacaoProtagonista: 'Tia-avó distante, mas o escolheu como sucessor.',
    porqueSeImporta: 'Ela está morrendo devido à proximidade prolongada com o Vazio da Caixa. Escolheu o protagonista não por maldade, mas por ele ser um jovem muito inteligente e estudante de História. Ela tem uma esperança desesperada de que ele, como historiador, consiga encontrar um jeito de destruir a Caixa, algo que ela falhou em fazer.',
    medos: 'Que o Vazio devore o mundo e que o culto pegue a Caixa de volta.',
    oQueSabe: 'Sabe da existência do Culto ao Vazio e da natureza destruidora da Caixa, embora a Caixa tenha afetado sua capacidade de falar sobre isso de forma linear.',
    oQueNuncaFaria: 'Sair da varanda (as últimas forças dela estão focadas apenas em entregar a caixa e evitar que o Vazio escape enquanto ela morre).',
    estiloDeFala: 'Frases arrastadas, intercaladas com tosse. Foca na palavra Nada. Soa como um farol se apagando no escuro.',
    atributos: {
      hp: 1, maxHp: 10, sanity: 5, stamina: 1, strength: 1, agility: 1, intelligence: 10, charisma: 1
    }
  }
};
