import React from "react";

export function OrdersPrview({ order, updateOrder }) {

    function onUpdateOrder(status) {
        order.status = status;
        updateOrder(order)
    }
    return (
        <div className="host-stay-preview">
            <span><img src={order.user.imgUrl} alt="user" /></span>
            <span>{order.user.fullname}</span>
            <span>{order.startDate}</span>
            <span>{order.endDate}</span>
            <span>{order.status}</span>
            <span>$ {order.totalPrice.toLocaleString("en-US")}</span>
            <span className="stay-actions" >
                {order.status === 'approved' && <button onClick={() => { onUpdateOrder('declined') }}><i className="fas fa-times"></i>Decline</button> }
                {order.status === 'declined' && <button onClick={() => { onUpdateOrder('approved') }}><i className="fas fa-check"></i>Re-Approve</button> }
                {order.status === 'wait for approval' && <button onClick={() => { onUpdateOrder('approved') }}><i className="fas fa-check"></i>Approve</button>}
                
            </span>
        </div>
    )
}


