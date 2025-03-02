import { useState, useEffect } from 'react'

import logic from '../logic'

import Posts from './components/Posts'
import CreatePost from './components/CreatePost'

import { Routes, Route, useNavigate } from 'react-router-dom'

import { useAppContext } from '../context'

function Home({ onUserLoggedOut }) {
    const navigate = useNavigate()

    const { alert } = useAppContext()

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

    useEffect(() => {
        switch (view) {
            case 'posts':
                navigate('/')
                break
            case 'create-post':
                navigate('/create-post')
                break
        }
    }, [view])

    const handleLogoutButtonClick = () => {
        try {
            logic.logoutUser()

            onUserLoggedOut()
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

    return <div className="p-[2%]">
        <header className="bg-black bg-opacity-50 flex items-center justify-between fixed top-2 w-[96%] text-white rounded-lg mb-2 px-4 py-2">

            <h2 className="text-3xl text-white px-3 font-black" onClick={handleHomeClick}>H</h2>

            <h3 className="text-lg text-white mx-auto">{name}</h3>

            <button className="bg-[#282c34] text-white border border-white px-4 py-2 m-2 cursor-pointer rounded-md" type=" button" onClick={handleLogoutButtonClick}>Logout</button>
        </header >

        <div className="mt-[80px] mb-[36px]">
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/create-post" element={<CreatePost onPostCreated={handlePostCreated} onCancel={handleCancelCreatePost} />} />
            </Routes>
        </div>

        <footer className="bg-transparent flex items-center justify-center fixed bottom-0 w-screen h-15 left-0">
            {view !== 'create-post' && <button className="rounded-[15px] border-none w-12 font-bold text-[1.2em] bg-[rgba(255,0,102,0.8)] text-white p-2" type="button" onClick={handleCreatePostButtonClick}>+</button>}
        </footer>
    </div >
}

export default Home