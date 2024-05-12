import { OrderList } from './OrderList'

export function HostOrders({orders,updateOrder, onSelectAction}) {
    return (
        <section className="host-order-container">
            <OrderList orders={orders} updateOrder={updateOrder} onSelectAction={onSelectAction}/>
        </section>
    )
}