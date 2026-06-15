let perguntas = [
  {
    questao: "Qual prática ajuda a preservar o solo?",
    opcoes: ["Queimar restos da colheita", "Rotação de culturas", "Uso excessivo de agrotóxicos"],
    resposta: 1
  },
  {
    questao: "Qual fonte de energia é renovável?",
    opcoes: ["Carvão mineral", "Energia solar", "Petróleo"],
    resposta: 1
  },
  {
    questao: "O que significa sustentabilidade no agro?",
    opcoes: ["Produzir sem pensar no futuro", "Equilibrar produção e meio ambiente", "Usar mais agrotóxicos"],
    resposta: 1
  },
  {
    questao: "Qual prática reduz o consumo de água na agricultura?",
    opcoes: ["Irrigação por gotejamento", "Inundar o campo", "Usar água sem controle"],
    resposta: 0
  },
  {
    questao: "Qual destes contribui para a biodiversidade?",
    opcoes: ["Monocultura intensiva", "Agrofloresta", "Uso indiscriminado de pesticidas"],
    resposta: 1
  },
  {
    questao: "Qual é um exemplo de energia limpa usada no campo?",
    opcoes: ["Energia eólica", "Diesel", "Carvão"],
    resposta: 0
  },
  {
    questao: "O que ajuda a reduzir a emissão de gases do efeito estufa?",
    opcoes: ["Plantio de árvores", "Queimadas", "Uso excessivo de fertilizantes químicos"],
    resposta: 0
  }
];

let perguntaAtual = 0;
let score = 0;
let terminou = false;
let feedback = null;
let feedbackTimer = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  desenharFundo();

  if (terminou) {
    fill(0);
    textSize(24);
    text("Fim do Quiz!", width/2, height/2 - 40);
    text("Pontuação final: " + score, width/2, height/2);
    return;
  }

  let p = perguntas[perguntaAtual];
  textSize(20);
  fill(0);
  text(p.questao, width/2, 50);

  for (let i = 0; i < p.opcoes.length; i++) {
    let x = width/2 - 150;
    let y = 120 + i*70;
    let w = 300;
    let h = 50;

    fill(180);
    rect(x, y, w, h, 10);
    fill(0);
    text(p.opcoes[i], width/2, y + 25);

    if (feedback !== null && feedback.index === i) {
      if (feedback.correto) {
        fill(0, 200, 0, 150); // verde
      } else {
        fill(200, 0, 0, 150); // vermelho
      }
      rect(x, y, w, h, 10);
      fill(255);
      text(p.opcoes[i], width/2, y + 25);
    }
  }

  textSize(16);
  fill(0);
  text("Pontuação: " + score, width/2, height - 30);

  if (feedback !== null && millis() - feedbackTimer > 1000) {
    perguntaAtual++;
    feedback = null;
    if (perguntaAtual >= perguntas.length) {
      terminou = true;
    }
  }
}

function mousePressed() {
  if (terminou || feedback !== null) return;

  let p = perguntas[perguntaAtual];
  for (let i = 0; i < p.opcoes.length; i++) {
    let x = width/2 - 150;
    let y = 120 + i*70;
    let w = 300;
    let h = 50;
    if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
      let correto = (i === p.resposta);
      if (correto) score += 10;
      feedback = {index: i, correto: correto};
      feedbackTimer = millis();
    }
  }
}

function desenharFundo() {
  background(135, 206, 235); // céu azul

  // Sol
  fill(255, 255, 0);
  ellipse(80, 80, 80, 80);

  // Nuvens
  fill(255);
  ellipse(200, 100, 80, 50);
  ellipse(240, 100, 80, 50);
  ellipse(220, 80, 80, 50);

  ellipse(400, 70, 100, 60);
  ellipse(450, 70, 100, 60);
  ellipse(425, 50, 100, 60);

  // Grama
  fill(34, 139, 34);
  rect(0, height-50, width, 50);

  // Plantas simples
  for (let i = 50; i < width; i += 100) {
    stroke(0);
    line(i, height-50, i, height-80);
    fill(0, 200, 0);
    ellipse(i, height-85, 20, 20);
    ellipse(i-10, height-75, 20, 20);
    ellipse(i+10, height-75, 20, 20);
  }
}
