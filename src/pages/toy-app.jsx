import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter.jsx"
import { ToyList } from "../cmps/toy-list.jsx"
import { userService } from "../services/user.service.js"
import { setFilter } from "../store/actions/filter.action.js"
import { loadToys, deleteToy } from "../store/actions/toy.action.js"

class _ToyApp extends React.Component {

    componentDidMount() {
        this.props.loadToys()
    }

    onSetFilter = (ev) => {
        const filterPackage = {
            checked: ev.target.checked,
            value: ev.target.value,
            field: ev.target.name
        }
        this.props.setFilter(filterPackage)
        this.props.loadToys()
    }

    render() {
        return <main>
            <ToyFilter onSetFilter={this.onSetFilter} />
            <Link to='/toy/edit/' className="btn">Add</Link>
            <button onClick={ev => {
                userService.logout()
            }}>Logout</button>
            <ToyList toys={this.props.toys} deleteToy={this.props.deleteToy} />
        </main>
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.filterModule.filterBy,
    }
}

const mapDispatchToProps = {
    loadToys,
    deleteToy,
    setFilter
}

export const ToyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyApp)
