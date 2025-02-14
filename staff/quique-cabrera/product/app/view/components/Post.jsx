import { useState } from 'react'

import './Post.css'

import logic from '../../logic'

import formatDate from '../helper/formatDate'

function Post({ post, onPostDeleted, onPostLikeToggled, onPostTextEdited }) {
    console.log('Post -> render')

    const [edit, setEdit] = useState(false)

    const [text, setText] = useState(post.text)



    const handleDeleteButton = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleEditButtonClick = () => setEdit(true)

    const handleCancelEditButtonClick = () => {
        setEdit(false)
        setText(post.text)
    }

    const handlePostTextChange = event => setText(event.target.value)

    const handleSaveEditButtonClick = () => {
        setEdit(false)

        try {
            logic.updatePostText(post.id, text)
                .then(() => onPostTextEdited())
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Post -> render')

    return <article className='Post'>
        <h3 className="Post-author">{post.author.username}</h3>

        <button type="button" onClick={handleToggleLikeClick} className="Toggle-Image-Like"> <img className="Post-image" src={post.image} /></button>

        {edit ?
            <input className="Post-text Post-text--highlight" onChange={handlePostTextChange} defaultValue={text} />
            :
            <p className="Post-text Post-text">{text}</p>
        }

        {post.own && <>
            {edit ?
                <div>
                    <button type="button" onClick={handleSaveEditButtonClick}>save</button>
                    <button type="button" onClick={handleCancelEditButtonClick}>cancel</button>
                </div>
                :
                <button type="button" onClick={handleEditButtonClick}>edit</button>
            }
        </>}

        <div className="Post-bottom">
            <time className="Post-date">{formatDate(post.date)}</time>

            <button type="button" onClick={handleToggleLikeClick} className="Toggle-Like">{`${post.liked ? '❤️' : '🤍'} ${post.likes}`}</button>

            {post.own && <button type="button" onClick={handleDeleteButton} className="Post-delete">X</button>}
        </div>
    </article>
}

export default Post