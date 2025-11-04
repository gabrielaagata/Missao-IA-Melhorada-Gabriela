const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");


// A CORREÇÃO PRINCIPAL: o array 'perguntas' deve ser um array de OBJETOS, não um array de arrays.
// Removida a primeira camada de colchetes: [ [ ... ] ] -> [ ... ]
const perguntas = [
    {
        "enunciado": "Como você controla os gastos mensais?",
        "alternativas": [
            {
                "texto": "Aplicativos de controle financeiro (planilhas digitais, apps de orçamento).",
                "afirmacao": [
                    "Você acredita que registrar tudo em tempo real ajuda a evitar surpresas no fim do mês.",
                    "Você prefere centralizar as despesas em um só lugar para acompanhar o orçamento.",
                    "Você acha mais prático usar tecnologia para controlar as finanças do que métodos tradicionais."
                ]
            },
            {
                "texto": "Anotações à mão em um caderno ou agenda física.",
                "afirmacao": [
                    "Você acredita que escrever reforça a consciência dos gastos.",
                    "Você sente que escrever manualmente ajuda a refletir melhor sobre cada despesa.",
                    "Você prefere o método físico por sentir que ele melhora o foco e a disciplina."
                ]
            }
        ]
    },
    {
        "enunciado": "Quando recebe um dinheiro extra (salário bônus, devolução), qual é sua primeira atitude?",
        "alternativas": [
            {
                "texto": "Guardar parte para uma reserva de emergência ou objetivo futuro.",
                "afirmacao": [
                    "Você vê isso como uma oportunidade de aumentar sua segurança financeira.",
                    "Você prioriza criar uma reserva de emergência para imprevistos.",
                    "Você usa o dinheiro extra para manter seus objetivos financeiros em dia."
                ]
            },
            {
                "texto": "Usar imediatamente para pagar dívidas ou realizar algum desejo imediato.",
                "afirmacao": [
                    "Você prefere usar o dinheiro extra para alívio imediato ou satisfação pessoal.",
                    "Você acredita que pagar dívidas logo resolve o estresse financeiro.",
                    "Você acha que realizar desejos imediatos melhora seu bem-estar no momento."
                ]
            }
        ]
    },
    {
        "enunciado": "Como você costuma decidir quanto vai poupar a cada mês?",
        "alternativas": [
            {
                "texto": "Definir um percentual fixo da renda (ex.: 15% do salário).",
                "afirmacao": [
                    "Você acredita que reservar uma porcentagem fixa facilita a economia.",
                    "Você vê isso como uma maneira simples de automatizar a poupança.",
                    "Você acha que definir um valor fixo ajuda a criar o hábito de economizar."
                ]
            },
            {
                "texto": "Avaliar as despesas do mês e poupar o que sobrar depois de pagar tudo.",
                "afirmacao": [
                    "Você adapta a poupança conforme as variações de gasto do mês.",
                    "Você prefere ajustar a poupança de acordo com o que sobrar após as despesas.",
                    "Você acha mais flexível poupar depois de pagar todas as contas."
                ]
            }
        ]
    },
    {
        "enunciado": "Quando recebe um crédito em cartão de loja, qual a sua postura?",
        "alternativas": [
            {
                "texto": "Pagar a fatura integralmente no vencimento para evitar juros.",
                "afirmacao": [
                    "Você prioriza evitar juros, mesmo que precise usar parte da reserva.",
                    "Você prefere pagar a fatura inteira para manter o crédito saudável.",
                    "Você acredita que pagar integralmente evita surpresas financeiras."
                ]
            },
            {
                "texto": "Aproveitar o parcelamento e pagar apenas o mínimo, usando o dinheiro para outras necessidades imediatas.",
                "afirmacao": [
                    "Você prefere ter flexibilidade no fluxo de caixa, mesmo pagando juros.",
                    "Você vê o parcelamento como uma forma de resolver necessidades imediatas.",
                    "Você acredita que o parcelamento facilita o orçamento no curto prazo."
                ]
            }
        ]
    },
    {
        "enunciado": "Qual estratégia você usa para controlar gastos supérfluos?",
        "alternativas": [
            {
                "texto": "Criar 'limites de despesa' por categoria (lazer, delivery, roupas) em um aplicativo de orçamento.",
                "afirmacao": [
                    "Você acredita que limites ajudam a manter o orçamento equilibrado.",
                    "Você prefere ter um controle rígido sobre cada categoria de gasto.",
                    "Você acha mais fácil controlar os limites de cada categoria usando um app."
                ]
            },
            {
                "texto": "Esperar 24 horas antes de fazer uma compra não planejada e reavaliar a real necessidade.",
                "afirmacao": [
                    "Você acredita que o tempo de espera evita compras impulsivas.",
                    "Você usa esse intervalo para avaliar se a compra realmente vale a pena.",
                    "Você sente que essa estratégia ajuda a focar no que é realmente necessário."
                ]
            }
        ]
    }
];


let atual = 0;
let perguntaAtual;
let historiaFinal = ""; // Inicializado como string vazia

function mostraPergunta() {

    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    // Acessa o objeto de pergunta diretamente
    perguntaAtual = perguntas[atual]
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        // Usa uma função de callback para garantir que a alternativa correta seja capturada
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;

    // CORREÇÃO: Junta os itens do array de afirmações em uma única string, separados por espaço.
    // Isso garante que você está concatenando uma string à história final.
    historiaFinal += afirmacoes.join(" ") + " ";
    
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    // Altera a classe da caixa principal para estilizar o resultado, se necessário
    caixaPrincipal.classList.add("resultado-final"); 
    caixaPerguntas.textContent = "Se fosse possível manter suas contas sob controle, o resultado final poderá valer a pena?";
    
    // CORREÇÃO VISUAL: Se você quer que as afirmações apareçam em linhas separadas no HTML
    // use <br> ou crie parágrafos no lugar de um texto gigante.
    textoResultado.textContent = historiaFinal.trim(); 
    caixaAlternativas.textContent = "";
}

mostraPergunta();