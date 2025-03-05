function extractPayloadFromToken(token) {
    try {
        if (!token || typeof token !== "string") {
            throw new Error("Invalid or missing token.");
        }

        var parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("The token does not have a valid JWT format.");
        }

        var payloadB64 = parts[1];

        // JWT uses Base64 URL-safe encoding, replace characters to standard Base64
        payloadB64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');

        // Decode Base64
        var payloadJSON = atob(payloadB64);

        // Parse JSON into an object
        return JSON.parse(payloadJSON);
    } catch (error) {
        console.error("Error extracting the payload from the token:", error.message);
        return null;
    }
}

export default extractPayloadFromToken;
