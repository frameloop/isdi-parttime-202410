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

    return <article>
        <h3>{props.post.author.username}</h3>

        <img src={props.post.image} />

        <p>{props.post.text}</p>

        <time>{props.post.date}</time>

        {props.post.own && <button type="button" onClick={handleDeleteButton}> X </button>}
    </article>
}
