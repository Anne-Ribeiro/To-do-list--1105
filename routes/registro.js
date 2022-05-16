module.exports = (app)=>{
    //abrir o arquivo login.ejs
    app.get('/registro',(req,res)=>{
        res.render('registro.ejs')
    })
}