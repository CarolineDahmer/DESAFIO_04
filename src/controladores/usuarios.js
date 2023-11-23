const bcrypt = require("bcrypt");
const knex = require('../conexao');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha} = req.body;

  try {
      const quantidadeUsuarios = await knex('usuarios').where('email',email).first()

      if (quantidadeUsuarios) {
          return res.status(400).json("O email já existe");
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuario = await knex('usuarios').insert({nome, email, senha: senhaCriptografada}).returning('*')

      if(!usuario[0]){
          return res.status(400).json("O usuario não foi cadastrado")
      }
      return res.status(200).json("O usuario foi cadastrado com sucesso!");
  } catch (error) {
      return res.status(400).json(error.message);
  }
}

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha} = req.body;

  try {
      const emailExiste = await knex('usuarios').where({email}).first()

      if (emailExiste && emailExiste !== req.usuario.email){
          return res.status(400).json('O email já existe')
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const usuarioAtualizado = await knex('usuario').where({id: req.usuario.id}).update({nome,email, senha: senhaCriptografada})
      
      if (!usuarioAtualizado) {
          return res.status(400).json("O usuario não foi atualizado");
      }

      return res.status(200).json('Usuario foi atualizado com sucesso.');
  } catch (error) {
      return res.status(400).json(error.message);
  }
}




module.exports = { cadastrarUsuario,atualizarPerfil};