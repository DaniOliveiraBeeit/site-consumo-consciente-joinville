// =========================================================
// Consumo Consciente Joinville - script principal
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('aberto');
    });
  }

  /* ---------- Acordeão (dicas.html) ---------- */
  var cabecas = document.querySelectorAll('.acordeao-cabeca');
  cabecas.forEach(function (cabeca) {
    cabeca.addEventListener('click', function () {
      var item = cabeca.closest('.acordeao-item');
      item.classList.toggle('aberto');
    });
  });

  /* ---------- Quiz (quiz.html) ---------- */
  var quizEl = document.getElementById('quiz-app');
  if (quizEl) {
    iniciarQuiz(quizEl);
  }

  /* ---------- Calculadora (calculadora.html) ---------- */
  var calcEl = document.getElementById('calc-app');
  if (calcEl) {
    iniciarCalculadora(calcEl);
  }
});

/* =========================================================
   QUIZ
   ========================================================= */

function iniciarQuiz(root) {
  var perguntas = [
    {
      pergunta: "Sobre o cenário da reciclagem no Brasil e a realidade local, assinale a alternativa correta:",
      opcoes: [
        "A maioria dos municípios brasileiros, incluindo Joinville, recicla mais de 50% dos resíduos gerados.",
        "O Brasil recicla apenas cerca de 4% dos materiais recicláveis gerados, o que torna a redução de consumo a prioridade.",
        "A reciclagem gasta menos energia do que a reutilização, sendo o método mais eficiente de preservação.",
        "Todo papel gerado nos domicílios pode ser reciclado, independente do nível de contaminação orgânica."
      ],
      correta: 1,
      explicacao: "Infelizmente, a taxa de reciclagem real no Brasil gira em torno de 4%, reforçando a importância de gerar menos lixo (reduzir)."
    },
    {
      pergunta: "A Política dos '3 Rs' estabelece uma hierarquia de ações. Qual a aplicação correta no dia a dia visando o maior impacto positivo?",
      opcoes: [
        "Reciclar embalagens de uso único para compensar a extração de novas matérias-primas.",
        "Reutilizar embalagens de vidro e plástico sempre antes de pensar em reciclá-las ou reduzi-las.",
        "Reduzir o consumo na origem para evitar a geração do lixo, economizando mais recursos que a própria reciclagem.",
        "Equilibrar os 3 Rs, pois Reciclar e Reduzir têm exatamente o mesmo impacto ambiental e energético."
      ],
      correta: 2,
      explicacao: "Reduzir é o topo da hierarquia, pois evita todo o gasto de água, energia e matérias-primas da cadeia produtiva."
    },
    {
      pergunta: "Uma caixa de pizza de papelão suja de óleo e restos de queijo sobrou do fim de semana. Qual o destino correto segundo as diretrizes de coleta?",
      opcoes: [
        "Deve ir para o lixo reciclável, pois o papelão é 100% reciclável e altamente valorizado.",
        "Deve ir para o lixo comum (rejeito), pois a gordura contamina as fibras de celulose no processo de reciclagem.",
        "Deve ser lavada com água quente e sabão, seca ao sol e depois enviada para a reciclagem.",
        "Deve ser entregue nos Ecopontos (PEVs) específicos, que tratam apenas papelão engordurado."
      ],
      correta: 1,
      explicacao: "Papel engordurado ou sujo inviabiliza a reciclagem e pode estragar todo um lote de papéis limpos."
    },
    {
      pergunta: "Você precisa descartar um liquidificador queimado, lâmpadas fluorescentes e pilhas velhas em Joinville. Qual a atitude correta?",
      opcoes: [
        "Colocar no lixo reciclável no dia em que o caminhão da Ambiental passa no seu bairro.",
        "Descartar no lixo comum, já que a coleta seletiva porta a porta não recolhe metais.",
        "Procurar um Ecoponto (PEV) ou ponto de logística reversa em lojas e supermercados cadastrados na cidade.",
        "Desmontar os aparelhos para separar o plástico, descartando os circuitos eletrônicos no lixo comum."
      ],
      correta: 2,
      explicacao: "Eletrônicos, pilhas e lâmpadas contêm materiais tóxicos e devem ser entregues apenas nos PEVs e logística reversa (SAMA)."
    },
    {
      pergunta: "Ao observarmos o impacto de copos e sacolas plásticas, por que a opção por não consumi-los (reduzir) é tão mais sustentável que apenas reciclá-los?",
      opcoes: [
        "Porque o plástico flexível de sacolas não pode ser reciclado sob nenhuma hipótese tecnológica.",
        "Porque a decomposição do plástico no aterro sanitário libera mais gás metano que a decomposição orgânica.",
        "Porque a redução evita toda a cadeia de extração de petróleo e o gasto energético que a reciclagem não consegue anular.",
        "Porque atualmente a reciclagem de plástico em Joinville está temporariamente suspensa por lei municipal."
      ],
      correta: 2,
      explicacao: "Mesmo que o material seja reciclado depois, a redução zera as emissões de produção, transporte e reciclagem."
    },
    {
      pergunta: "Em Joinville, a Coleta Seletiva (gerida pela Ambiental) recolhe os materiais porta a porta. Qual dos grupos abaixo é 100% aceito neste tipo de coleta?",
      opcoes: [
        "Garrafas PET, embalagens de shampoo, latinhas de alumínio e potes de vidro limpos.",
        "Lâmpadas de LED, garrafas de vidro limpo e pilhas alcalinas gastas.",
        "Bandejas de isopor com restos de comida, papel higiênico e sacolas plásticas.",
        "Baterias de celular, latas de alumínio, potes plásticos e caixas de papelão."
      ],
      correta: 0,
      explicacao: "Vidro, plástico, papel e metal LIMPOS vão no caminhão da Ambiental. Lâmpadas, pilhas e eletrônicos vão para Ecopontos."
    }
  ];

  var indice = 0;
  var acertos = 0;
  var respondida = false;

  root.innerHTML =
    '<div class="quiz-progresso"><div class="quiz-progresso-barra" id="quiz-barra"></div></div>' +
    '<div id="quiz-corpo"></div>';

  var corpo = root.querySelector('#quiz-corpo');
  var barra = root.querySelector('#quiz-barra');

  function renderPergunta() {
    respondida = false;
    var p = perguntas[indice];
    barra.style.width = ((indice) / perguntas.length * 100) + '%';

    var html = '<div class="badge">Pergunta ' + (indice + 1) + ' de ' + perguntas.length + '</div>';
    html += '<div class="quiz-pergunta">' + p.pergunta + '</div>';
    html += '<div class="quiz-opcoes">';
    p.opcoes.forEach(function (opcao, i) {
      html += '<button class="quiz-opcao" data-i="' + i + '">' + opcao + '</button>';
    });
    html += '</div><div class="quiz-feedback" id="quiz-feedback"></div>';
    html += '<div style="text-align:right; margin-top:18px;"><button class="btn btn-primario" id="quiz-avancar" disabled>' +
      (indice === perguntas.length - 1 ? 'Ver resultado' : 'Próxima pergunta') + '</button></div>';

    corpo.innerHTML = html;

    var botoes = corpo.querySelectorAll('.quiz-opcao');
    var feedback = corpo.querySelector('#quiz-feedback');
    var avancar = corpo.querySelector('#quiz-avancar');

    botoes.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (respondida) return;
        respondida = true;
        var i = parseInt(btn.getAttribute('data-i'), 10);
        botoes.forEach(function (b) { b.setAttribute('disabled', 'true'); });

        if (i === p.correta) {
          btn.classList.add('correta');
          acertos++;
          feedback.textContent = '✅ Certo! ' + p.explicacao;
        } else {
          btn.classList.add('incorreta');
          botoes[p.correta].classList.add('correta');
          feedback.textContent = '❌ Quase! ' + p.explicacao;
        }
        avancar.removeAttribute('disabled');
      });
    });

    avancar.addEventListener('click', function () {
      if (indice < perguntas.length - 1) {
        indice++;
        renderPergunta();
      } else {
        renderResultado();
      }
    });
  }

  function renderResultado() {
    barra.style.width = '100%';
    var pct = Math.round((acertos / perguntas.length) * 100);
    var mensagem;
    if (pct >= 80) {
      mensagem = 'Excelente! Você já pensa como um consumidor consciente. 🌱';
    } else if (pct >= 50) {
      mensagem = 'Bom começo! Ainda dá para aprimorar alguns hábitos. ♻️';
    } else {
      mensagem = 'Vale a pena revisitar a página de Dicas para aprender mais. 📖';
    }

    corpo.innerHTML =
      '<div class="quiz-resultado">' +
      '<div class="badge">Resultado</div>' +
      '<div class="valor">' + acertos + '/' + perguntas.length + '</div>' +
      '<p style="font-size:1.05rem; margin: 10px 0 26px;">' + mensagem + '</p>' +
      '<button class="btn btn-outline" id="quiz-refazer">Refazer o quiz</button>' +
      '</div>';

    corpo.querySelector('#quiz-refazer').addEventListener('click', function () {
      indice = 0;
      acertos = 0;
      renderPergunta();
    });
  }

  renderPergunta();
}

