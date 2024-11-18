class Label extends Component {
    constructor(targetId) {
        super(document.createElement('label'))

        this.container.htmFor = targetId
    }

    setText(text) {
        this.container.innerText = text
    }
}

