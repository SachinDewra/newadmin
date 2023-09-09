import React from "react";
import { Card, CardImg,CardImgOverlay,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";  
import { baseUrl } from "../../../shared/baseUrl";

function RenderMenuItem({ board }) {
    return(
        <tr key={board.id}>
            <td>{board.id}.</td>
            <td>{board.name}</td>
            <td>
                {board.short_name}
            </td>
            <td>
                <CardImg height="200px" width="60px" src={baseUrl+'public/boards/'+board.image} alt={board.name}></CardImg>
            </td>
        </tr>
    );
}

function BoardPage (props) {
    const listdata = props.boards.map((board) => {
        return (
            <RenderMenuItem board={board} ></RenderMenuItem>
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
                           </div>
                           <div className="card-body">
                              <table className="table table-bordered">
                                 <thead>
                                    <tr>
                                       <th >#</th>
                                       <th>Task</th>
                                       <th>Progress</th>
                                       <th >Label</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {listdata}
                                 </tbody>
                              </table>
                           </div>
                           <div className="card-footer clearfix">
                              <ul className="pagination pagination-sm m-0 float-right">
                                 <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
                                 <li className="page-item"><a className="page-link" href="#">1</a></li>
                                 <li className="page-item"><a className="page-link" href="#">2</a></li>
                                 <li className="page-item"><a className="page-link" href="#">3</a></li>
                                 <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
        </section>
        </div>
    )
}

export default BoardPage;
