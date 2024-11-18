class Home extends Component {
    constructor() {
        super(document.createElement('main'))

        const title = new Heading(2)
        title.setText('Home')
        this.add(title)

        const userGreeting = new Heading(3)
        userGreeting.setText('Hello, User!')
        this.add(userGreeting)

        const logoutButton = new Button('button')
        logoutButton.setText('logout')
        this.add(logoutButton)

        const addPostButton = new Button('button')
        addPostButton.setText('+')
        this.add(addPostButton)
    }
    setUserName(name) {
        this.children[1].setText(`Hello, ${name}!`)
    }

    onLoggedOut(callback) {
        const logoutButton = this.children[2]

        logoutButton.addBehavior('click', () => {
            try {
                logic.logoutUser()

                callback()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })
    }


}