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
import SubjectPage from "./Contents/SubjectPage.js";
import SeriesPage from "./Contents/SeriesPage";
import { fetchBoards,postBoard,deleteBoard,editBoard
        ,fetchSubject,postSubject,deleteSubject,editSubject, fetchSeries } from '../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    boards: state.boards,
    subjects: state.subjects,
    series: state.series
  }
}

const mapDispatchToProps = (dispatch) => ({
  postBoard: (name, short_name, position, image,status) => dispatch(postBoard(name, short_name, position, image,status)),
  fetchBoards: () => {dispatch(fetchBoards())},
  deleteBoard:(boardid) => dispatch(deleteBoard(boardid)),
  editBoard: (name, short_name, position, image,status,boardid) => dispatch(editBoard(name, short_name, position, image,status,boardid)),
  fetchSubject: () => {dispatch(fetchSubject())},
  postSubject: (name, position, image,iastatus) => dispatch(postSubject(name, position, image,iastatus)),
  deleteSubject:(boardid) => dispatch(deleteSubject(boardid)),
  editSubject: (name, position, image,iastatus,id) => dispatch(editSubject(name, position, image,iastatus,id)),
  fetchSeries: () => {dispatch(fetchSeries())},
  postSeries: (name, position, image,iastatus) => dispatch(postSeries(name, position, image,iastatus)),
  deleteSeries:(seriesid) => dispatch(deleteSeries(seriesid)),
  editSeries: (name,descrition, position, board_id,subject_id,iastatus,id) => dispatch(editSeries(name,descrition, position, board_id,subject_id,iastatus,id)),
  
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
        this.props.fetchSubject();
        this.props.fetchSeries();


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
                    <Route title={'Subject'} path="/subjects" element={<SubjectPage subject={this.props.subjects.subjects} 
                        subjectLoading={this.props.subjects.isLoading}
                        subjectErrMess={this.props.subjects.errMess} 
                        postSubject={this.props.postSubject}
                        deleteSubject={this.props.deleteSubject} editSubject={this.props.editSubject} 
                       title='Subject List'></SubjectPage>}  />
                    <Route title={'Series'} path="/series" element={<SeriesPage subject={this.props.subjects.subjects}
                        boards={this.props.boards.boards} 
                        series={this.props.series.series} 
                        seriesLoading={this.props.series.isLoading}
                        seriesErrMess={this.props.series.errMess} 
                        postSeries={this.props.postSeries}
                        deleteSeries={this.props.deleteSeries} editSeries={this.props.editSeries} 
                       title='Series List'></SeriesPage>}  />
                </Routes>
                <Footer/>
                
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHome));