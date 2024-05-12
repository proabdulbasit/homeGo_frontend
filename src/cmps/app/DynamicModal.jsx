import React from "react";
import { Component } from "react";

export class DynamicModal extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.modalType !== this.props.modalType && this.props.modalType !== '') {
            this.props.openDynamicModal(this.props.modalType)
        }
    }

    render() {
        const { modalPosition } = this.props
        if (!modalPosition || !modalPosition.top || !modalPosition.left) return ''

        return (
            <React.Fragment>
                <div className="modal-bg"></div>
                <section className="dynamic-modal" style={modalPosition}>
                    {this.props.children}
                </section>
            </React.Fragment>
        )
    }
}