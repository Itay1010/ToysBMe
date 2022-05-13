import React from "react"
import { connect } from "react-redux"
import { ToyFilter } from "../cmps/toy-filter.jsx"
import { ToyList } from "../cmps/toy-list.jsx"
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
