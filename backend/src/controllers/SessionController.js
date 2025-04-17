// index = listagem de sesões
// show = unica
// store = cria

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        try {
          let user = await User.findOne({ email });
      
          if (!user) {
            user = await User.create({ email });
          }
      
          return res.json({ _id: user._id });   
        } catch (err) {
          console.error("Erro ao criar ou buscar usuário:", err);
          return res.status(500).json({ error: "Erro no servidor" });
        }
    }
}





