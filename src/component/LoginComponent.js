import React from "react";
import '../assets/plugins/fontawesome-free/css/all.min.css';
import '../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import '../assets/dist/css/adminlte.min.css';
import { json, Link, NavLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

const required = value => (value ? undefined : 'Required');
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
const minValue = min => value =>
isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  console.log(values);
}

function AdminLogin(props) {
    return(
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <b>SD</b>ADMIN
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                        <Form onSubmit={onSubmit}
                            initialValues={{}}
                            render={({handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field name="username" validate={required}>
                                        {({ input,meta }) => (
                                            <div className="input-group mb-3">
                                                <input className="form-control" {...input} type="text" placeholder="Username,Email or Mobile"></input>
                                                <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-envelope"></span>
                                                </div>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="password" validate={composeValidators(required, minValue(10))}>
                                        {({ input,meta }) => (
                                            <div className="input-group mb-3">
                                                <input className="form-control" {...input} type="password" placeholder="*********"></input>
                                                <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-lock"></span>
                                                </div>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </div>
                                        )}
                                    </Field>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                            <Field name="contactu" component="input" type="checkbox" />
                                            <label>
                                                Remember Me
                                            </label>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" disabled={submitting || pristine} className="btn btn-primary btn-block">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                            )}>
                        </Form>
                    </div>
                    <p className="mb-0">
                        <NavLink className="nav-link" to="new-admin">
                            <span className="text-center">Register a new admin</span>
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default AdminLogin;