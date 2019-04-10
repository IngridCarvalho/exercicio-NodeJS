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
	res.render("contatos/incluir",
			{contacts: null}
		);
});

app.post('/novo-contato', function(req, res){
	let id1 = contatos.length + 1;
	let nome1 = req.body.nome;
	let telefone1 = req.body.telefone;
	let email1 = req.body.email;
	let endInst1 = req.body.endInst;
	let endCob1 = req.body.endCob;
	let velocidade1 = req.body.velocidade;
	let valor1 = req.body.valor;

	let pessoa = {id: id1, nome: nome1, telefone: telefone1, email: email1, endInst: endInst1, endCob: endCob1, velocidade: velocidade1, valor: valor1};

	console.log(`Adicionou: ${pessoa.nome}`); //adicionar isso em um arquivo
	contatos.push(pessoa);
	res.redirect('/');
});

app.get('/contatos/editar/:id', function(req, res){
	id = req.params.id;
	let contato = contatos.filter((contato) => {
		return contato.id == id;
	});
	res.render("contatos/incluir",
			{contacts: contato}
		);
});

app.post('/contatos/editar', function(req, res){

	let oldContact = contatos.find(contato => contato.id == req.body.id);
	console.log(oldContact);

	res.redirect('/');
});

app.use(express.static(__dirname + '/public'))

app.listen(3000, function(){
	console.log('Servidor pronto');
});
