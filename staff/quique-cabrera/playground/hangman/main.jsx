const root = ReactDOM.createRoot(document.querySelector('#root'))

const Component = React.Component

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedback: null,
            assertions: Array(props.guess.length).fill('_'), // Initialize with dashes based on the length of the word
            completed: false // New state to track if the word has been completed.
        }
    }

    render() {
        return <main>
            <h1 style={{
                backgroundColor: 'chocolate',
                color: 'gold'
            }}>Hangman</h1>

            {/* Display the form only if the word has not been completed */}
            {!this.state.completed && (
                <form onSubmit={
                    event => {
                        event.preventDefault()

                        const form = event.target
                        const input = form.char
                        const char = input.value
                        form.reset()

                        const word = this.props.guess
                        let assertions = [...this.state.assertions] //... => Create a array copy 
                        let feedback = '👎🏻'

                        // We loop through the word to update the dashes if the letter is present
                        word.split('').forEach((letter, index) => {
                            if (letter === char) {
                                assertions[index] = char
                                feedback = '👍🏻'
                            }
                        })

                        // Check if the word has been completed
                        const completed = assertions.join('') === word

                        // update status
                        this.setState({ feedback, assertions, completed })
                    }
                }>
                    <label htmlFor="char">Char</label>
                    <input type='text' id="char" maxLength="1" required />
                    <button type="submit">Try</button>
                </form>
            )}

            <p>{this.props.player}: {this.state.feedback}</p>
            <p>assertions: {this.state.assertions.join(' ')}</p>

            {/* Display a congratulatory message if the word has been completed */}
            {this.state.completed && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    Congratulations! You've guessed the word! {this.props.guess}
                </p>
            )}
        </main>
    }
}

root.render(<App player="QuiQue" guess={'murcielago'} />)
