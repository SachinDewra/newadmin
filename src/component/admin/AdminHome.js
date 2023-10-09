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
import { fetchBoards,postBoard,deleteBoard,editBoard } from '../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = (dispatch) => ({
  postBoard: (name, short_name, position, image,status) => dispatch(postBoard(name, short_name, position, image,status)),
  fetchBoards: () => {dispatch(fetchBoards())},
  deleteBoard:(boardid) => dispatch(deleteBoard(boardid)),
  editBoard: (name, short_name, position, image,status,boardid) => dispatch(editBoard(name, short_name, position, image,status,boardid)),

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
        this.props.fetchBoards();
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
                    <Route path="/boards" element={<BoardPage boards={this.props.boards.boards} 
                      boardsLoading={this.props.boards.isLoading}
                      boardErrMess={this.props.boards.errMess} addstatus={this.props.boards.addstatus} postBoard={this.props.postBoard}
                      deleteBoard={this.props.deleteBoard} editBoard={this.props.editBoard} title='Borad List'></BoardPage>}  />
                </Routes>
                <Footer/>
                
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHome));