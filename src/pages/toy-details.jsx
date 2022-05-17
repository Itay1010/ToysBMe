import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { toyService } from "../services/toy.service"

export class _ToyDetails extends React.Component {

    state = {
        toy: null
    }

    componentDidMount() {
        this.loadToy()
    }

    loadToy = async () => {
        const { match } = this.props
        const res = await toyService.getById(match.params.toyId)
        this.setState({ toy: res })
    }






    render() {
        const { toy } = this.state
        const { history } = this.props
        if (!toy) return <h1>Loading...</h1>
        const { name, price, labels, inStock, _id, reviews } = toy
        return <main className="toy-details">
            <section className="toy-info-container">
                <img src="" alt="" />
                <h2>Name: {name}</h2>
                <h2>Price: {price}</h2>
                <h2>Labels: {labels}</h2>
                <h2>In Stock: {inStock ? 'Yes' : 'No'}</h2>
                <h2>Id: {_id}</h2>
            </section>
            <section className="details-tools">
                <Link className="btn" to={'/toy/edit/' + _id}>
                    Edit
                </Link>
            </section>
            <hr />
            <h1>Reviews</h1>
            {/* <section className="review-container">
                {reviews.map(review => {
                    return <section key={review._id} className="review-preview">
                        <h3>{review.title}</h3>
                        <h5>{review.creator.username}</h5>
                        <h4>{review.description}</h4>
                    </section>
                })}
            </section> */}
        </main >
    }
}

export const ToyDetails = withRouter(_ToyDetails)