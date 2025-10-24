const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

let Veiculos = [
    {
        id: 1,
        placa: "CBA-3412",
        modelo: "Urus",
        hora_entrada: new Date().toISOString(),
        pago: true
    },
    {
        id: 2,
        placa: "CBB-1234",
        modelo: "Porsche",
        hora_entrada: new Date().toISOString(),
        pago: false
    }
]

app.get("/", (req, res) => {

})
app.get("/lerveiculos", (req, res) => {
    res.status(200).json(Veiculos);
})
app.get("/lerveiculos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = Veiculos.find(v => v.id == id);
    res.status(200).json(veiculo);
});
app.patch("/atualizarpagamento/:id", (req, res) => {
    const veiculo = Veiculos.find(x => x.id === Number(req.params.id))
    if (!veiculo) return res.status(404).json({ erro: "Não achei" })
    const { pago } = req.body
    if (pago !== undefined) veiculo.pago = pago
    res.json(veiculo)
})
app.delete("/deletarveiculo/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = Veiculos.findIndex(v => v.id === id)
    if (index === -1) return res.status(404).json({ erro: "Não achei" })
    Veiculos.splice(index, 1)
    res.status(200).json({ msg: "Veículo deletado" })
})
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Vai Corinthians!" });
});

app.listen(PORT, () => {
    console.log(`Servidor Rodando no http://localhost:${PORT}`);
});