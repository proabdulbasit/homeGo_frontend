import { OrdersPrview } from './OrdersPrview'

export function OrderList({ orders ,updateOrder , onSelectAction}) {
    return (
        <section className="host-order-list">
            <div className="host-order-list-table">
                <div className="thead">
                    <div>
                        <span>{''}</span>
                        <span>Guest Name</span>
                        <span>Check in</span>
                        <span>Check out</span>
                        <span>Status</span>
                        <span>Price</span>
                        <span className="stay-actions">Actions</span>
                    </div>
                </div>
                <div className="tbody">

                    {!orders.length && <h1 className="empty-msg">No Orders to show yet, you can edit your stay pages to make it more appealing on the <button value="my Stays" onClick={onSelectAction}>My Stays</button> tab</h1>}
                    {orders.length > 0 && orders.map(order => {
                        return (
                            <OrdersPrview
                                key={Math.random()}
                                order={order}
                                updateOrder={updateOrder} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}