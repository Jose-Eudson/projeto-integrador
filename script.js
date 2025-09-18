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
  const mensalidade = getById("mensalidade").value;
  const data = getById("data").value;
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
    mensalidade,
    data,
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

  const grupos = treinos.reduce((listaTreinosPassados, treino) => {
    (listaTreinosPassados[treino.nome] = listaTreinosPassados[treino.nome] || []).push(treino);
    return listaTreinosPassados;
  }, {});

  Object.keys(grupos).forEach((nome) => {
    const card = document.createElement("div");
    card.className = "aluno-card";

    const title = document.createElement("div");
    title.className = "aluno-title";
    title.textContent = `Aluno: ${nome}`;
    card.appendChild(title);

    grupos[nome].forEach((treino) => {
      const row = document.createElement("div");
      row.className = "treino-row" + (treino.concluido ? " concluido" : "");

      const info = document.createElement("span");
      info.textContent = `${treino.exercicio} - ${treino.series}x${treino.repeticoes}`;

      const acoes = document.createElement("div");
      acoes.className = "acoes";

      const btnConcluir = document.createElement("button");
      btnConcluir.className = "btn";
      btnConcluir.textContent = treino.concluido ? "Reabrir" : "Concluir";
      btnConcluir.onclick = () => {
        treino.concluido = !treino.concluido;
        render();
      };

      const btnRemover = document.createElement("button");
      btnRemover.className = "btn danger";
      btnRemover.textContent = "Remover";
      btnRemover.onclick = () => {
        treinos = treinos.filter((listaTreinoAtual) => listaTreinoAtual.id !== treino.id);
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

  const planos = treinos.reduce((acc, treino) => {
    if (!acc[treino.mensalidade]) {
      acc[treino.mensalidade] = new Set();
    }
    acc[treino.mensalidade].add(treino.nome);
    return acc;
  }, {});

  Object.keys(planos).forEach((plano) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${plano}</td>
      <td>${planos[plano].size}</td>
    `;
    tabelaRelatorio.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", popularListaExercicios);
