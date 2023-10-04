import React from "react";
import { Button, CardImg, Modal,ModalBody,ModalHeader } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";  
import { baseUrl } from "../../../shared/baseUrl";
import { Loading } from "../../LoadingComponent";
import moment from "moment";
import { Component } from "react";
import { Form, Field } from 'react-final-form';
import FileField from "./FileField.tsx";
import Swal from "sweetalert2";
function RenderMenuItem({ board ,deleteBoard, editBoard}) {
    return(
        <tr className="gradeA" role="row" key={board._id}>
            <td>{board._id}.</td>
            <td>{board.name}</td>
            <td>
                {board.short_name}
            </td>
            <td>{moment(board.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</td>
            <td>{(board.status == 1) ? <div className="badge badge-success">Active</div> : 
            <div className="badge badge-danger">Inactive</div>}</td>
            <td>
                <CardImg height="100px" width="10px" src={baseUrl+'public/boards/'+board.image} alt={board.name}></CardImg>
            </td>
            <td>
                <Edit board={board} editBoard={editBoard}></Edit>
                <Delete boardid={board._id} deleteBoard={deleteBoard}></Delete>
                
            </td>
        </tr>
    );
}

function BoardPage (props) {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading></Loading>
                </div>
            </div>
        )
    }
    else if(props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.boards !== undefined ) {
        const listdata = props.boards.map((board, key) => {
            return (
                <RenderMenuItem board={board} key={key} deleteBoard={props.deleteBoard} editBoard={props.editBoard} ></RenderMenuItem>
            )
        })
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1>Simple Tables</h1>
                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item active">{props.title}</li>
                            </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                   <div className="container-fluid">
                      <div className="row">
                         <div className="col-md-12">
                            <div className="card">
                               <div className="card-header">
                                  <h3 className="card-title">{props.title}</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-append">
                                                <AddForm postBoard={props.postBoard} getBoards={props.boards} 
                                                addstatus={props.addstatus}></AddForm>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                               
                               <div className="card-body">
                                  <table className="table table-bordered">
                                     <thead>
                                        <tr>
                                           <th >#</th>
                                           <th>Name</th>
                                           <th>Short Name</th>
                                           <th>Added On</th>
                                           <th>Status</th>
                                           <th >Image</th>
                                           <th >Action</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        {listdata}
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
            </section>
            </div>
        )
    }
    
}

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.addtoggleModal = this.addtoggleModal.bind(this);
    }

    addtoggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }
    
    render() {
        const required = value => (value ? undefined : 'Required')
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)
            this.props.postBoard(values.name,
                 values.short_name,values.position,values.files[0],values.status)
            .then(response => {
                if(response.status) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Board Add Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.addtoggleModal();
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                })
            .catch(error => {console.log('Post Board', error.message);
                    alert('Your Board could not be posted\nError: '+ error.message)})
            
            
        }
        return (
            <div className="row">
                <Button outline onClick={this.addtoggleModal}>
                    <span className="fa fa-plus fa-lg"></span> Add
                </Button>
                <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.addtoggleModal}>
                    <ModalHeader toggle={this.addtoggleModal}>Add Board</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={onSubmit} intialvalues={{}} 
                        render={({handleSubmit,form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="name" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="text" placeholder="Name"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <Field name="short_name" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="text" placeholder="Short Name"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <Field name="position" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="number" placeholder="Position" min={1}></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                {/* <Field name="image" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="file" placeholder="image"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field> */}
                                <FileField name="files" />
                                <Field name="status" component='select' validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <select {...input} className="form-select">
                                                <option value="">Select Status</option>
                                                <option value="1" defaultValue>Active</option>
                                                <option value="0">Inactive</option>

                                            </select>
                                        <div className="input-group-append">
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                    </button>
                                    <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                    >
                                    Reset
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isModalOpen: false
        }
        this.addtoggleModal = this.addtoggleModal.bind(this);
    }

    addtoggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    render() {
        const required = value => (value ? undefined : 'Required')
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)
            this.props.postBoard(values.name,
                 values.short_name,values.position,values.files[0],values.status)
            .then(response => {
                if(response.status) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Board Add Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.addtoggleModal();
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                })
            .catch(error => {console.log('Post Board', error.message);
                    alert('Your Board could not be posted\nError: '+ error.message)})
            
            
        }
        
        return (
            
            <div className="row">
            <a className="btn btn-app" onClick={this.addtoggleModal}>
                <i className="fas fa-edit"></i> Edit
            </a>
            <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.addtoggleModal}>
                    <ModalHeader toggle={this.addtoggleModal}>Edit Board</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={onSubmit} intialvalues={{name:this.props.board.name}} 
                        render={({handleSubmit,form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <Field initialValue={initialValue.name} name="name" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input value={values.name} className="form-control" type="text" placeholder="Name"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <Field name="short_name" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="text" placeholder="Short Name"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <Field name="position" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="number" placeholder="Position" min={1}></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                {/* <Field name="image" validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <input className="form-control" {...input} type="file" placeholder="image"></input>
                                        <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-info"></span>
                                        </div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field> */}
                                <FileField name="files" />
                                <Field name="status" component='select' validate={required}>
                                    {({input,meta}) => (
                                        <div className="input-group mb-3">
                                            <select {...input} className="form-select">
                                                <option value="">Select Status</option>
                                                <option value="1" defaultValue>Active</option>
                                                <option value="0">Inactive</option>

                                            </select>
                                        <div className="input-group-append">
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>
                                    )}
                                </Field>
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                    </button>
                                    <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                    >
                                    Reset
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                    </ModalBody>
                </Modal>
                </div>
            
        )
    }
}

class Delete extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isModalOpen: false
        }
        this.addtoggleModal = this.addtoggleModal.bind(this);
    }

    addtoggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }
    
    render() {
        const required = value => (value ? undefined : 'Required')
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)
            this.props.deleteBoard(this.props.boardid)
            .then(response => {
                console.log(response);
                if(response.status) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Board Delete Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.addtoggleModal();
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                })
            .catch(error => {console.log('Post Board', error.message);
                    alert('Your Board could not be posted\nError: '+ error.message)})
            
            
        }
        return (
            <div className="row">
            <a className="btn btn-app" onClick={this.addtoggleModal}>
                  <i className="fas fa-trash"></i> Delete
            </a>
            <Modal className="modal-lg" isOpen={this.state.isModalOpen} toggle={this.addtoggleModal}>
                    <ModalHeader toggle={this.addtoggleModal}>Delete Board!</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete!</p>
                    <Form onSubmit={onSubmit} intialvalues={{}} 
                        render={({handleSubmit,form, submitting, pristine, values}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" onClick={this.addtoggleModal} className="btn btn-default btn-close" aria-label="Close" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-danger">Delete</button>
                                </div>
                            </form>
                        )}
                    />
                    </ModalBody>
                </Modal>
            </div>
            
        )
    }
}



export default BoardPage;
