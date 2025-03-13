const blacklist = new Set();

export const blacklistToken = (token) => {
    if (!token) {
        console.warn('Intento de añadir un token vacío a la blacklist.');
        return;
    }

    console.log('Añadiendo token a la blacklist:', token);
    blacklist.add(token);
    console.log(`Token añadido correctamente. Total en blacklist: ${blacklist.size}`);
};

export const isTokenBlacklisted = (token) => {
    const isBlacklisted = blacklist.has(token);
    console.log(`Verificando token: ${token} | Está en blacklist: ${isBlacklisted}`);
    return isBlacklisted;
};
