var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    express:true
}))
mongoose.connect('mongodb://localhost:27017/qrcodedb')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/index.html",(req,res) => {
    var fname = req.body.fname
    var email = req.body.email
    var cnumber = req.body.cnumber
    var address = req.body.address
    var linktext = req.body.linktext 

    var data={
        "fname": fname,
        "email": email,
        "cnumber": cnumber,
        "address": address,
        "linktext": linktext
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if (err) {
            throw err;
        }
        console.log("Successfully Submit!")
    })
    return res.redirect('index.html')
})
app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    }) 
    return res.redirect('.index.html')
}).listen(3000);

console.log("Listening on Port 3000")