const alunos = [];

document.getElementById('btnAdd').addEventListener('click', function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensalidade = document.getElementById("mensalidade").value;
    const data = document.getElementById("data").value;
    const exercicio = document.getElementById("exercicio").value;
    const series = document.getElementById("series").value;
    const reps = document.getElementById("reps").value;

    if (!nome || !mensalidade || !data) {
        alert("Preencha nome, mensalidade e data.");
        return;
    }

    // Verifica se o aluno já existe com nome e data iguais
    const alunoExistente = alunos.find(aluno =>
        aluno.nome.toLowerCase() === nome.toLowerCase() &&
        aluno.data === data
    );

    if (alunoExistente) {
        // Atualiza apenas os dados do treino (sem alterar a mensalidade)
        alunoExistente.exercicio = exercicio;
        alunoExistente.series = series;
        alunoExistente.reps = reps;
    } else {
        // Adiciona novo aluno
        const novoAluno = {
            nome,
            mensalidade,
            data,
            exercicio,
            series,
            reps
        };
        alunos.push(novoAluno);
    }

    // Limpa os campos
    document.getElementById("nome").value = '';
    document.getElementById("mensalidade").value = '';
    document.getElementById("data").value = '';
    document.getElementById("exercicio").value = '';
    document.getElementById("series").value = '';
    document.getElementById("reps").value = '';

    exibirRelatorio(alunos);
});


document.getElementById('filtrar').addEventListener('click', function (e) {
    e.preventDefault();

    const nomeFiltro = document.getElementById("filtroNome").value.trim().toLowerCase();
    const mensalidadeFiltro = document.getElementById("filtroMensalidade").value;

    const dadosFiltrados = alunos.filter(aluno => {
        const nomeMatch = aluno.nome.toLowerCase().includes(nomeFiltro);
        const mensalidadeMatch = mensalidadeFiltro ? aluno.mensalidade === mensalidadeFiltro : true;
        return nomeMatch && mensalidadeMatch;
    });

    exibirRelatorio(dadosFiltrados);
});

function exibirRelatorio(dados) {
    const tabelaRelatorio = document.getElementById('tabelaRelatorio');
    tabelaRelatorio.innerHTML = '';

    if (dados.length === 0) {
        tabelaRelatorio.innerHTML = '<tr><td colspan="2">Nenhum aluno encontrado.</td></tr>';
        return;
    }

    const planosContagem = {};

    dados.forEach(aluno => {
        planosContagem[aluno.mensalidade] = (planosContagem[aluno.mensalidade] || 0) + 1;
    });

    for (const plano in planosContagem) {
        tabelaRelatorio.innerHTML += `
            <tr>
                <td>${plano}</td>
                <td>${planosContagem[plano]}</td>
            </tr>
        `;
    }

    tabelaRelatorio.innerHTML += `
        <tr>
            <td colspan="2"><strong>Detalhes dos alunos</strong></td>
        </tr>
    `;

    dados.forEach(aluno => {
        tabelaRelatorio.innerHTML += `
            <tr>
                <td colspan="2">
                    <strong>Nome:</strong> ${aluno.nome} <br>
                    <strong>Plano:</strong> ${aluno.mensalidade} <br>
                    <strong>Data:</strong> ${aluno.data} <br>
                    ${aluno.exercicio ? `<strong>Exercício:</strong> ${aluno.exercicio} <br>` : ''}
                    ${aluno.series ? `<strong>Séries:</strong> ${aluno.series} <br>` : ''}
                    ${aluno.reps ? `<strong>Repetições:</strong> ${aluno.reps}` : ''}
                </td>
            </tr>
        `;
    });
}
