import React from "react"
import { connect } from "react-redux"

function _MultiSelect({ onSetFilter, labels }) {

    return <div className="multi-select">
        <input id="select-toggle" type="checkbox" />
        <label htmlFor="select-toggle" className="select-toggle">...</label>
        <div className="options-container" >
            {labels && labels.map((label, idx) => {
                return <React.Fragment key={label}>
                    <input type="checkbox" value={label} name="label" onChange={(ev) => {
                        onSetFilter(ev)
                    }} /> <h5>{label}</h5>
                </React.Fragment>
            })}

            {/* <input type="checkbox" value={'battery powered'} name="label" onChange={(ev) => {
                onSetFilter(ev)
            }} /> <h5>Battery Powered</h5>
            <input type="checkbox" value={'baby'} name="label" onChange={(ev) => {
                onSetFilter(ev)
            }} /> <h5>Baby</h5> */}
        </div>
    </div>
}

const mapStateToProps = (storeState) => {
    return {
        filterBy: storeState.filterModule.filterBy,
        labels: storeState.toyModule.labels
    }
}

export const MultiSelect = connect(mapStateToProps)(_MultiSelect)