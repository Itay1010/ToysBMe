import React from "react"
import { MultiSelect } from "./multi-select.jsx"

export function ToyFilter({ onSetFilter }) {

    return <form className="toy-filter" onSubmit={(ev) => {
        ev.preventDefault()
    }}>
        <button className=".btn">Filter</button>
        <input type="text" name="txt" onChange={(ev) => onSetFilter(ev)} />
        <select name="inStock" id="" onChange={(ev) => onSetFilter(ev)}>
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
        </select>
        <MultiSelect onSetFilter={onSetFilter} />
    </form>
}