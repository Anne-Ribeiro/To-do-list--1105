module.exports = (app) =>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        return console.log(dados)
    })
}