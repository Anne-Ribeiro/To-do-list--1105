module.exports = (app)=>{
    //abrir o arquivo login.ejs
    app.get('/registro',(req,res)=>{
        res.render('registro.ejs')
    })

    //gravar as informações digitadas no mongoAtlas
    app.post('/registro',async(req,res)=>{
        //recuperar as informações digitadas
        var dados = req.body
        //importar as configurações do database
        var database = require('../config/database')()
        //definir em qual coleção vamos gravar
        var usuarios = require('../models/usuarios')
        //gravar o documento
        var documento = await new usuarios({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha
        }).save()
        res.redirect('/login')
    })
}