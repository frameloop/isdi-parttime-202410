export default (req, res) => {
    // Verificamos que el usuario esté autenticado (req.userId viene del middleware)
    if (!req.userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' })
    }

    const { _id, name, email, role } = req.user

    // Devolvemos la info básica del usuario autenticado
    res.status(200).json({ _id, name, email, role })
}
