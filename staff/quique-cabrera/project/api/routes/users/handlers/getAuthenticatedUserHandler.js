export default (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { _id, name, email, role } = req.user;

    res.status(200).json({ _id, name, email, role });
};
