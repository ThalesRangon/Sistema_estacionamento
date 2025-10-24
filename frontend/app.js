console.log("App.js funcionando");

const API = "http://localhost:3000/lerveiculos";
const APIPagamento = "http://localhost:3000/atualizarpagamento";
const APIDelete = "http://localhost:3000/deletarveiculo"; // Adicionado endpoint DELETE

async function carregar(){
    
    const res = await fetch(API);
    const dados = await res.json();

    const tabela = document.getElementById("tabela");

    tabela.innerHTML = "";

    console.log(dados)

    dados.forEach((Carro) => {
        tabela.innerHTML += `
        <tr>
            <td>${Carro.id}</td>
            <td>${Carro.placa}</td>
            <td>${Carro.modelo}</td>
            <td>${Carro.pago ? "Sim" : "Não"}</td>
            <td> 
                <button onclick="pagar(${Carro.id},${Carro.pago})">
                    PATCH ${Carro.pago ? '<span style="color:blue">Cancelar</span>' : '<span style="color:green">Pagar</span>'}
                </button>
                 <button onclick="deletar(${Carro.id})" style="color:red">
                    Excluir
                </button>
            </td>
           
        </tr>
        `;
    });
}

async function pagar(id, pagoAtual){
    console.log(id)
    console.log(pagoAtual)
    
    await fetch(`${APIPagamento}/${id}`, {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({pago: !pagoAtual})  
    })
    carregar();
}

async function deletar(id) {
    const confirmar = confirm(`Tem certeza que deseja excluir o veículo ID ${id}?`);
    if (!confirmar) return;

    console.log("Deletando veículo ID:", id);

    await fetch(`${APIDelete}/${id}`, {
        method: "DELETE",
    });

    carregar();
}

//******************************************* */
//Ao abrir a página, chama a função carregar
//******************************************* */
carregar();