const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let carros = [];
let proximoIdCarro = 1;

function mostrarMenu() {
    console.log("\n====================================")
    console.log("SISTEMA DA LOCADORA TURBOCAR")
    console.log("====================================")
    console.log("\n====================================")
    console.log("CARROS:")
    console.log("====================================")
    console.log("1 - Cadastrar Carro")
    console.log("2 - Listar Carros")
    console.log("3 - Buscar Carro por ID")
    console.log("4 - Atualizar Carro")
    console.log("5 - Remover Carro")
    console.log("\n====================================")
    console.log("CLIENTES")
    console.log("====================================")
    console.log("6 - Cadastrar Cliente")
    console.log("7 - Listar Clientes")
    console.log("8 - Buscar Cliente por ID")
    console.log("9 - Atualizar Cliente")
    console.log("10 - Remover Cliente")
    console.log("\n====================================")
    console.log("ALUGUEL")
    console.log("====================================")
    console.log("11 - Realizar Aluguel")
    console.log("12 - Devolver Carro")
    console.log("13 - Listar Alugueis ativos")
    console.log("14 - Listar histórico (de finalizados)")
    console.log("\n====================================")
    console.log("15 - SAIR")
    console.log("\n")

    rl.question("Selecione uma opção:", (opcao) => {
        if (opcao === "1") {
            cadastrarCarro();
        } else if (opcao === "2") {
            listarCarro();
        } else if (opcao === "3") {
            buscarCarroPorId();
        } else if (opcao === "4") {
            atualizarCarro();
        } else if (opcao === "5") {
            removerCarro();
        }
    })
}

