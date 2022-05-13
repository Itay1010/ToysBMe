import React, { useState } from "react"
import { connect } from "react-redux"

function _MultiSelect({ onChecked }) {


    return <div className="multi-select">
        <input id="select-toggle" type="checkbox" />
        <label htmlFor="select-toggle" className="select-toggle">...</label>
        <div className="options-container">
            <input type="checkbox" onChange={(ev) => {
                onChecked()
            }} /> <h5>Doll</h5>
            <input type="checkbox" onChange={(ev) => {
                onChecked()
            }} /> <h5>Battery Powered</h5>
            <input type="checkbox" onChange={(ev) => {
                onChecked()
            }} /> <h5>Baby</h5>
        </div>
    </div>

}

const mapStateToProps = (storeState) => {
    return {
        filterBy: storeState.filterModule.filterBy
    }
}

export const MultiSelect = connect(mapStateToProps)(_MultiSelect)