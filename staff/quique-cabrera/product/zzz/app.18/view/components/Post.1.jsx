import './Post.css'

import logic from '../../logic'

import formatDate from '../helper/formatDate'

function Post(props) {
    console.log('Post -> render')

    const handleDeleteButton = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(props.post.id)
                    .then(() => props.onPostDeleted())
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
        <h3 className="Post-author">{props.post.author.username}</h3>

        <img className="Post-image" src={props.post.image} />

        <p className='Post-text'>{props.post.text}</p>

        <div className="Post-bottom">
            <time className="Post-date">{formatDate(props.post.date)}</time>

            {props.post.own && <button type="button" onClick={handleDeleteButton} className="Post-delete">X</button>}
        </div>
    </article>
}

export default Post