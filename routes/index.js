const { app } = require("../config/servidor")

module.exports = (app)=>{
    //rota do tipo send
    app.get('/',(req,res)=>{
        res.send('Rota do tipo send')
    })
}