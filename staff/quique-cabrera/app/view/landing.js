class Landing extends Component {
    constructor() {
        super(document.createElement('main'))

        const title = new Heading(2)
        title.setText('Welcome!')
        this.add(title)

        const intro = new Paragraph
        this.add(intro)

        const registerLink = new Link
        registerLink.setText('Regiter')
        intro.add(registerLink)

        const orText = new Text(' or ')
        intro.add(orText)

        const loginLink = new Link
        loginLink.setText('Login')
        intro.add(loginLink)
    }
}