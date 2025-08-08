
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const pastaUsuarios = path.join(__dirname, 'usuarios');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/usuarios', (req, res) => {
    fs.readdir(pastaUsuarios, (err, arquivos) => {
        if (err) {
            return res.status(500).send('Erro ao listar usuários.');
        }

        
        const usuarios = arquivos
            .filter(arq => arq.endsWith('.json'))
            .map(arq => arq.replace('.json', ''));

        res.render('listaUsuarios', { usuarios });
    });
});


app.get('/usuarios/:email', (req, res) => {
    const arquivoUsuario = path.join(pastaUsuarios, req.params.email + '.json');

    fs.readFile(arquivoUsuario, 'utf8', (err, dados) => {
        if (err) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const usuario = JSON.parse(dados);
        res.render('detalhesUsuario', { usuario });
    });
});


app.get('/pesquisar', (req, res) => {
    const termo = req.query.email;

    if (!termo) {
        return res.redirect('/usuarios');
    }

    const arquivoUsuario = path.join(pastaUsuarios, termo + '.json');
    fs.readFile(arquivoUsuario, 'utf8', (err, dados) => {
        if (err) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const usuario = JSON.parse(dados);
        res.render('detalhesUsuario', { usuario });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
