import { Component } from 'react';
import { OrderList } from '../cmps/orders/OrderList';
import { Loader } from '../cmps/app/Loader'

export class Orders extends Component {

    state = {
        sction: '',
        loggedInUser: null,
        orders: [],
        filterBy: {
            status: true,
            price: true,
            checkIn: true,
            checkOut: true,
            name: true
        },
        currPage: 'upcoming',
    }

    componentDidMount() {
        this.setState({ loggedInUser: this.props.loggedInUser }, () => {
            this.loadOrders();
        })
        this.props.setFooterDisplay(false)
        this.props.setHomePage('orders')
    }

    componentWillUnmount() {
        this.props.setFooterDisplay(true)
    }

    loadOrders = async () => {
        await this.props.loadOrders({ id: this.state.loggedInUser._id, type: 'user' })
        this.setState({ orders: this.props.orders })
        this.showOrdersByTime()
    }

    onCancelOrder = async (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        if (daysToTrip >= 7) {
            await this.props.removeOrder(stay._id)
            this.setState({ orders: this.props.orders })
            this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your order has been canceled</h3></span>)
        }
        else this.props.toggleMsgModal(<span><i className="far fa-times-circle"></i><h3>You can't cancel this order</h3></span>)

    }

    toggleShowOrderTime = (currPage) => {
        this.setState({ currPage }, () => { this.showOrdersByTime() })
    }

    showOrdersByTime = () => {
        const orders = this.props.orders
        var filteredOrders = [];
        if (this.state.currPage === 'upcoming') {
            orders.forEach(order => {
                if (new Date(order.startDate) - new Date(Date.now()) > 0) filteredOrders.push(order)
            })
        } else {
            orders.forEach(order => {
                if (new Date(order.startDate) - new Date(Date.now()) < 0) filteredOrders.push(order)
            })
        }
        this.setState({ orders: filteredOrders })
    }

    getCancelationStatus = (stay) => {
        var daysToTrip = this.getTimeBeforeTrip(stay.startDate);
        var daysToCancel = daysToTrip - 7;
        if (daysToCancel > 0) return `Refundable in the next ${daysToCancel.toFixed(0)} days`
        else return "Non-refundable"
    }

    getTimeBeforeTrip = (startDate) => {
        const diff = new Date(startDate).getTime() - Date.now();
        return diff / 1000 / 60 / 60 / 24
    }

    handleChange = (ev) => {
        var { name } = ev.target
        this.setState({ filterBy: { ...this.state.filterBy, [name]: !this.state.filterBy[name] } }, () => {
        });
    }

    onSortOrders = (ev) => {
        ev.preventDefault()
        const orders = this.state.orders;
        const sortBy = ev.target.name
        var sortOrders = [];
        switch (sortBy) {
            case 'name':
                sortOrders = _sortByName(orders);
                break
            case 'checkIn':
                sortOrders = _sortByDate(orders, 'startDate');
                console.log(sortOrders);
                break
            case 'checkOut':
                sortOrders = _sortByDate(orders, 'endDate');
                break
            case 'price':
                sortOrders = _sortByPrice(orders);
                break
            default:
                break;
        }

        this.setState({ orders: sortOrders })
    }

    render() {
        const { orders, filterBy, currPage } = this.state;
        const { name, price, status, checkIn, checkOut } = filterBy
        console.log(orders);
        if (!orders) return <Loader />
        
        return (
            <main className="user-order-container main page">
                <section className="user-order-list">
                    <h1>Trips</h1>
                    <div className="order-header">
                        <div className="order-nav">
                            <button className={currPage === 'upcoming' && 'active'} onClick={() => { this.toggleShowOrderTime('upcoming') }}> Upcoming</button>
                            <button className={currPage === 'past' && 'active'} onClick={() => { this.toggleShowOrderTime('past') }}>Past</button>
                        </div>
                        <div className="order-filter">
                            <button name="name" value={name} onClick={this.onSortOrders} >Stay name</button>
                            <button name="checkIn" value={checkIn} onClick={this.onSortOrders}>Check in</button>
                            <button name="checkOut" value={checkOut} onClick={this.onSortOrders}>Check out</button>
                            <button name="price" value={price} onClick={this.onSortOrders}>Price</button>
                            <button name="status" value={status} >Status</button>
                        </div>
                    </div>
                    <OrderList
                        orders={orders}
                        getCancelationStatus={this.getCancelationStatus}
                        onCancelOrder={this.onCancelOrder}
                    />
                </section>
            </main>
        )
    }
}

function _sortByName(orders) {
    return orders.sort(function (orderA, orderB) {
        var nameA = orderA.stay.name.toUpperCase(); 
        var nameB = orderB.stay.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function _sortByDate(orders, dateType) {
    return orders.sort(function (orderA, orderB) {
        return new Date(orderA[dateType]) - new Date(orderB[dateType]);
    });
}

function _sortByPrice(orders) {
    return orders.sort(function (orderA, orderB) {
        return orderA.totalPrice - orderB.totalPrice
    });
}