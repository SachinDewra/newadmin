import React, { Component } from 'react';
import AdminLogin from './LoginComponent';
import AdminRegistration from './AdminRegistration';
import { Routes,Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = (dispatch) => ({
    
})


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Routes>
                 <Route path="/" element={<AdminLogin></AdminLogin>}  />
                 <Route path="/new-admin" element={<AdminRegistration ></AdminRegistration>}  />
                 
                </Routes>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
