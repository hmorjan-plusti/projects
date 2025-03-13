const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const verificado = jwt.verify(token.replace('Bearer ', ''), 'secreto');
        req.usuario = verificado;
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
};
