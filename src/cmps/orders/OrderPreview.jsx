import { Component } from "react";
import { Link } from "react-router-dom";

export class OrderPreview extends Component {

    render() {
        const { order, getCancelationStatus, onCancelOrder } = this.props
        return (

            <Link to={`/stay/${order.stay._id}`} className="order-preview">
                <div className="img-container">
                    <img src={order.stay.imgUrls[0]} alt="stay" />
                    <img src={order.stay.imgUrls[1]} alt="stay" />
                    <img src={order.stay.imgUrls[2]} alt="stay" />
                </div>
                <div className="details-container">
                    <h3>
                        {order.stay.name}
                        <p>
                            <span>{order.startDate}</span>
                            <span>{order.endDate}</span>
                        </p>
                    </h3>
                    <h4 className="order-price">$ {order.totalPrice.toLocaleString("en-US")}</h4>
                    <h4 className={`order-status ${order.status === 'approved' && 'status-green'} ${order.status === 'declined' && 'status-red'}`}>{order.status}</h4>
                    <div className="order-cancelation">
                        <h4>{getCancelationStatus(order)}</h4>
                        {getCancelationStatus(order) !== 'Non-refundable' && <button onClick={() => onCancelOrder(order)}>Cancel order</button>}
                        {getCancelationStatus(order) === 'Non-refundable' && <button className="cancel-disabled" disabled onClick={() => onCancelOrder(order)}>Cancel order</button>}
                    </div>
                </div>
            </Link>
        )
    }
}