/* =========================================================
   CALCULADORA DE IMPACTO
   ========================================================= */

function iniciarCalculadora(root) {
  // Estimativas educativas simplificadas (valores aproximados para fins didáticos)
  var FATORES = {
    papel: { porUnidade: 0.005, unidade: 'kg de papel/mês' },     // folhas de papel por mês -> kg
    sacolas: { porUnidade: 0.008, unidade: 'kg de plástico/mês' }, // sacolas plásticas por mês -> kg
    copos: { porUnidade: 0.003, unidade: 'kg de plástico/mês' }    // copos descartáveis por mês -> kg
  };

  function calcular(folhas, sacolas, copos) {
    var kgPapelEvitado = folhas * FATORES.papel.porUnidade;
    var kgPlasticoEvitado = (sacolas * FATORES.sacolas.porUnidade) + (copos * FATORES.copos.porUnidade);
    var kgTotalMes = kgPapelEvitado + kgPlasticoEvitado;
    var kgTotalAno = kgTotalMes * 12;
    // 1 árvore adulta ~ referência didática: cada ~24kg de papel reciclado representa
    // uma fração do consumo evitado de celulose (valor aproximado para fins educativos)
    var arvoresPreservadas = kgPapelEvitado > 0 ? (kgPapelEvitado * 12) / 24 : 0;

    return {
      kgTotalMes: kgTotalMes,
      kgTotalAno: kgTotalAno,
      arvoresPreservadas: arvoresPreservadas
    };
  }

  function atualizar() {
    var folhas = parseInt(root.querySelector('#slider-papel').value, 10);
    var sacolas = parseInt(root.querySelector('#slider-sacolas').value, 10);
    var copos = parseInt(root.querySelector('#slider-copos').value, 10);

    root.querySelector('#valor-papel').textContent = folhas;
    root.querySelector('#valor-sacolas').textContent = sacolas;
    root.querySelector('#valor-copos').textContent = copos;

    var r = calcular(folhas, sacolas, copos);

    root.querySelector('#res-mes').textContent = r.kgTotalMes.toFixed(1) + ' kg';
    root.querySelector('#res-ano').textContent = r.kgTotalAno.toFixed(1) + ' kg';
    root.querySelector('#res-arvores').textContent = r.arvoresPreservadas.toFixed(2);
  }

  ['slider-papel', 'slider-sacolas', 'slider-copos'].forEach(function (id) {
    var el = root.querySelector('#' + id);
    if (el) el.addEventListener('input', atualizar);
  });

  atualizar();
}
