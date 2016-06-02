// app.js

// INICIANDO ==========================================
var express  = require('express');
// cria nossa aplicação Express
var app      = express();
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');


// mongoose for mongodb
var mongoose = require('mongoose');
// MONGODB ============================================
// conectando ao mongodb no localhost, criando o banco de dados contato
var dbConfig = require('./db.js');
mongoose.connect(dbConfig.url);
var conn = mongoose.connection;             

conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', function() {
});

// mongoose.connect('mongodb://localhost/contato');

// Requisição ao arquivo que cria nosso model Contato
require('./models/Contato');


// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


// ROTAS ===============================================
// Incluindo nossas rotas definidas no arquivo routes/index.js
var index = require('./routes/index');
// definindo nossas rotas na aplicação
app.use('/', index);


// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação
app.listen(8080);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 8080");