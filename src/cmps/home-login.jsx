import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from "react-redux"
import { loadToys } from "../store/actions/toy.action"
import { userService } from "../services/user.service";

function _UserLogin({toys, loadToys}) {
    return <Formik
        onSubmit={async (values, actions) => {
            try {
                await userService.login(values)
                console.log('logged in')
            } catch (error) {
                console.log('onSubmit - error', error)
            }
            actions.setSubmitting(false)
        }}
        enableReinitialize={true}
        initialValues={{ username: '', password: '' }}
        validate={values => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors;
        }}
    >
        {({ isSubmitting, errors, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit" disabled={isSubmitting}>Login</button>
                <h1>{Object.values(errors)}</h1>
            </Form>
        )
        }
    </Formik >

}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys
    }
}

const mapDispatchToProps = {
    loadToys
}

export const UserLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(_UserLogin)