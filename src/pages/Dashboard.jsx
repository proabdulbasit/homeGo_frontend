import { Component } from 'react';
import { DashSideNav } from '../cmps/dashboard/DashSideNav'
import { DashHeader } from '../cmps/dashboard/DashHeader'
import { MyStays } from '../cmps/dashboard/MyStays'
import { RateStatistic } from '../cmps/dashboard/RateStatistic'
import { StayEdit } from '../cmps/dashboard/SaveStay'
import { HostOrders } from '../cmps/dashboard/HostOrders'
import { connect } from 'react-redux';
import { loadHostStays, removeStay } from '../store/actions/stayActions'
import { utilService } from '../services/util-service.js'
import { Loader } from '../cmps/app/Loader'
import Cash from '../assets/img/user-cash.PNG'

export class _Dashboard extends Component {

    state = {
        action: '',
        loggedInUser: null,
        selsctedEditStay: null,
        orderChangeStatus: 0
    }

    componentDidMount() {
        this.setState({ loggedInUser: { ...this.props.loggedInUser, isHost: true } }, () => {
            this.props.updateUser(this.state.loggedInUser)
            this.loadHostStays()
            this.props.loadOrders({ id: this.state.loggedInUser._id, type: 'host' })
        })
        this.props.setFooterDisplay(false)
        this.props.setHomePage('dash')
        this.setState({ orderChangeStatus: utilService.getRandomIntInclusive(0, 5) })
    }

    componentWillUnmount(prevProps, prevState) {
        this.props.setFooterDisplay(true)
    }

    getRateChangStatus = () => {
        return utilService.getRandomIntInclusive(0, 5)
    }

    loadHostStays = async () => {
        await this.props.loadHostStays(this.state.loggedInUser._id);
        if (this.props.stays.length === 0) {
            this.setState({ action: 'add stay' })
        }
    }

    onSelectAction = async (ev) => {
        const action = ev.target.value;
        this.setState({ action })
    }

    onSelectedEditStay = (stay) => {
        this.setState({ selsctedEditStay: stay }, () => {
            this.setState({ action: 'edit stay' })
        })
    }

    render() {
        const { action, loggedInUser, selsctedEditStay, orderChangeStatus } = this.state
        const { removeStay, stays, toggleMsgModal, orders, updateOrder } = this.props
        return (
            <main className="main page">
                <section className="dashboard-container">
                    <section className="dash-nav-sticky-container">
                        <DashSideNav onSelectAction={this.onSelectAction} />
                        <div className="host-info-container">
                            <img src={Cash} alt="cash" />
                            <h2>Make all payments through Home & go</h2>
                            <p>Always pay and communicate through Home & go to ensure you're protected under our Terms of Service, Payments Terms of Service, cancellation, and other safeguards.</p>
                        </div>
                    </section>
                    {!stays && <Loader />}
                    {stays && <section className="dash-main-container">
                        <DashHeader stays={stays} orders={orders} orderChangeStatus={orderChangeStatus} />
                        <section className="dash-info-container">
                            {(action === '' || action === 'my Stays') && <MyStays stays={stays} onSelectedEditStay={this.onSelectedEditStay} onSelectAction={this.onSelectAction} />}
                            {action === 'rate stat' && <RateStatistic stays={stays} />}
                            {action === 'edit stay' && <StayEdit stayEdit={selsctedEditStay} removeStay={removeStay} onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                            {action === 'add stay' && <StayEdit onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                            {action === 'orders' && <HostOrders loggedInUser={loggedInUser} orders={orders} updateOrder={updateOrder} onSelectAction={this.onSelectAction} />}
                        </section>
                    </section>}
                </section>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stays: state.stayModule.stays,
    }
}

const mapDispatchToProps = {
    loadHostStays,
    removeStay
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)