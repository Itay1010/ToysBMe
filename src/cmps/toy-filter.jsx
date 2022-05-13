import React from "react"
import { MultiSelect } from "./multi-select.jsx"

export function ToyFilter({ }) {

    return <form className="toy-filter" onSubmit={(ev) => {
        ev.preventDefault()
    }}>
        <button className=".btn">Filter</button>
        <input type="text" />
        <select name="inStock" id="">
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
        </select>
        <MultiSelect />
    </form>
}