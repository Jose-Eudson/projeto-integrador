const alunos = []

document.getElementById('filtroAluno').addEventListener('submit', function(e) 
    {e.preventDefault();

    const nome = document.getElementById("nome").value;
    const exercicio = document.getElementById("exercicio").value;

    let dados = {
        nome, exercicio
    }

    alunos.push(dados)

    e.target.reset();
})

function filtrarDados() {
    const filtro = document.getElementById('filtroAluno').value.trim().toLowerCase()

    const dadosFiltrados = dados.filter(p => p.nome.toLowerCase().includes(filtro) || p.exercicio.toLowerCase().includes(filtro));
    
    filtrarDados(dadosFiltrados)
}