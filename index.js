var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var app = express();

var model_contatos = require('./models/contatos');
var contatos = model_contatos();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
	res.render('agenda',
		{contacts: contatos}
	);
});

app.get('/contatos', function(req, res){
	res.render("contatos/incluir");
});

app.post('/novo-contato', function(req, res){
	let nome1 = req.body.nome;
	let telefone1 = req.body.telefone;
	let email1 = req.body.email;
	let endInst1 = req.body.endInst;
	let endCob1 = req.body.endCob;
	let velocidade1 = req.body.velocidade;
	let valor1 = req.body.valor;

	let pessoa = {nome: nome1, telefone: telefone1, email: email1, endInst: endInst1, endCob: endCob1, velocidade: velocidade1, valor: valor1};

	console.log(`Adicionou: ${pessoa.nome}`);
	contatos.push(pessoa);
	res.redirect('/');
});

app.use(express.static(__dirname + '/public'))

app.listen(3000, function(){
	console.log('Servidor pronto');
});
