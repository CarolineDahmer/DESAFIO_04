const knex = require('../conexao');

const verificarCamposObrigatorios = async (req,res,next) => {
    const { nome, email, senha} = req.body;

    try {

        if (!nome) {
            return res.status(404).json("O campo nome é obrigatório");
        }

        if (!email) {
            return res.status(404).json("O campo email é obrigatório");
        }

        if (!senha) {
            return res.status(404).json("O campo senha é obrigatório");
        }

        next();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports = {verificarCamposObrigatorios}