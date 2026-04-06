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
    console.log("3 - Listar Carros disponíveis")
    console.log("4 - Listar Carros indisponíveis")
    console.log("5 - Buscar Carro por ID")
    console.log("6 - Buscar Carro por placa")
    console.log("7 - Atualizar Carro")
    console.log("8 - Remover Carro")
    console.log("\n====================================")
    console.log("CLIENTES")
    console.log("====================================")
    console.log("9 - Cadastrar Cliente")
    console.log("10 - Listar Clientes")
    console.log("11 - Buscar Cliente por ID")
    console.log("12 - Atualizar Cliente")
    console.log("13 - Remover Cliente")
    console.log("14 - Buscar Cliente por CPF")
    console.log("\n====================================")
    console.log("ALUGUEL")
    console.log("====================================")
    console.log("15 - Realizar Aluguel")
    console.log("16 - Devolver Carro")
    console.log("17 - Listar Alugueis ativos")
    console.log("18 - Listar histórico (de finalizados)")
    console.log("\n====================================")
    console.log("OUTROS")
    console.log("====================================")
    console.log("01 - SAIR")
    console.log("02 - Resumo do estoque")
    console.log("03 - Listar Clientes com total")
    console.log("04 - Listar Alugueis com o total aberto")
    console.log("\n")

    rl.question("Selecione uma opção:", (opcao) => {
        if (opcao === "1") {
            cadastrarCarro();
        } else if (opcao === "2") {
            listarCarro();
        } else if (opcao === "5") {
            buscarCarroPorId();
        } else if (opcao === "7") {
            atualizarCarro();
        } else if (opcao === "8") {
            removerCarro();
        } else if (opcao === "9") {
            cadastrarCliente();
        } else if (opcao === "01") {
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
        } else if (opcao === "10") {
            listarClientes();
        } else if (opcao === "11") {
            buscarClientePorId();
        } else if (opcao === "12") {
            atualizarCliente();
        } else if (opcao === "13") {
            removerCliente();
        } else if (opcao === "15") {
            realizarAluguel();
        } else if (opcao === "16") {
            devolverCarro();
        } else if (opcao === "17") {
            listarHistoricoDeAtivos();
        } else if (opcao === "18") {
            console.log("\n============================")
            console.log("1 - Listar todos os Alugueis")
            console.log("2 - Listar Alugueis finalizados")
            console.log("3 - Voltar")
            console.log("============================")

            rl.question("Selecione uma opção:", (selecionado) => {
                if (selecionado === "3") {
                    console.log("Voltendo...")
                    mostrarMenu();
                    return;
                }

                if (selecionado === "2") {
                    listarAlugueisFinalizados();
                }

                if (selecionado === "1") {
                    listarTodosAlugueis();
                }
            })
        } else if (opcao === "14") {
            buscarClienteporCPF();
        } else if (opcao === "3") {
            listarCarrosDisponiveis();
        } else if (opcao === "4") {
            listarCarrosIndisponiveis();
        } else if (opcao === "6") {
            buscarCarroPorPlaca();
        } else if (opcao === "02") {
            resumoDoEstoque();
        } else if (opcao === "03") {
            listarClientesComTotal();
        } else if (opcao === "04") {
            listarAlugueisComTotalAberto()
        }
    })
}

function listarAlugueisComTotalAberto() {
    console.log("Listar Alugueis com total aberto")

    for (let i = 0; alugueis.length; i++) {
        
    }
}

function listarClientesComTotal() {
    console.log("Listar Clientes com total")

    if (clientes.length === 0) {
        console.log("ERRO n°012.2: Não foram encontrados nenhum Cliente cadastrado")
        mostrarMenu();
        return;
    }

    console.log("Eis os Clientes:")

    let c1 = 0
    let c2 = 0


    for (let i = 0; i < clientes.length; i++) {
        console.log("\nID:" + clientes[i].id)
        console.log("Nome:" + clientes[i].nome)
        console.log("CPF:" + clientes[i].cpf)
        console.log("Telefone:" + clientes[i].telefone)
        for (let j = 0; j < alugueis.length; j++) {
            let id3 = j + 1;

            let aluguel = encontrarAluguelPorId(id3)

            c1 = aluguel.total

            c1 = Number(c1)
        }
        console.log("Total pelo Cliente:", c1)
        c2++
    }

    console.log("\nO total de Clientes é ", c2)

    mostrarMenu();
    return;
}

