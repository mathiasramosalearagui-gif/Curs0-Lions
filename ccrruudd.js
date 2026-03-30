const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let proximoId = 1;
let alunos = [];

function mostrarMenu() {
    console.log("\n==========================================");
    console.log("SISTEMA ESCOLAR");
    console.log("==========================================");
    console.log("1 - Cadastrar Aluno");
    console.log("2 - Listar Aluno");
    console.log("3 - Buscar por ID");
    console.log("4 - Atualizar Aluno");
    console.log("5 - Remover Aluno");
    console.log("6 - Montrar Alunos Aprovados");
    console.log("7 - Montrar Alunos Reprovados");
    console.log("0 - Sair");
    console.log("=========================================");

    rl.question("Escolha uma opção:", (opcao) => {
        if (opcao === "1") {
            cadastrarAluno();
        } else if (opcao === "2") {
            listarAluno();
        } else if (opcao === "3") {
            buscarAlunoPorId();
        }
    })
}

function cadastrarAluno() {
    console.log("Cadastrar Aluno");

    rl.question("Digite o nome do Aluno:", (nome) => {
        rl.question("Digite a idade do Aluno:", (idade) => {
            rl.question("Digite a turma do Aluno:", (turma) => {
                rl.question("Digite a nota do Aluno:", (nota) => {
                    idade = Number(idade)
                    nota = Number(nota)

                    if (nome === "" || idade === "" || turma === "" || nota === "") {
                        console.log("ERRO n°138: Não preencheu todas as informações");
                        mostrarMenu();
                        return;
                    }

                    if (idade <= 0 || nota < 0 || nota > 10) {
                        console.log("ERRO n°012: Nota ou idade inválido");
                        mostrarMenu();
                        return;
                    }

                    let aluno = {
                        id: proximoId,
                        nome: nome,
                        idade: idade,
                        turma: turma,
                        nota: nota
                    }


                    alunos.push(aluno);
                    proximoId++;

                    console.log("Aluno Cadastrado com Sucesso")
                    mostrarMenu();

                })
            })
        })
    })
}

function listarAluno() {
    console.log("listar Aluno");

    if (alunos.length === 0) {
        console.log("ERRO n° 114: Nenhum Aluno Cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alunos.length; i++) {
        console.log("\nID: " + alunos[i].id);
        console.log("Nome: " + alunos[i].nome);
        console.log("Idade: " + alunos[i].idade);
        console.log("Turma: " + alunos[i].turma);
        console.log("Nota: " + alunos[i].nota);

    }

    mostrarMenu();
}

function buscarAlunoPorId() {
    console.log("Buscar Aluno por ID")

    rl.question("Digite o ID do Aluno:", (id) => {
        id = Number(id);

        let aluno = encontrarAlunoPorId(id);

        if (aluno === null) {
            console.log("ERRO n°097: Aluno não encontrado")
            mostrarMenu();
            return;
        }

        console.log("\nAluno Encontrado")
        console.log("ID: " + aluno.id);
        console.log("Nome: " + aluno.nome);
        console.log("Idade: " + aluno.idade);
        console.log("Turma: " + aluno.turma);
        console.log("Nota: " + aluno.nota);

        mostrarMenu();
    })

}

function encontrarAlunoPorId(id) {
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id === id) {
            return alunos[i]
        }
    }

    return null;
}

mostrarMenu();