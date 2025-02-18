import { useState, useEffect } from 'react'

import logic from '../../logic'

import Post from './Post'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('Home -> old componentDidMount')

        loadPosts()
    }, [])

    const loadPosts = () => {
        try {
            logic.getPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handlePostDeleted = () => loadPosts()

    const handlePostLikeToggled = () => loadPosts()

    const handlePostTextEdited = () => loadPosts()

    console.log('Posts -> render')

    return <main class="flex flex-col gap-3">
        {posts.map(post => <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostLikeToggled={handlePostLikeToggled}
            onPostTextEdited={handlePostTextEdited}
        />)}
    </main>

}

export default Posts