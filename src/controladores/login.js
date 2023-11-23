const knex = require('../conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaToken = require('../senhaToken');

const login = async (req,res) => {
    const {email, senha } = req.body
  
    try {
      const usuario = await knex('usuarios').where('email',email).first()
      
      console.log(usuario)
  
      if(!usuario){
        return res.status(404).json('O usuario não foi encontrado')
      }
  
      const senhaCorreta = await bcrypt.compare(senha,usuario.senha)
  
      if (!senhaCorreta) {
        return res.status(400).json("Email e senha não conferem")
      }
  
      const token = jwt.sign({id: usuario.id}, senhaToken, { expiresIn: '8h'})
  
      const {senha: _, ...usuarioLogado} = usuario
  
      return res.status(200).json({
        usuario: usuarioLogado,
        token
      })
  
    } catch (error) {
      console.log(error)
      return res.status(400).json(error.message);
    }
  
  }

module.exports = {
    login
}
