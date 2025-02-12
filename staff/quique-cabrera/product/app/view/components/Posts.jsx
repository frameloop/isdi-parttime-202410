import './Posts.css'

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

    console.log('Posts -> render')

    return <main className='Posts'>
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} onPostLikeToggled={handlePostLikeToggled} />)}
    </main>

}

export default Posts