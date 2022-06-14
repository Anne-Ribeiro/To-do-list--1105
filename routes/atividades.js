const atividades = require("../models/atividades")

module.exports = (app) =>{
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        //return console.log(dados)

        //conectar o mongo
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informações do formulário do database
        var gravar = await new atividades({
            data: dados.data,
            tipo: dados.tipo,
            entrega: dados.entrega,
            disciplina: dados.disciplina,
            instrucoes: dados.orientacoes,
            usuario: dados.id,
            titulo:dados.titulo
        }).save()
        //buscar as atividades do usuário
        //var buscar = await atividades.find({usuario:dados.id})

        //recarregar a página de atividades
        res.redirect('/atividades?id='+dados.id)
    })
    app.get('/atividades', async(req,res)=>{
        //listar todas as atividades do usuário logado
        var user = req.query.id
        if(!user){//se o usuario for = a fslso, então, voltar para a pagina de login
            res.redirect("/login")
        }
        var usuarios  = require('../models/usuarios')
        var atividades = require('../models/atividades')

        var dadosUser = await usuarios.findOne({_id:user})
        var dadosAberto= await atividades.find({usuario:user, status:"0"})

        var dadosEntregue= await atividades.find({usuario:user, status:"1"})

        var dadosExcluído= await atividades.find({usuario:user, status:"2"})

        res.render('accordion.ejs',{nome:dadosUser.nome, id:dadosUser._id, dadosAberto, dadosEntregue, dadosExcluído})
        //res.render('atividades.ejs',{nome:dadosUser.nome, id:dadosUser._id, lista: dadosAtividades})
    })

    app.get('/excluir', async(req,res)=>{
        //qual documento será excluído da collection atividades???
        var doc = req.query.id
        //excluir o documento
        var excluir = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"2"}
            )
        //voltar para a lista de atividades
       res.redirect('/atividades?id='+excluir.usuario)
    })

    //rota entregue
    app.get('/entregue', async(req,res)=>{
        //qual documento será excluído da collection atividades???
        var doc = req.query.id
        //excluir o documento
        var entregue = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"1"}
            )
        //voltar para a lista de atividades
       res.redirect('/atividades?id='+entregue.usuario)
    })

    //rota entregue
    app.get('/desfazer',async(req,res)=>{
        //qual documento será excluido na collection atividades???
        var doc = req.query.id

        //excluir o documento
        var desfazer = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"0"})

    //voltar para a lista de atividades
    res.redirect('/atividades?id='+desfazer.usuario)
    
    })
}          