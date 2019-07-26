const mongoose = require("mongoose");

mongoose.model("Carta", {
    imagem:{type: String},
    nome: {type:String},
    conselho: {type:String}
});
