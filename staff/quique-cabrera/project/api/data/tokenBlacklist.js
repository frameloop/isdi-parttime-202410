const blacklist = new Set();

export const blacklistToken = (token) => blacklist.add(token);
export const isTokenBlacklisted = (token) => blacklist.has(token);
