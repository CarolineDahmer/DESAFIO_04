const express = require('express');
const { cadastrarUsuario, atualizarPerfil } = require('./controladores/usuarios');
const verificarLogin = require('./intermediarios/validarToken');
const {login} = require('./controladores/login');
const { verificarUsuarioExistente, verificarCamposObrigatorios } = require('./intermediarios/validacoes');

const rotas = express()

rotas.post("/usuario", cadastrarUsuario)

rotas.post("/login", login);

rotas.put('/usuario', verificarCamposObrigatorios,verificarLogin, atualizarPerfil);

//rotas.put("/usuario", verificarLogin, atualizarUsuario);

module.exports = rotas