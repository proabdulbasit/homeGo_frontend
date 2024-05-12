import React from "react";
import { Component } from "react";


export class UserMsg extends Component {

    render() {

        return (
            <section className="user-msg" >
                {this.props.children}
            </section>
        )
    }
}