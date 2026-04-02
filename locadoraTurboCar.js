const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let carros = [];
let proximoIdCarro = 1;

let clientes = [];
let proximoIdCliente = 1;

let alugueis = [];
let proximoIdAluguel = 1;

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
        } else if (opcao === "6") {
            cadastrarCliente();
        } else if (opcao === "15") {
            rl.question("Tem certeza que deseja sair? (s/n)", (resposta) => {
                if (resposta === "n") {
                    console.log("Ação cancelada")
                    mostrarMenu();
                    return;
                }

                console.log("Saindo...")

                console.log("\nTchau!")

                rl.close();
            })
        } else if (opcao === "7") {
            listarClientes();
        } else if (opcao === "8") {
            buscarClientePorId();
        } else if (opcao === "9") {
            atualizarCliente();
        } else if (opcao === "10") {
            removerCliente();
        } else if (opcao === "11") {
            realizarAluguel();
        } else if (opcao === "12") {
            devolverCarro();
        }
    })
}

function devolverCarro() {
    console.log("Devolver Carro")

    rl.question("Digite o ID do Aluguel:", (id3) => {
        id3 = Number(id3);

        let aluguel = encontrarAluguelPorId(id3)

        if (aluguel === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        if (aluguel.status === "finalizado") {
            console.log("ERRO n°114: O Aluguel já foi finalizado")
            mostrarMenu()
            return;
        }

        console.log("\nAluguel encontrado:")
        console.log("ID:" + aluguel.id)
        console.log("ID do Cliente:" + aluguel.idCliente)
        console.log("ID do Carro:" + aluguel.idCarro)
        console.log("Dias:" + aluguel.dias)
        console.log("Total:" + aluguel.total)
        console.log("Status:" + aluguel.status)

        rl.question("Tem certeza de marcar como concluído? (s/n)", (resposta) => {
            if (resposta === "n") {
                console.log("Ação cancelada")
                mostrarMenu();
                return;
            }

            aluguel.status = "finalizado";
            let id2 = aluguel.idCarro;
            let carro = encontrarCarroPorId(id2)
            carro.disponivel = true;

            carros.push(carro);
            alugueis.push(aluguel)

            console.log("Ação realizada com sucesso")
            mostrarMenu();
            return;
        })
    })
}

function realizarAluguel() {
    console.log("Realizar Aluguel")

    rl.question("Digite o ID do Cliente:", (idCliente) => {
        rl.question("Digite o ID do Carro:", (idCarro) => {
            rl.question("Digite o total de dias:", (dias) => {
                if (idCliente === "" || idCarro === "" || dias === "") {
                    console.log("ERRO n°101: Os campos não foram preenchidos corretamente")
                    mostrarMenu();
                    return;
                }

                let id1 = +idCliente
                let id2 = +idCarro


                dias = Number(dias)

                let cliente = encontrarClientePorId(id1)
                let carro = encontrarCarroPorId(id2)

                if (carro === null) {
                    console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
                    mostrarMenu();
                    return;
                } else if (cliente === null) {
                    console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
                    mostrarMenu();
                    return;
                }

                if (carro.disponivel === false) {
                    console.log("ERRO n°233: Esse Carro já está alugado")
                    mostrarMenu();
                    return;
                }

                let total = (carro.precoPorDia) * dias;

                let aluguel = {
                    id: proximoIdAluguel,
                    idCliente: idCliente,
                    idCarro: idCarro,
                    dias: dias,
                    total: total,
                    status: "ativo"
                }

                carro.disponivel = false;

                alugueis.push(aluguel);
                proximoIdAluguel++;
                console.log("Ação realizada com sucesso");
                mostrarMenu();
                return;
            })
        })
    })
}

function removerCliente() {
    console.log("Remover Cliente")

    rl.question("Digite o ID do Cliente:", (id1) => {
        id1 = Number(id1)

        let cliente = encontrarClientePorId(id1);

        if (cliente === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        console.log("\nCliente encontrado:")
        console.log("ID:" + cliente.id)
        console.log("Nome:" + cliente.nome)
        console.log("CPF:" + cliente.cpf)
        console.log("Telefone:" + cliente.telefone)

        rl.question("Tem certeza que deseja excluir? (s/n)", (resposta) => {
            if (resposta === "n") {
                console.log("Ação cancelada")
                mostrarMenu();
                return;
            }

            console.log("\nExcluindo...")

            for (let i = 0; i < clientes.length; i++) {
                if (clientes[i].id === id) {
                    clientes.splice(i, 1);
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

function atualizarCliente() {
    console.log("Atualizar Cliente")

    rl.question("Digite o ID do Cliente que deseja atualizar:", (id1) => {
        id1 = Number(id1)

        let cliente = encontrarClientePorId(id)

        if (cliente === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        console.log("\nDados atuais do Cliente:")
        console.log("ID:" + cliente.id)
        console.log("Nome:" + cliente.nome)
        console.log("CPF:" + cliente.cpf)
        console.log("Telefone:" + cliente.telefone)

        rl.question("Digite o novo nome:", (novoNome) => {
            rl.question("Digite o novo CPF:", (novoCpf) => {
                rl.question("Digite o novo telefone:", (novoTelefone) => {

                    if (novoCpf === "" || novoNome === "" || novoTelefone === "") {
                        console.log("ERRO n°101: Os campos não foram preenchidos corretamente")
                        mostrarMenu();
                        return;
                    }

                    cliente.nome = novoNome;
                    cliente.cpf = novoCpf;
                    cliente.telefone = novoTelefone;

                    console.log("Dados atualizados com sucesso")

                    mostrarMenu();

                })
            })
        })
    })
}

function buscarClientePorId() {
    console.log("Buscar Clientes por ID")

    rl.question("Digite o ID do Cliente:", (id1) => {

        id1 = Number(id1)

        let cliente = encontrarClientePorId(id1)

        if (cliente === null) {
            console.log("ERRO n°012: Carro, Cliente ou Aluguel não encontrado ou ID incorreto")
            mostrarMenu();
            return;
        }

        console.log("\nCliente encontrado:")

        console.log("\nID do Cliente:" + cliente.id)
        console.log("Nome:" + cliente.nome)
        console.log("CPF do Cliente:" + cliente.cpf)
        console.log("Telefone do Cliente:" + cliente.telefone)

        mostrarMenu();
        return;

    })
}

function listarClientes() {
    console.log("Listar Clientes")

    if (clientes.length === 0) {
        console.log("ERRO n°150: Não foram encontrados Clientes cadastrados")
        mostrarMenu();
        return;
    }

    console.log("\nTodos os Clientes cadastrados:")

    for (let i = 0; i < clientes.length; i++) {

        console.log("\nID do Cliente:" + clientes[i].id)
        console.log("Nome do Cliente:" + clientes[i].nome)
        console.log("CPF do Cliente:" + clientes[i].cpf)
        console.log("Telefone do Cliente:" + clientes[i].telefone)
    }

    mostrarMenu();
    return;
}

function cadastrarCliente() {
    console.log("Cadastrar Cliente")

    rl.question("Digite o nome do Cliente:", (nome) => {
        rl.question("Digite o CPF do Cliente:", (cpf) => {
            rl.question("Digite o telefone do Cliente:", (telefone) => {

                if (nome === "" || cpf === "" || telefone === "") {
                    console.log("ERRO n°101: Os campos não foram preenchidos corretamente")
                    mostrarMenu();
                    return;
                }

                let cliente = {
                    id: proximoIdCliente,
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone
                }

                clientes.push(cliente);

                proximoIdCliente++;

                console.log("Cliente cadastrado com sucesso")

                mostrarMenu();
                return;
            })
        })
    })
}

function removerCarro() {
    console.log("Remover Carro")

    rl.question("Digite o ID do Carro que deseja remover:", (id2) => {
        id2 = Number(id2)

        let carro = encontrarCarroPorId(id2);

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

    rl.question("Digite o ID do Carro que deseja atualizar:", (id2) => {
        id2 = Number(id2)

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

    rl.question("Digite o ID do Carro:", (id2) => {
        id2 = Number(id2)

        let carro = encontrarCarroPorId(id2);

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

function encontrarCarroPorId(id2) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].id === id2) {
            return carros[i];
        }
    }

    return null;
}

function encontrarClientePorId(id1) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id === id1) {
            return clientes[i];
        }
    }

    return null;
}

function encontrarAluguelPorId(id3) {
    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].id === id3) {
            return alugueis[i];
        }
    }

    return null;
}


mostrarMenu();


