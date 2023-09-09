import React, { Component } from "react";
import Header from './HeaderComponent.js';
import Sidebar from './SidebarComponent';
import Footer from './FooterComponent.js';
import { Routes, Route, Navigate,useParams } from 'react-router-dom';
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from '../../services/auth.service';
import { connect } from "react-redux";
import { withRouter } from "../../common/with-router.js";
import BoardPage from "./Contents/BoardsPage.js";

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = (dispatch) => ({
    
})


class AdminHome extends Component {
    constructor (props) {
        super(props);
        this.state = {
            content: "",
            redirect: null,
        };
    }
    
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/" });
        // if (currentUser == null) {
        //     {redirect: "/" }
        // }

        UserService.getPublicContent().then(
            response => {
              this.setState({
                content: response.data
              });
            },
            error => {
              this.setState({
                content:
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString()
              });
              if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
              }
            }
        );

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
          currentUser: undefined,
        });
      }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return(
            <>
                <Header>
                </Header>
                <Sidebar>
                </Sidebar>
                <Routes>
                    <Route path="/boards" element={<BoardPage boards={this.props.boards} title='Borad List'></BoardPage>}  />
                </Routes>
                <Footer/>
                
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps)(AdminHome));