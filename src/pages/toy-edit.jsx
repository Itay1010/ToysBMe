import React from "react"
import { connect } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { toyService } from "../services/toy.service.js"
import { deleteToy, saveToy } from "../store/actions/toy.action.js"
import { EditForm } from "./edit-form.jsx";

class _ToyEdit extends React.Component {
    state = {
        toy: toyService.getEmptyToy()
    }

    componentDidMount() {
        if (!this.props.match.params.toyId) {
            console.log('new toy')
            return
        }
        toyService.getById(this.props.match.params.toyId)
            .then((resToy) => this.setState({ toy: resToy }))
    }

    handleInput = (ev) => {
        const field = ev.target.name
        const { value } = ev.target
        if (field === 'inStock') return this.setState((prevState) => ({ toy: { ...prevState.toy, inStock: !prevState.toy.inStock } }))
        this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
    }

    onSubmit = () => {
        try {
            this.props.saveToy(this.state.toy)
        } catch (err) {
            console.log(err)
        }
        this.props.history.push('/toy')
    }
    
    onDelete = (id) => {
        this.props.deleteToy(id)
        this.props.history.push('/toy')
    }

    render() {
        if (!this.state.toy) return <h1>Loading...</h1>
        const { toy } = this.state
        return <EditForm toy={toy} onInput={this.handleInput} onSubmit={this.onSubmit} onDelete={this.onDelete} />
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys
    }
}

const mapDispatchToProps = {
    deleteToy,
    saveToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)