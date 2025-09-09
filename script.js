let treinos = [];
let nextId = 1;

const $ = (id) => document.getElementById(id);

$("btnAdd").addEventListener("click", adicionarTreino);

function adicionarTreino() {
  const nome = $("nome").value.trim();
  const exercicio = $("exercicio").value.trim();
  const series = $("series").value.trim();
  const repeticoes = $("reps").value.trim();

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
  $("exercicio").value = "";
  $("series").value = "";
  $("reps").value = "";
  $("exercicio").focus();
}

function render() {
  const container = $("listaTreinos");
  container.innerHTML = "";

  const grupos = treinos.reduce((acc, t) => {
    (acc[t.nome] = acc[t.nome] || []).push(t);
    return acc;
  }, {});

  Object.keys(grupos).forEach((nome) => {
    const card = document.createElement("div");
    card.className = "aluno-card";

    const title = document.createElement("div");
    title.className = "aluno-title";
    title.textContent = `Aluno: ${nome}`;
    card.appendChild(title);

    grupos[nome].forEach((t) => {
      const row = document.createElement("div");
      row.className = "treino-row" + (t.concluido ? " concluido" : "");

      const info = document.createElement("span");
      info.textContent = `${t.exercicio} - ${t.series}x${t.repeticoes}`;

      const acoes = document.createElement("div");
      acoes.className = "acoes";

      const btnConcluir = document.createElement("button");
      btnConcluir.className = "btn";
      btnConcluir.textContent = t.concluido ? "Reabrir" : "Concluir";
      btnConcluir.onclick = () => {
        t.concluido = !t.concluido;
        render();
      };

      const btnRemover = document.createElement("button");
      btnRemover.className = "btn danger";
      btnRemover.textContent = "Remover";
      btnRemover.onclick = () => {
        treinos = treinos.filter((x) => x.id !== t.id);
        render();
      };

      acoes.append(btnConcluir, btnRemover);
      row.append(info, acoes);
      card.appendChild(row);
    });

    container.appendChild(card);
  });
}
