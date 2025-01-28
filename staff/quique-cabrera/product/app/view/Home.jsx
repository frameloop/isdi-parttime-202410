import './Home.css'

import { useState, useEffect } from 'react'

import logic from '../logic'

import Posts from './components/Posts'
import CreatePost from './components/CreatePost'

function Home(props) {
    const [view, setView] = useState('posts')
    const [name, setName] = useState(null)

    useEffect(() => {
        console.log('Home -> old componentDidMount')

        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleLogoutButtonClick = () => {
        try {
            logic.logoutUser()

            props.onUserLoggedOut()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handlePostCreated = () => setView('posts')

    const handleCreatePostButtonClick = () => setView('create-post')

    const handleCancelCreatePost = () => setView('posts')

    const handleHomeClick = () => setView('posts')

    console.log('Home -> render')

    return <div className='Home'>
        <header className='Home-header'>
            <h2 className='Home-logo' onClick={handleHomeClick}>H</h2>

            <h3 className="Home-name">{name}</h3>

            <button type=" button" onClick={handleLogoutButtonClick} className="Logout-button">Logout</button>
        </header >

        <div className='Home-content'>
            {view === 'posts' && <Posts />}
            {view === 'create-post' && <CreatePost onPostCreated={handlePostCreated} onCancel={handleCancelCreatePost} />}
        </div>

        <footer className="Home-footer">
            {view !== 'create-post' && <button type="button" onClick={handleCreatePostButtonClick} className="New-post">+</button>}
        </footer>
    </div >
}

export default Home