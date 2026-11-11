import express from 'express'
import BancoDados from "./repository/index.js"


const app = express ()
app.use(express.json());

app.post("/lista/tarefas", (req, res) =>{
    const {id, descricao, data} = req.body;

    if( !id || !descricao || !data ){
        res.send ({message: "Você deve preencher todos os dados!"})
        return
    }
    BancoDados.push({ id, descricao, data, concluido : false})
    res.send({message: "Dados enviados com sucesso!"})
})

app.get("/lista", (req, res) => {
    res.json(BancoDados)
})


app.get("/lista/:id", (req, res) => {
    const id = req.params.id

    if(!id){
        res.send({message: "Id não encontrado!"})
        return 
    }

    const tarefa = BancoDados.find(p => p.id == id)

    if(!tarefa){
        res.send({message: "Id não encontrado!"})
        return 
    }


    res.send({message: tarefa })

})

app.delete("/lista/:id", (req, res) => {
    const id = req.params.id

    if(!id){
        res.send({message: "Id não encontrado!"})
        return 
    }

    // buscar pelo id, pra achar aposisao no array
    const index = BancoDados.findIndex(p => p.id == id)

    if(index == -1){
        res.send({message: "Id não encontrado!"})
        return 
    }

    BancoDados.splice(index, 1)

    res.send({message: "terafa removida!"})

})



app.put("/lista/up/:id", (req, res) => {
    const id = Number(req.params.id);
    const concluido = BancoDados.find(tarefa => tarefa.id == id);
    tarefa.concluido = req.body.conclusao;
    
    res.send(concluido);

})

app.get("/tarefas/pendentes", (req, res) =>{
    const pendentes = [];

    for ( const tarefa of BancoDados){
        if (tarefa.concluido === false);
    }

    pendentes.push({ tarefa})
    res.status(200).send(pendentes);

})
app.listen(3000, () =>{
    console.log("servidor rodando na porta 3000")
})

