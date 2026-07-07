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
      pergunta: "Qual dessas atitudes representa melhor o 'consumo consciente'?",
      opcoes: [
        "Comprar sempre que houver promoção, mesmo sem necessidade",
        "Pensar se realmente precisa do produto antes de comprar",
        "Trocar de celular a cada seis meses",
        "Usar sacola plástica nova em cada compra"
      ],
      correta: 1,
      explicacao: "Consumo consciente começa por perguntar: eu preciso mesmo disso?"
    },
    {
      pergunta: "O que significa a ordem dos '3 Rs' da sustentabilidade?",
      opcoes: [
        "Reciclar, Reciclar, Reciclar",
        "Repor, Remover, Reaproveitar",
        "Reduzir, Reutilizar, Reciclar",
        "Reformar, Reduzir, Repassar"
      ],
      correta: 2,
      explicacao: "Reduzir o consumo vem antes de reutilizar; reciclar é o último recurso."
    },
    {
      pergunta: "Por que reduzir o consumo é mais eficaz do que apenas reciclar?",
      opcoes: [
        "Porque reciclagem não funciona no Brasil",
        "Porque reduzir evita gastar recursos naturais e energia na produção",
        "Porque reciclar é proibido em Santa Catarina",
        "Não há diferença entre as duas opções"
      ],
      correta: 1,
      explicacao: "Reduzir evita que o recurso precise ser extraído e processado desde o início."
    },
    {
      pergunta: "Qual é uma forma simples de reutilizar materiais no dia a dia?",
      opcoes: [
        "Jogar potes de vidro no lixo comum",
        "Usar folhas de caderno só de um lado e descartar",
        "Usar potes de vidro e caixas como organizadores ou vasos",
        "Comprar embalagens descartáveis para guardar comida"
      ],
      correta: 2,
      explicacao: "Potes, caixas e vidros podem ganhar uma segunda vida em casa."
    },
    {
      pergunta: "Na coleta seletiva, papel sujo de gordura (como caixa de pizza) deve ir para:",
      opcoes: [
        "Lixo reciclável (papel)",
        "Lixo comum/orgânico, pois contamina a reciclagem",
        "Deve ser lavado e reciclado normalmente",
        "Qualquer lixeira, tanto faz"
      ],
      correta: 1,
      explicacao: "Papel engordurado contamina o processo de reciclagem e deve ir para o lixo comum."
    },
    {
      pergunta: "Qual atitude ajuda a evitar o desperdício de recursos e dinheiro ao mesmo tempo?",
      opcoes: [
        "Planejar as compras e evitar excessos",
        "Comprar em grande quantidade mesmo sem necessidade",
        "Trocar produtos que ainda funcionam por modelos novos",
        "Ignorar a validade dos alimentos"
      ],
      correta: 0,
      explicacao: "Planejar compras reduz desperdício de alimentos, dinheiro e embalagens."
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
