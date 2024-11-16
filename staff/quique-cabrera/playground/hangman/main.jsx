const root = ReactDOM.createRoot(document.querySelector('#root'))

const Component = React.Component

class App extends Component {
    constructor(props) {
        super(props)

        // Request the word from the user and ensure it's a single valid word
        let wordInput = prompt('Choice a Single Word (no spaces):')
        const defaultWord = 'Esternocleidomastoideo'

        if (!wordInput || !/^[a-zA-Z]+$/.test(wordInput)) {
            wordInput = defaultWord
        }

        // Request the name with a prompt
        const playerName = prompt('Enter your name:') || 'Player'

        this.state = {
            player: playerName, // Save a player name
            guess: wordInput, // Save a word
            feedback: null,
            assertions: Array(wordInput.length).fill('_'), // Initialize with dashes based on the length of the word
            completed: false, // New state to track if the word has been completed.
            attemptsLeft: 3, // Attempts Left
            errors: 0 // Error Counter
        }
    }

    render() {
        return (
            <main>
                <h1 style={{
                    backgroundColor: 'chocolate',
                    color: 'gold',
                    fontWeight: 'bold'
                }}>Hangman</h1>

                {/* Display the form only if the word has not been completed */}
                {!this.state.completed && this.state.attemptsLeft > 0 && (
                    <form onSubmit={
                        event => {
                            event.preventDefault()

                            const form = event.target
                            const input = form.char
                            const char = input.value.toLowerCase() // Convert to lowercase
                            form.reset()

                            const word = this.state.guess.toLowerCase()
                            let assertions = [...this.state.assertions] //... => Create a array copy 
                            let feedback = '👎🏻'
                            let errors = this.state.errors
                            let attemptsLeft = this.state.attemptsLeft

                            // We loop through the word to update the dashes if the letter is present
                            if (word.includes(char)) {
                                word.split('').forEach((letter, index) => {
                                    if (letter === char) {
                                        assertions[index] = char
                                        feedback = '👍🏻'
                                    }
                                })
                            } else {
                                feedback = '👎🏻'
                                errors += 1
                                attemptsLeft -= 1 // Increase attemps
                            }

                            // Check if the word has been completed
                            const completed = assertions.join('') === word

                            // update status
                            this.setState({ feedback, assertions, completed, errors, attemptsLeft })
                        }
                    }>
                        <label htmlFor="char">Char</label>
                        <input type='text' id="char" maxLength="1" required />
                        <button type="submit">Try</button>
                    </form>
                )}

                <p>{this.state.player}: {this.state.feedback}</p>
                <p>Assertions: {this.state.assertions.join(' ')}</p>

                {/* Display attempts Left ♡ with string.prototype.repeat*/}
                <p>Attempts Left: {'♡'.repeat(this.state.errors)}{'♥'.repeat(this.state.attemptsLeft)}</p>

                {/* Display a congratulatory message if the word has been completed */}
                {this.state.completed && (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                        Congratulations, {this.state.player}! You've guessed the word! {this.state.guess}
                    </p>
                )}

                {/* Display a message if the attempts are exhausted.*/}
                {this.state.attemptsLeft === 0 && !this.state.completed && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        Game Over! {this.state.player}! The Word Was: {this.state.guess}
                    </p>
                )}
            </main>
        )
    }
}

root.render(<App />)
