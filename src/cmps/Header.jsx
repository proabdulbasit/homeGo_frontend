import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MainFilter } from './app/MainFilter'
import Avatar from "../assets/img/avatar.png"
import { NavMenu } from './app/NavMenu'



export class Header extends React.Component {

    state = {
        isFullHeader: true,
        isWindowTop: true,
        isHomePage: false,
        modalPosition: { x: 0, y: 0 },
        isNarrow: false,
        isDetailsHeader: false
    }

    componentDidMount() {
        this.setCurrPage()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currPage !== this.props.currPage) this.setCurrPage()
    }

    setCurrPage() {
        if (this.props.currPage === 'home') {
            window.addEventListener('scroll', this.getScrollPos, true)
            window.removeEventListener('scroll', this.openDetailsHeader, true)
            this.setState({ isHomePage: true, isFullHeader: true, isWindowTop: true, isNarrow: false, isDetailsHeader: false })
        }
        else if (this.props.currPage === 'stay') {
            window.addEventListener('scroll', this.openDetailsHeader, true)
            window.removeEventListener('scroll', this.getScrollPos, true)
            this.setState({ isHomePage: false, isFullHeader: false, isWindowTop: false, isNarrow: true })
        }
        else {
            window.removeEventListener('scroll', this.getScrollPos, true)
            window.removeEventListener('scroll', this.openDetailsHeader, true)
            this.setState({ isHomePage: false, isFullHeader: false, isWindowTop: false, isNarrow: false, isDetailsHeader: false })
        }
    }

    openDetailsHeader = () => {
        const detailsHeaderPos = (window.scrollY)
        if (detailsHeaderPos > 1500) {
            this.setState({ isDetailsHeader: true })
        } else {
            this.setState({ isDetailsHeader: false })
        }
    }

    explorAll = async () => {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        await this.props.addTrip(trip)
        this.props.loadStays()
    }

    toggleUserMenu = (event) => {
        const clickPos = event.target.getBoundingClientRect()
        this.setState({ modalPosition: clickPos })
        this.props.openDynamicModal('user-menu', event)
    }

    closeFullHeader = (ev) => {
        if (ev.target.closest(".main-filter-container")) return
        if (ev.target.closest(".dynamic-modal-child")) return
        this.setState({ isFullHeader: false }, () => { window.removeEventListener('click', this.closeFullHeader, true) })
    }

    openFullHeader = () => {
        this.setState({ isFullHeader: true }, () => { window.addEventListener('click', this.closeFullHeader, true) })
    }

    getScrollPos = () => {
        const isWindowTop = (window.scrollY)
        if (isWindowTop < 100) {
            this.setState({ isWindowTop: true, isFullHeader: true })
        } else {
            this.setState({ isWindowTop: false, isFullHeader: false })
        }
    }

    scrollTo = (top) => {
        window.scrollTo({ top, left: 0, behavior: 'smooth' })
    }

    getAvgRate = (stay) => {
        const rates = stay.reviews.map((review) => review.avgRate);
        const sum = rates.reduce((acc, rate) => {
            acc += rate;
            return acc;
        }, 0);
        if (sum === 0) return 'new';
        return (sum / rates.length).toFixed(1);
    };

    render() {
        const { onSearch, loggedInUser, logout, trip, openDynamicModal, modalType, setModalContent, isNewNotif } = this.props
        const { isFullHeader, isWindowTop, modalPosition, isNarrow, isDetailsHeader } = this.state
        const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar

        return (
            <header className={`main-header ${isFullHeader && 'full-header'} ${isWindowTop && 'full-header top'} ${isNarrow ? 'narrow-header' : 'wide-header'} ${isDetailsHeader && 'details-header'}`}>
                <section className="details-header-nav">
                    <div className="details-nav">
                        <span onClick={() => { this.scrollTo(0) }}>Photos</span>
                        <span onClick={() => { this.scrollTo(1210) }}>Amenities</span>
                        <span onClick={() => { this.scrollTo(1580) }}>Reviews</span>
                        <span onClick={() => { this.scrollTo(2100) }}>Location</span>
                    </div>

                    <div className="book-stay-mini">
                        <div>
                            <h3><span>$ {(trip && trip.stay && trip.stay.price) ? trip.stay.price.toLocaleString("en-US") : 0}</span> / night</h3>
                            <h4><i className="fas fa-star"></i>{(trip && trip.stay && trip.stay.reviews) ? this.getAvgRate(trip.stay) : ''} <span>( {(trip && trip.stay && trip.stay.reviews) ? trip.stay.reviews.length + ' reviews' : 'new'} )</span></h4>
                        </div>
                         <section className="book-stay-btn-container" onClick={() => { this.scrollTo(650) }}>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="content">
                                    <button className="square">
                                        <p>Check availability</p>
                                    </button>
                                </div>
                            </section>
                    </div>
                </section>
                <section >
                    <NavLink className="logo-link" to="/"><h1 className="logo">Home<i className="fab fa-airbnb"></i>Go</h1></NavLink>
                    <NavLink className="mini-logo-link" to="/"><i className="fab fa-airbnb" /></NavLink>
                    <nav>
                        <Link to={(loggedInUser) ? `/host/${loggedInUser._id}` : "/host"}>Become a host</Link>
                        <NavLink to="/explore" onClick={this.explorAll}>Explore</NavLink>
                        <button onClick={this.toggleUserMenu} className="user-menu-btn">
                            <span><i className="fas fa-bars"></i></span>
                            <img src={imgUrl} alt="avatar" />
                            {isNewNotif && <div className="notif-circle"></div>}
                        </button>
                    </nav>
                    {modalType === 'user-menu' && <NavMenu logout={logout} loggedInUser={loggedInUser} toggleUserMenu={this.toggleUserMenu} modalPosition={modalPosition} isNewNotif={isNewNotif}/>}
                </section>
                <MainFilter trip={trip} modalType={modalType} onSearch={onSearch} openDynamicModal={openDynamicModal} isFullHeader={isFullHeader} openFullHeader={this.openFullHeader} toggleFullHeader={this.toggleFullHeader} setModalContent={setModalContent} />
            </header>
        )
    }
}
