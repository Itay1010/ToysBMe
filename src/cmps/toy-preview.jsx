import React from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/user.service"

export function ToyPreview({ toy, deleteToy }) {

    const { name, price, labels, inStock, _id } = toy
    let user = userService.getLoggedinUser()
    const isAdmin = user ? user.isAdmin : null
    return <section className="toy-preview">
        {/* <img src="" alt="" /> */}
        <section>
            <h3>name: {name}</h3>
            <h3>price: {price}</h3>
            <h3>labels: [{labels.join(', ')}]</h3>
            <h3>{inStock ? 'In Stock' : 'Out of Stock'}</h3>
        </section>
        <section>
            <Link to={'/toy/' + _id} className="btn">
                Details
            </Link>
            {isAdmin &&
                <Link to={'/toy/edit/' + _id} className="btn">
                    Edit
                </Link>
            }
            {isAdmin && <button className="btn" onClick={(ev) => deleteToy(_id)}>X</button>}
        </section>
    </section>
}