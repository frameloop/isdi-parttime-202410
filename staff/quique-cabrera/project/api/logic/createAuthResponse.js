export default function createAuthResponse(user, token, photographerId = null) {
    return {
        token,
        name: user.name,
        role: user.role,
        userId: user._id.toString(),
        ...(photographerId && { photographerId })
    };
}