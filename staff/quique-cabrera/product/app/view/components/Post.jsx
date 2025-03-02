import { useState } from 'react'

import logic from '../../logic'

import formatDate from '../helper/formatDate'

import { useAppContext } from '../../context'

function Post({ post, onPostDeleted, onPostLikeToggled, onPostTextEdited }) {
    console.log('Post -> render')

    const { alert, confirm } = useAppContext()

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(post.text)

    const handleDeleteButton = () => {
        confirm('Delete post?', accepted => {
            if (accepted)
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
        })
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

    return <article className="rounded-xl p-4 bg-white">
        <h3 className="m-0">{post.author.username}</h3>

        <button type="button" onClick={handleToggleLikeClick} className="m-0 p-0 bg-none border-none outline-none;"> <img className="w-full" src={post.image} /></button>

        {edit ?
            <input className="border border-red-500 border-dashed pl-[6px] mb-[4px] w-full box-border rounded-lg" onChange={handlePostTextChange} defaultValue={text} />
            :
            <p className="m-0 mb-[1px]">{text}</p>
        }

        {post.own && <>
            {edit ?
                <div>
                    <button type="button" onClick={handleSaveEditButtonClick} className="border-none outline-none text-white bg-gray-600 rounded-md px-2 py-1">save</button>

                    <button type="button" onClick={handleCancelEditButtonClick} className="border-none outline-none text-white bg-red-500 rounded-md ml-1 px-2 py-1">cancel</button>
                </div>
                :
                <button type="button" onClick={handleEditButtonClick} className="border-none outline-none text-white bg-gray-600 rounded-md px-2 py-1">edit</button>
            }
        </>}

        <div className="flex items-center justify-between">
            <time className="text-[0.7rem] text-gray-500 font-light">{formatDate(post.date)}</time>

            <button type="button" onClick={handleToggleLikeClick} className="ml-auto bg-none border-none outline-none text-[1.3rem]">{`${post.liked ? '❤️' : '🤍'} ${post.likes}`}</button>

            {post.own && <button type="button" onClick={handleDeleteButton} className="bg-red-500 text-white border-none rounded-md cursor-pointer px-2">X</button>}
        </div>
    </article>
}

export default Post