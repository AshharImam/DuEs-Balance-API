const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3131;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const schedule = require('node-schedule');
const adapter = new FileSync('db.json')
const db = low(adapter)
const axios = require('axios');

app.use(bodyParser.json({limit: '50mb'}));


app.get('/', (req, res) => res.status(200).send({dsclosing : db.get('dsclosing').value(),euclosing : db.get('euclosing').value(),Logs : db.get('logs').value()}))
app.post('/Add', (req, res) => {
    req.body.who == 0 ? reqi('dsclosing', req.body.amount) : reqi('euclosing', req.body.amount)
    res.status(200).send(req.body)
})

const reqi = (x,a)=>{
    db.update(x,n => n + a).write()
    var d = Date(Date.now()); 
    b = d.toString()
    const e = db.get('logs').value()
    e.push({"who" : x , "amount" : a, "datetime" : b})
    console.log(e)
    db.update('logs',n => e ).write()

}
// let a = 0;
// let b = 0;
// var j = schedule.scheduleJob('1 * * * * *', function(){
//     axios.get('http://94.200.123.222:3434/checkdu').then(res => {
//         if(res.data.data[0][0].amount < a){
//             db.update('dsclosing',n => n - res.data.data[0][0].amount).write()
//             a = res.data.data[0][0].amount
//         }else{
//             console.log(a)
//             a = res.data.data[0][0].amount
//         }
//     })
//     axios.get('http://94.200.123.222:3434/checkes').then(res => {
//         if(res.data.data[0][0].amount < a){
//             db.update('esclosing',n => n - res.data.data[0][0].amount).write()
//             b = res.data.data[0][0].amount
//         }else{
//             b = res.data.data[0][0].amount

//         }
//     })
//   });



app.listen(port, () => console.log(`Example app listening on port ${port}!`))