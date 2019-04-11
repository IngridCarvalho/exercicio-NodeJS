var express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var fs = require('fs');

var app = express();

var model_contatos = require('./models/contatos');
var contatos = model_contatos();

var cont = 0;

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
	let id1 = cont += 1;
	let nome1 = req.body.nome;
	let telefone1 = req.body.telefone;
	let email1 = req.body.email;
	let endInst1 = req.body.endInst;
	let endCob1 = req.body.endCob;
	let velocidade1 = req.body.velocidade;
	let valor1 = req.body.valor;

	let pessoa = {id: id1, nome: nome1, telefone: telefone1, email: email1, endInst: endInst1, endCob: endCob1, velocidade: velocidade1, valor: valor1};

	fs.writeFile('log.txt', `Adicionou: ${pessoa.id} - ${pessoa.nome}\r\n`, {encoding: 'utf-8', flag: 'a'}, function(err){
		if(err) throw err;
	})
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

app.post('/contatos/editar/', function(req, res){
	id = req.body.id;
	let index = contatos.map(c => c.id).indexOf(parseInt(id));

	contatos[index].nome = req.body.nome;
	contatos[index].telefone = req.body.telefone;
	contatos[index].email = req.body.email;
	contatos[index].endInst = req.body.endInst;
	contatos[index].endCob = req.body.endCob;
	contatos[index].velocidade = req.body.velocidade;
	contatos[index].valor = req.body.valor;

	res.redirect('/');
});

app.get('/contatos/excluir/:id', function(req, res){
	id = req.params.id;
	let index = contatos.map(c => c.id).indexOf(parseInt(id));

	contatos.splice(index, 1);

	res.redirect('/');
});

app.use(express.static(__dirname + '/public'))

app.listen(3000, function(){
	console.log('Servidor pronto');
});
