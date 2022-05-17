import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { showUserMsg } from "../services/event-bus.service";
// import { toyService } from "../services/toy.service";

export function EditForm({ toy, onInput, onSubmit, onDelete }) {

    if (!toy) return <React.Fragment></React.Fragment>
    const { name, price, inStock, _id } = toy
    return (
        < Formik
            onSubmit={values => {
                onSubmit()
            }}
            enableReinitialize={true}
            initialValues={{ name, price, inStock }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Required';
                }
                if (!values.price) {
                    errors.price = 'Required'
                }
                return errors;
            }}
        >
            {({ isSubmitting, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <label> <h2>Name</h2>
                        <input type="text" name="name" autoComplete="off" value={name} onChange={onInput} />
                    </label>
                    <label htmlFor="">
                        <h2>Price</h2>
                        <input type="number" name="price" value={price} onChange={onInput} />
                    </label>
                    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="">
                            <h2>In Stock:</h2>
                            <input type="checkbox" name="inStock" id="" checked={inStock} onChange={onInput} />
                        </label>
                    </section>
                    <button className="btn" onClick={(ev) => {
                        onDelete(_id)
                    }}>X</button>
                    <button className="btn" type="submit" disabled={isSubmitting}>Save</button>
                    <h1>{Object.values(errors)}</h1>
                </Form>
            )
            }
        </Formik >
    )
}