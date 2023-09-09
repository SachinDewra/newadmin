import React, {Component} from "react";

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <strong>Copyright &copy; <a href="https://adminlte.io">SD</a>.</strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
                </div>
            </footer>
        )
    }
}

export default Footer;