function resumoDoEstoque() {
    console.log("Resumo do estoque")

    let c1 = 0

    if (carros.length === 0) {
        console.log("ERRO n°012.1: Não foram encontrados nenhum Carro cadastrado")
        mostrarMenu();
        return;
    } else if (carros.length > 0) {
        let a1 = 0
        for (let i = 0; i < carros.length; i++) {
            if (carros[i]) {
                c1++
            }
        }
        console.log("Há um total de " + c1 + " Carros.")

        let a2 = 0
        let a3 = 0

        for (let i = 0; i < carros.length; i++) {
            if (carros[i].disponivel === true) {
                a2++
            }

            if (carros[i].disponivel === false) {
                a3++
            }
        }

        console.log("Destes, " + a2 + " estão disponíveis e " + a3 + " estão alugados.")

        mostrarMenu();
        return;
    }
}

function buscarCarroPorPlaca() {
    console.log("Buscar Carro por placa")

    rl.question("Digite a placa do Carro que deseja buscar:", (placa) => {

        let carro = encontrarCarroPorPlaca(placa)

        if (carro === null) {
            console.log("ERRO n°014: Carro, Cliente ou Aluguel não encontrado ou placa incorreta")
            mostrarMenu();
            return;
        }

        let sn = "Não temos essa informação"

        if (carro.disponivel === true) {
            sn = "Disponível"
        } else {
            sn = "Indisponível"
        }

        console.log("Carro encontardo:")
        console.log("\nID:" + carro.id)
        console.log("Modelo:" + carro.modelo)
        console.log("Placa:" + carro.placa)
        console.log("Ano:" + carro.ano)
        console.log("Preço por diária:" + carro.precoPorDia)
        console.log("Status:" + sn)

        mostrarMenu();
        return;
    })
}

function listarCarrosIndisponiveis() {
    console.log("Listar Carros indisponíveis")

    if (carros.length === 0) {
        console.log("ERRO n°149: Não foram encontrados Carros cadastrados")
        mostrarMenu();
        return;
    }

    let sn = "Error 404"
    let a = 0;

    for (let i = 0; i < carros.length; i++) {
        sn = "Não temos essa informacão"

        if (carros[i].disponivel === true) {
            sn = "Disponível"
        } else if (carros[i].disponivel === false) {
            sn = "Indisponível"
        }

        if (carros[i].disponivel === false) {
            console.log("\nID:" + carros[i].id)
            console.log("Modelo:" + carros[i].modelo)
            console.log("Placa:" + carros[i].placa)
            console.log("Ano:" + carros[i].ano)
            console.log("Preço por diária:" + carros[i].precoPorDia)
            console.log("Status:" + sn)
            a++
        }


    }

    if (a === 0) {
        console.log("ERRO n°233: Não foram encontrados Carros indisponíveis")
    }

    mostrarMenu();
    return;

}

function listarCarrosDisponiveis() {
    console.log("Listar Carros disponíveis")

    if (carros.length === 0) {
        console.log("ERRO n°149: Não foram encontrados Carros cadastrados")
        mostrarMenu();
        return;
    }

    let sn = "Error 404"
    let a = 0;

    for (let i = 0; i < carros.length; i++) {
        sn = "Não temos essa informacão"

        if (carros[i].disponivel === true) {
            sn = "Disponível"
        } else if (carros[i].disponivel === false) {
            sn = "Indisponível"
        }

        if (carros[i].disponivel === true) {
            console.log("\nID:" + carros[i].id)
            console.log("Modelo:" + carros[i].modelo)
            console.log("Placa:" + carros[i].placa)
            console.log("Ano:" + carros[i].ano)
            console.log("Preço por diária:" + carros[i].precoPorDia)
            console.log("Status:" + sn)
            a++
        }
    }

    if (a === 0) {
        console.log("ERRO n°234: Não foram encontrados Carros disponíveis")
    }
    mostrarMenu();
    return;
}

