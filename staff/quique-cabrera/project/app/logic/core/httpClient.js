const createHttpClient = (baseURL) => {
    const handleResponse = async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error en la petición');
        return data;
    };

    const createHeaders = (token, contentType = true) => {
        const headers = {};
        if (contentType) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    };

    return {
        get: (endpoint, token) =>
            fetch(`${baseURL}${endpoint}`, {
                headers: createHeaders(token, false)
            }).then(handleResponse),

        post: (endpoint, data, token) =>
            fetch(`${baseURL}${endpoint}`, {
                method: 'POST',
                headers: createHeaders(token),
                body: JSON.stringify(data)
            }).then(handleResponse),

        delete: (endpoint, token) =>
            fetch(`${baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: createHeaders(token)
            }).then(handleResponse)
    };
};

export default createHttpClient; 