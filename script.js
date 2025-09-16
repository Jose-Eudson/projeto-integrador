let treinos = [];
let nextId = 1;

const getById = (id) => document.getElementById(id);

const exerciciosJSON = {
  "exercicios": [
    "Supino Reto",
    "Triceps Corda",
    "PullDown",
    "Esteira",
    "Bicicleta",
    "Agachamento Livre",
    "Leg Press",
    "Puxada Frente na Barra Guiada",
    "Rosca Direta com Barra",
    "Rosca Alternada com Halteres",
    "Elevação Lateral",
    "Remada Curvada",
    "Stiff",
    "Abdutor na Máquina",
    "Prancha Abdominal"
  ]
};

function popularListaExercicios() {
  const datalist = getById("listaExercicios");
  exerciciosJSON.exercicios.forEach(exercicio => {
    const option = document.createElement("option");
    option.value = exercicio;
    datalist.appendChild(option);
  });
}

getById("btnAdd").addEventListener("click", adicionarTreino);

function adicionarTreino() {
  const nome = getById("nome").value.trim();
  const exercicio = getById("exercicio").value.trim();
  const series = getById("series").value.trim();
  const repeticoes = getById("reps").value.trim();

  if (!nome || !exercicio || !series || !repeticoes) {
    alert("Preencha todos os campos.");
    return;
  }

  treinos.push({
    id: nextId++,
    nome,
    exercicio,
    series,
    repeticoes,
    concluido: false,
  });

  limparCampos();
  render();
}

function limparCampos() {
  getById("exercicio").value = "";
  getById("series").value = "";
  getById("reps").value = "";
  getById("exercicio").focus();
}

function render() {
  const container = getById("listaTreinos");
  container.innerHTML = "";

  const grupos = treinos.reduce((listaTreinosPassados, treinos) => {
    (listaTreinosPassados[treinos.nome] = listaTreinosPassados[treinos.nome] || []).push(treinos);
    return listaTreinosPassados;
  }, {});

  Object.keys(grupos).forEach((nome) => {
    const card = document.createElement("div");
    card.className = "aluno-card";

    const title = document.createElement("div");
    title.className = "aluno-title";
    title.textContent = `Aluno: ${nome}`;
    card.appendChild(title);

    grupos[nome].forEach((treinos) => {
      const row = document.createElement("div");
      row.className = "treino-row" + (treinos.concluido ? " concluido" : "");

      const info = document.createElement("span");
      info.textContent = `${treinos.exercicio} - ${treinos.series}x${treinos.repeticoes}`;

      const acoes = document.createElement("div");
      acoes.className = "acoes";

      const btnConcluir = document.createElement("button");
      btnConcluir.className = "btn";
      btnConcluir.textContent = treinos.concluido ? "Reabrir" : "Concluir";
      btnConcluir.onclick = () => {
        treinos.concluido = !treinos.concluido;
        render();
      };

      const btnRemover = document.createElement("button");
      btnRemover.className = "btn danger";
      btnRemover.textContent = "Remover";
      btnRemover.onclick = () => {
        treinos = treinos.filter((listaTreinoAtual) => listaTreinoAtual.id !== treinos.id);
        render();
      };

      acoes.append(btnConcluir, btnRemover);
      row.append(info, acoes);
      card.appendChild(row);
    });

    container.appendChild(card);
  });

  renderRelatorio();
}

function renderRelatorio() {
  const tabelaRelatorio = getById("tabelaRelatorio");
  tabelaRelatorio.innerHTML = "";
  
  const alunosUnicos = [...new Set(treinos.map(treino => treino.nome))];
  const totalAlunos = alunosUnicos.length;
  
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>Mensal</td>
    <td>${totalAlunos}</td>
  `;
  tabelaRelatorio.appendChild(row);
}

document.addEventListener("DOMContentLoaded", popularListaExercicios);