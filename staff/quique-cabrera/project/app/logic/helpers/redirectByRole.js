export default function redirectByRole(payload) {
    return payload.role === 'customer'
        ? '/home-customer'
        : payload.role === 'photographer'
            ? '/home-photographer'
            : payload.role === 'administrator'
                ? '/home-admin'
                : '/home';
}