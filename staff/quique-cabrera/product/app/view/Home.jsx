const Component = React.Component

class Home extends Component {
    constructor(props) {
        console.log('Home --> constructor')

        super(props)

        this.state = {
            greeting: '',
            posts: [],
            view: 'posts'
        }
    }

    componentDidMount() {
        console.log('Home --> componentDidMount')

        try {
            const name = logic.getUserName()
            this.setState({ greeting: `Hello, ${name}!` })

            const posts = logic.getPosts();
            this.setState({ posts });

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    render() {
        console.log('Home --> render')

        return <main>
            <h2>Home</h2>

            <h3>{this.state.greeting}</h3>

            <button type="button" onClick={() => {
                try {
                    logic.logoutUser()

                    this.props.onUserLoggedOut()
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }}>logout</button>
            <button type="button" onClick={() => {

                this.setState({ view: 'createPost' })

            }}>+</button>

            {this.state.view === 'createPost' && <CreatePost onCreatedPost={() => this.setState({ view: 'posts' })} />}

            {this.state.view === 'posts' && <ul>
                {
                    this.state.posts.map(post => {
                        return <article>
                            <h3>{post.author.username}</h3>
                            <img src={post.image} />
                            <p>{post.text}</p>
                            <time>{post.date}</time>
                            <button type="button" onClick={() => {
                                try {

                                    logic.deletePost(post.id)

                                    const posts = logic.getPosts()

                                    this.setState({ posts })

                                } catch (error) {
                                    alert(error.message)

                                    console.error(error)
                                }
                            }}> x </button>
                        </article>
                    })
                }
            </ul>}

        </main>

    }
}