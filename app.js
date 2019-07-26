const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://paulawot:24hyrule@cartasdetarot-ryok0.mongodb.net/test?retryWrites=true&w=majority" , {
    useNewUrlParser: true
} ,() => {
    console.log("Banco de dados conectado!")
})

require("./models/Carta");
const Carta = mongoose.model("Carta");

app.post("/carta", (req,res) =>{
    if(req.body.imagem != undefined && req.body.nome != undefined && req.body.conselho != undefined){
        var carta = new Carta ({
            imagem: req.body.imagem , nome: req.body.nome , conselho: req.body.conselho
        });
        carta.save.then(() =>{
            res.statusCode = 201;
            res.send();
        }).catch((erro) =>{
            if(erro){
                throw erro;
            }
            res.statusCode = 417;
            res.send();
        })
    }else {
        res.statusCode = 406;
        res.send();
    }
})

app.get("./cartas", (req, res) => {
    Carta.find({} , (erro, dados) => {
        if(erro){
            res.statusCode = 417;
            res.send();
        }
        res.json(dados);
    })
});

app.get("/carta/:id", (req, res) =>{
    Carta.findById (req.params.id).then((produto) =>{
        resizeTo.statusCode = 200;
        res.json(produto);
    }).catch((erro) => {
        if(erro){
            res.statusCode = 417;
            res.send();
            throw erro;
        }
    })
});

app.delete ("/carta/:id", (req, res) =>{
    Carta.findByIdAndRemove (req.paramns.id).then((carta) =>{
        if(carta){
            res.statusCode = 200;
            res.send();
        }else {
            res.statusCode = 404;
            res.send();
        }
    }).catch((erro) =>{
        if(erro){
            res.statusCode = 417;
            res.send();
            throw erro;
        }
    })
})


app.listen(8080, () => {
    console.log("API rodando!");
});