function buscarClienteporCPF() {
    console.log("Buscar Cliente por CPF")

    rl.question("Digite o CPF do Cliente que deseja encontrar:", (cpf) => {

        let cliente = encontrarClientePorCPF(cpf);

        if (cliente === null) {
            console.log("ERRO n°013: Carro, Cliente ou Aluguel não encontrado ou CPF incorreto")
            mostrarMenu();
            return;
        }

        console.log("\nCliente encotrado:")
        console.log("ID:" + cliente.id)
        console.log("Nome:" + cliente.nome)
        console.log("CPF:" + cliente.cpf)
        console.log("Telefone:" + cliente.telefone)

        mostrarMenu();
        return;
    })
}

function listarTodosAlugueis() {
    console.log("Listar todos os Alugueis")

    if (alugueis.length === 0) {
        console.log("ERRO n°153: Não foram encontrados Alugueis")
        mostrarMenu()
        return;
    }

    console.log("Esses são todos os Alugueis")

    for (let i = 0; i < alugueis.length; i++) {
        console.log("\nID:" + alugueis[i].id)
        console.log("ID do Cliente:" + alugueis[i].idCliente)
        console.log("ID do Carro:" + alugueis[i].idCarro)
        console.log("Dias:" + alugueis[i].dias)
        console.log("Total:" + alugueis[i].total)
        console.log("Status:" + alugueis[i].status)
    }

    mostrarMenu();
    return;
}

function listarAlugueisFinalizados() {
    console.log("Listar Alugueis finalizados")

    if (alugueis.length === 0) {
        console.log("ERRO n°152: Não foram encontrados Alugueis finalizados")
        mostrarMenu()
        return;
    }

    console.log("Esses são todos os Alugueis finalizados:")

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "finalizado") {
            console.log("\nID:" + alugueis[i].id)
            console.log("ID do Cliente:" + alugueis[i].idCliente)
            console.log("ID do Carro:" + alugueis[i].idCarro)
            console.log("Dias:" + alugueis[i].dias)
            console.log("Total:" + alugueis[i].total)
            console.log("Status:" + alugueis[i].status)
        }
    }

    mostrarMenu();
    return;
}

function listarHistoricoDeAtivos() {
    console.log("Listar Alugueis ativos")

    if (alugueis.length === 0) {
        console.log("ERRO n°151: Não foram encontrados Alugueis ativos")
        mostrarMenu()
        return;
    }

    console.log("Esses são todos os Alugueis ativos")

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "ativo") {
            console.log("\nID:" + alugueis[i].id)
            console.log("ID do Cliente:" + alugueis[i].idCliente)
            console.log("ID do Carro:" + alugueis[i].idCarro)
            console.log("Dias:" + alugueis[i].dias)
            console.log("Total:" + alugueis[i].total)
            console.log("Status:" + alugueis[i].status)
        }
    }

    mostrarMenu();
    return;
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

            let algo = +aluguel.idCarro;

            aluguel.status = "finalizado";
            let id2 = algo;
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
                carros.push(carro)
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
                if (clientes[i].id === id1) {
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

        let cliente = encontrarClientePorId(id1)

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

                let vc = encontrarClientePorCPF(cpf)

                if ((vc === null) === false) {
                    console.log("ERRO n°172: CPF já existente")
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

            if (carro.disponivel === false) {
                console.log("ERRO n°173: Não é permitido excluir Carro alugado")
                mostrarMenu();
                return;
            }

            console.log("\nExcluindo...")

            let a = false

            for (let i = 0; i < carros.length; i++) {
                if (carros[i].id === id2) {
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

        let carro = encontrarCarroPorId(id2)

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

                    vp = encontrarCarroPorPlaca(placa)

                    if ((vp === null) === false) {
                        console.log("ERRO n°171: Placa já existente")
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

function encontrarClientePorCPF(cpf) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf === cpf) {
            return clientes[i];
        }
    }

    return null;
}

function encontrarCarroPorPlaca(placa) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].placa === placa) {
            return carros[i];
        }
    }

    return null;
}
mostrarMenu();