function removerCarro() {
    console.log("Remover Carro")

    rl.question("Digite o ID do Carro que deseja remover:", (id) => {
        id = Number(id)

        let carro = encontrarCarroPorId(id);

        if (carro === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        let sn = "Não temos essa informação"
        if (carro.disponivel === true) {
            sn = "Sim"
        } else if (carro.disponivel === false) {
            sn = "Não"
        }

        console.log("\nCarro encontrado")
        console.log("ID:" + carro.id)
        console.log("Modelo:" + carro.modelo)
        console.log("Placa:" + carro.placa)
        console.log("Ano:" + carro.ano)
        console.log("Preço por diária:" + carro.precoPorDia)
        console.log("Está disponível para Aluguel:" + sn)

        rl.question("Tem certeza que deseja excluir? (s/n)", (certeza) => {
            if (certeza === "n") {
                console.log("Ação cancelada")
                mostrarMenu();
                return;
            }

            console.log("\nExcluindo...")

            let a = false

            for (let i = 0; i < carros.length; i++) {
                if (carros[i].id === id) {
                    carros.splice(i, 1);
                    a = true
                    break;
                }
            }

            if (a === true) {
                console.log("Ação realizada com sucesso");
            } else if (a === false) {
                console.log("ERRO n°138: Algum erro inesperado ocorreu")
            }

            mostrarMenu();
            return;

        })
    })
}

function atualizarCarro() {
    console.log("Atualizar Carro")

    rl.question("Digite o ID do Carro que deseja atualizar:", (id) => {
        id = Number(id)

        let carro = encontrarCarroPorId(id)

        if (carro === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        let sn = "Não temos essa informação"
        if (carro.disponivel === true) {
            sn = "Sim"
        } else if (carro.disponivel === false) {
            sn = "Não"
        }


        console.log("\nDados atuais do Carro:")
        console.log("ID:" + carro.id)
        console.log("Modelo:" + carro.modelo)
        console.log("Placa:" + carro.placa)
        console.log("Ano:" + carro.ano)
        console.log("Preço por diária:" + carro.precoPorDia)
        console.log("Está disponível para Aluguel:" + sn)

        rl.question("Qual o novo modelo:", (novoModelo) => {
            rl.question("Qual a nova placa:", (novaPlaca) => {
                rl.question("Qual o novo ano:", (novoAno) => {
                    rl.question("Qual o novo preço da diária:", (novoPrecoPorDia) => {

                        if (novaPlaca === "" || novoAno === "" || novoModelo === "" || novoPrecoPorDia === "") {
                            console.log("ERRO n°101: Os campos não foram preenchidas corretamente")
                            mostrarMenu();
                            return;
                        }

                        if (novoAno < 0 || novoPrecoPorDia < 0) {
                            console.log("ERRO n°092: Os campos 'ano' ou 'preço por dia' foram preenchidas com dados inválidos")
                            mostrarMenu();
                            return;
                        }

                        novoAno = Number(novoAno);
                        novoPrecoPorDia = Number(novoPrecoPorDia);

                        carro.modelo = novoModelo;
                        carro.placa = novaPlaca;
                        carro.ano = novoAno;
                        carro.precoPorDia = novoPrecoPorDia;

                        console.log("\nAtualizado com sucesso")
                        mostrarMenu();
                    })
                })
            })
        })
    })
}

function buscarCarroPorId() {
    console.log("Buscar Carro por ID")

    rl.question("Digite o ID do Carro:", (id) => {
        id = Number(id)

        let carro = encontrarCarroPorId(id);

        if (carro === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        let sn = "Não temos essa informação"
        if (carro.disponivel === true) {
            sn = "Sim"
        } else if (carro.disponivel === false) {
            sn = "Não"
        }

        console.log("\nCarro encontrado")
        console.log("ID:" + carro.id)
        console.log("Modelo:" + carro.modelo)
        console.log("Placa:" + carro.placa)
        console.log("Ano:" + carro.ano)
        console.log("Preço por diária:" + carro.precoPorDia)
        console.log("Está disponível para Aluguel:" + sn)

        mostrarMenu();
    })

    mostrarMenu();
    return;

}

function listarCarro() {
    console.log("Listar Carros")

    if (carros.length === 0) {
        console.log("ERRO n°149: Não foram encontrados Carros cadastrados")
        mostrarMenu();
        return;
    }

    console.log("Essses são todos os Carros cadastrados")

    let sn = "Não"

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            sn = "Disponível"
        } else if (carros[i].disponivel === false) {
            sn = "Não disponível"
        }
        console.log("\nID:" + carros[i].id)
        console.log("Modelo:" + carros[i].modelo)
        console.log("Placa:" + carros[i].placa)
        console.log("Ano:" + carros[i].ano)
        console.log("Preço por Diária:" + carros[i].precoPorDia)
        console.log("Disponibilidade para aluguel:" + sn)
    }

    mostrarMenu();
    return;
}

function cadastrarCarro() {
    console.log("Cadastar Carro")

    rl.question("Qual o modelo do Carro:", (modelo) => {
        rl.question("Qual a placa do Carro:", (placa) => {
            rl.question("Qual o ano:", (ano) => {
                rl.question("Preço pela diária:", (precoPorDia) => {
                    ano = Number(ano);
                    precoPorDia = Number(precoPorDia);

                    if (modelo === "" || placa === "" || ano === "" || precoPorDia === "") {
                        console.log("ERRO n°101: Os campos não foram preenchidas corretamente")
                        mostrarMenu();
                        return;
                    }

                    if (ano < 0 || precoPorDia < 0) {
                        console.log("ERRO n°092: Os campos 'ano' ou 'preço por dia' foram preenchidas com dados inválidos")
                        mostrarMenu();
                        return;
                    }

                    let carro = {
                        id: proximoIdCarro,
                        modelo: modelo,
                        placa: placa,
                        ano: ano,
                        precoPorDia: precoPorDia,
                        disponivel: true
                    }

                    carros.push(carro);
                    proximoIdCarro++;

                    console.log("Carro Cadastrado com sucesso")

                    mostrarMenu();
                    return;
                })
            })
        })
    })
}

function encontrarCarroPorId(id) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].id === id) {
            return carros[i];
        }
    }

    return null;
}

mostrarMenu();


