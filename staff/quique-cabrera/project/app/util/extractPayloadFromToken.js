function extractPayloadFromToken(token) {
    if (!token || typeof token !== "string") throw new Error("Invalid or missing token.");
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error("The token does not have a valid JWT format.");
    const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payloadB64));
}

export default extractPayloadFromToken;