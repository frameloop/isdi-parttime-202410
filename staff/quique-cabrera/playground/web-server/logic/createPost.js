const localStorage = require('../data/localStorage');
const sessionStorage = require('../data/sessionStorage');
const uuid = require('../data/uuid');

const createPost = (image, text) => {
    // Inicializa localStorage.posts si está vacío o no existe
    if (!localStorage.posts) {
        localStorage.posts = JSON.stringify([]);
    }

    // Valida que image y text sean strings
    if (typeof image !== 'string' || !image.trim()) {
        throw new Error('Image must be a valid string');
    }

    if (typeof text !== 'string' || !text.trim()) {
        throw new Error('Text must be a valid string');
    }

    // Parsea los posts existentes
    const posts = JSON.parse(localStorage.posts);

    // Crea el nuevo post
    const post = {
        id: uuid(),
        author: sessionStorage.userId,
        image: image.trim(),
        text: text.trim(),
        date: new Date().toISOString()
    };

    // Agrega el nuevo post y actualiza localStorage
    posts.push(post);
    localStorage.posts = JSON.stringify(posts);
};

module.exports = createPost;
