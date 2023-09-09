import React, { Component } from 'react';
import AdminLogin from './LoginComponent';
import AdminRegistration from './AdminRegistration';
import AdminHome from './admin/AdminHome';
import { Routes,Switch, Route, Redirect,Navigate } from 'react-router-dom'
import { connect } from 'react-redux';
import AuthService from '../services/auth.service';
import AuthVerify from "../common/auth-verify";
import BoardPage from './admin/Contents/BoardsPage';
const mapStateToProps = state => {
    return {
    }
  }

const mapDispatchToProps = (dispatch) => ({
    
})

class Main extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined
          };
    }
    
    
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
              currentUser: user,
            });
        }


    }

    logOut() {
        AuthService.logout();
        this.setState({
          currentUser: undefined,
        });
      }
    
    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <Routes>
                 <Route path="/" element={<AdminLogin></AdminLogin>}  />
                 <Route path="/new-admin" element={<AdminRegistration ></AdminRegistration>}  />
                 <Route path="/*" element={<AdminHome currentUser={this.state.currentUser}></AdminHome>}  />
                </Routes>
                <AuthVerify logOut={this.logOut}/>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
