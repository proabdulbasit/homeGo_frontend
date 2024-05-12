import { OrderPreview } from './OrderPreview'
import {Loader} from '../app/Loader'

export function OrderList({ orders, getCancelationStatus, onCancelOrder }) {

    if (!orders || !orders.length) return <Loader/>

    return (
        <section className="order-list">
            {orders.map(order => <OrderPreview
                key={Math.random()}
                order={order}
                getCancelationStatus={getCancelationStatus}
                onCancelOrder={onCancelOrder}
            />)}
        </section>
    )
}