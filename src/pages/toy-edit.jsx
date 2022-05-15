import React from "react"
import { connect } from "react-redux"
import { toyService } from "../services/toy.service.js"
import { deleteToy, editToy, saveToy } from "../store/actions/toy.action.js"

class _ToyEdit extends React.Component {
    state = {
        toy: null
    }
    componentDidMount() {
        toyService.getById(this.props.match.params.toyId)
            .then((resToy) => this.setState({ toy: resToy }))
    }

    componentWillUnmount(nextProps, nextState) {
        this.props.saveToy(this.state.toy)
    }

    handleInput = (ev) => {
        const field = ev.target.name
        const { value } = ev.target
        if (field === 'inStock') return this.setState((prevState) => ({ toy: { ...prevState.toy, inStock: !prevState.toy.inStock } }))
        this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
    }

    onSubmit() {
        this.props.saveToy(this.state.toy)
        this.props.history.push('/toy')
    }

    render() {
        if (!this.state.toy) return <h1>Loading...</h1>
        const { toy: { name, price, inStock } } = this.state
        return <form onSubmit={(ev) => {
            ev.preventDefault()
            this.onSubmit()
        }}>
            <h2>Name:</h2><input type="text" name="name" value={name} onChange={(ev) => this.handleInput(ev)} />
            <h2>Price:</h2><input type="number" name="price" value={price} onChange={(ev) => this.handleInput(ev)} />
            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>In Stock:</h2>
                <input type="checkbox" name="inStock" id="" checked={inStock} onChange={(ev) => this.handleInput(ev)} />
            </section>
            <button>Save</button>
        </form>
    }
}

const mapStateToProps = (storeState) => {
    return {
        // toys: storeState.toyModule.toys
    }
}

const mapDispatchToProps = {
    deleteToy,
    editToy,
    saveToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)