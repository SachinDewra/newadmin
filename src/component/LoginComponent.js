import React, { Component } from "react";
import { json, Link, NavLink,Navigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import AuthService from "../services/auth.service";
import { withRouter } from "../common/with-router";
import Swal from "sweetalert2";

const required = value => (value ? undefined : 'Required');
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
const minValue = min => value =>
isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
          loading: false,
          redirect: null,
          userReady: false,
          currentUser: { username: "" }
        };
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }
    
    handleLogin(e) {
        this.setState({
          message: "",
          loading: true
        });
    
        AuthService.login(e.username, e.password).then(
            () => {
              this.props.router.navigate("/home");
              window.location.reload();
            },
            error => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Your credentials is invalid!!',
                showConfirmButton: false,
                timer: 1500
              })
              this.setState({
                    message: "",
                    loading: false
                });
            }
          );
        return false;
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) this.setState({ redirect: "/home" });
        
      }

    render () {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return(
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <b>SD</b>ADMIN
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                            <Form onSubmit={this.handleLogin}
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
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <button type="submit" disabled={submitting || pristine} className="btn btn-primary btn-block">Sign In</button>
                                            </div>
                                        </div>
                                    </form>
                                )}>
                            </Form>
                        </div>
                        {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                            {this.state.message}
                            </div>
                        </div>
                        )}
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
}

export default withRouter(Login);
