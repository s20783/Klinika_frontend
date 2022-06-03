handleChange = (event) => {
    const {name, value} = event.target
    const klub_zawodnik = {...this.state.klub_zawodnik}
    klub_zawodnik[name] = value

    const errorMessage = this.validateField(name, value)
    const errors = {...this.state.errors}
    errors[name] = errorMessage

    this.setState({
        klub_zawodnik: klub_zawodnik,
        errors: errors
    })
}