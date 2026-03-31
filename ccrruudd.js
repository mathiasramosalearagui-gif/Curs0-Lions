const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let proximoId = 1;
let alunos = [];

function mostrarMenu() {
    console.log("\n========================");
    console.log("SISTEMA ESCOLAR");
    console.log("========================");
    console.log("1 - Cadastrar Aluno");
    console.log("2 - Listar Aluno");
    console.log("3 - Buscar por ID ");
    console.log("4 - Atualizar Aluno");
    console.log("5 - Remover Aluno");
    console.log("6 - Mostrar Alunos Aprovados");
    console.log("7 - Mostrar Alunos Reprovados");
    console.log("0 - Sair");
    console.log("=======================");

    rl.question("Escolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarAluno();
        } else if (opcao === "2") {
            listarAluno();
        } else if (opcao === "3") {
            buscarAlunoPorId();
        } else if (opcao === "4") {
            atualizarAluno();
        } else if (opcao === "5") {
            removerAluno();
        } else if (opcao === "6") {
            mostrarAlunosAprovados();
        } else if (opcao === "7") {
            mostrarAlunosReprovados();
        } else if (opcao === "0") {
            console.log("Encerrando programa...")
            console.log("\nTchau!")
            rl.close();
        }

    })
}

function mostrarAlunosAprovados() {
    console.log("Mostrar Alunos aprovados")

    console.log("Todos os Alunos aprovados são:")

    for(let i = 0; i < alunos.length; i++) {
        if (alunos[i].nota >= 6) {
            console.log("\nID:" + alunos[i].id)
            console.log("Nome:" + alunos[i].nome)
            console.log("Idade:" + alunos[i].idade)
            console.log("Turma:" + alunos[i].turma)
            console.log("Nota:" + alunos[i].nota)
        }
    }

    mostrarMenu();
    return;
}

function mostrarAlunosReprovados() {
    console.log("Mostrar Alunos Reprovados")

    console.log("Os Alunos reprovados são:")

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nota < 6) {
            console.log("\nID:" + alunos[i].id)
            console.log("Nome:" + alunos[i].nome)
            console.log("Idade:" + alunos[i].idade)
            console.log("Turma:" + alunos[i].turma)
            console.log("Nota:" + alunos[i].nota)
        }
    }

    mostrarMenu();
    return;
}

function removerAluno() {
    console.log("Remover Aluno")

    rl.question("Digite o ID do Aluno que deseja remover:", (id) => {
        id = Number(id);

        let aluno = encontrarAlunoPorId(id)

        if (aluno === null) {
            console.log("ERRO: Aluno não encontrado")
            mostrarMenu();
            return;
        } else {
            console.log("\n Aluno encontrado:")
            console.log("ID:" + aluno.id);
            console.log("Nome:" + aluno.nome);
            console.log("Idade:" + aluno.idade);
            console.log("Turma:"+ aluno.turma);
            console.log("Nota:" + aluno.nota);
        }

        rl.question("Tem certeza que deseja remover esse Aluno? (s/n)", (resposta) => {
            if (resposta === "n") {
                console.log("Ação cancelada");
                mostrarMenu();
                return;
            }

            let a = false

            for (let i = 0; i < alunos.length; i++) {
                if (alunos[i] === id) {
                    alunos.splice(i, 1);
                    a = true
                    break;
                }
            }

            if(a === true) {
                console.log("Ação realizada com sucesso");
            } else if (a === false) {
                console.log("ERRO: Algum erro inesperado ocorreu")
            }

            mostrarMenu();
            return;
        })



    })
}

function atualizarAluno() {
    console.log("Atualizar Aluno")

    rl.question("digite o ID do Aluno:", (id) => {
        id = Number(id);

        let aluno = encontrarAlunoPorId(id);

        if (aluno === null) {
            console.log("ERRO: aluno não encontrado");
            mostrarMenu();
            return;
        }

        rl.question("Digite o novo nome:", (novoNome) => {
            rl.question("Digite a nova idade:", (novaIdade) => {
                rl.question("Digite a nova turma:", (novaTurma) => {
                    rl.question("Digite a nova nota:", (novaNota) => {
                        novaIdade = Number(novaIdade);
                        novaNota = Number(novaNota);
                        
                        if(novoNome === "" || novaIdade === "" || novaNota === "" || novaTurma === "") {
                            console.log("ERRO: Todos os dados precisam ser preenchidos")
                            mostrarMenu();
                            return;
                        }

                        if (novaIdade <= 0 || novaNota < 0 || novaNota > 10) {
                            console.log("ERRO: Idade ou nota inválida")
                            mostrarMenu();
                            return;
                        }

                        aluno.nome = novoNome;
                        aluno.idade = novaIdade;
                        aluno.turma = novaTurma;
                        aluno.nota = novaNota;

                        console.log("Atualizado com sucesso");
                        mostrarMenu();
                    })
                })
            })
        })
    })
}

function listarAluno() {
    console.log("Listar Alunos");

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado");
        mostrarMenu();
        return;
    }

    for (let i = 0; i < alunos.length; i++) {
        console.log("\nID: " + alunos[i].id);
        console.log("Nome: " + alunos[i].nome)
        console.log("Idade: " + alunos[i].idade)
        console.log("Turma: " + alunos[i].turma)
        console.log("Nota: " + alunos[i].nota)
    }

    mostrarMenu();
}

function cadastrarAluno() {
    console.log("Cadastrar Aluno");

    rl.question("Digite o nome do aluno: ", (nome) => {
        rl.question("Digite a idade do aluno: ", (idade) => {
            rl.question("Digite a turma do aluno: ", (turma) => {
                rl.question("Digite a nota do aluno: ", (nota) => {
                    idade = Number(idade);
                    nota = Number(nota);

                    if (nome === "" || idade === "" || turma === "" || nota === "") {
                        console.log("ERRO: Não preencheu todas as infos");
                        mostrarMenu();
                        return;
                    }

                    if (idade <= 0 || nota < 0 || nota > 10) {
                        console.log("ERRO: Idade ou nota inválida");
                        mostrarMenu();
                        return;
                    }

                    let aluno = {
                        id: proximoId,
                        nome: nome,
                        idade: idade,
                        turma: turma,
                        nota: nota
                    };

                    alunos.push(aluno);
                    proximoId++;

                    console.log("Aluno Cadastrado com sucesso")
                    mostrarMenu();
                })
            })
        })
    })
}

function buscarAlunoPorId() {
    console.log("Buscar aluno por id");

    rl.question("Digite o ID do aluno: ", (id) => {
        id = Number(id);

        let aluno = encontrarAlunoPorId(id);

        if (aluno === null) {
            console.log("Aluno não encontrado");
            mostrarMenu();
            return;
        }

        console.log("\nAluno Encontrado");
        console.log("ID: " + aluno.id);
        console.log("Nome: " + aluno.nome)
        console.log("Idade: " + aluno.idade)
        console.log("Turma: " + aluno.turma)
        console.log("Nota: " + aluno.nota)

        mostrarMenu()
    })
}

function encontrarAlunoPorId(id) {
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id === id) {
            return alunos[i];
        }
    }

    return null;
}



mostrarMenu();