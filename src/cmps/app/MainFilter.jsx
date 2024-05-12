import { Component } from "react";
import { Link } from 'react-router-dom'
import { stayService } from '../../services/stay-service'
import { tripService } from '../../services/trip-service'
import { PickDates } from './Dates'


export class MainFilter extends Component {

    state = {
        trip: {
            guests: { adults: 1, kids: 0 },
            loc: { address: '', stay: null },
            time: { checkIn: '', checkOut: '' }
        },
        topRatedStays: [],
        dynamicModal: {
            modalContent: '',
            modalPosition: { top: 0, left: 0, height: 0 }
        }
    }

    componentDidMount() {
        this.loadRated()
        this.loadTrip()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.trip !== this.props.trip) {
            this.loadTrip()
        }

        if (prevProps.modalType !== this.props.modalType) {
            this.openModal(this.props.modalType)
        }
    }

    onSetModal = (event, modalKey) => {
        const clickPos = { x: event.pageX, y: event.pageY }
        this.setState({
            dynamicModal: {
                ...this.state.dynamicModal,
                modalPosition: clickPos
            }
        }, () => { this.openModal(modalKey) })
    }

    handleDates = (time) => {
        var inti = time.startDate.toDateString()
        var endi = time.endDate.toDateString()
        this.setState({ trip: { ...this.state.trip, time: { checkIn: inti, checkOut: endi } } });
    }

    openModal = (modalKey) => {
        const dynamicModal = {}
        const { x, y } = this.state.dynamicModal.modalPosition


        switch (modalKey) {
            case 'date':
                dynamicModal.modalContent = (
                    <section className="dynamic-modal-child book-date-modal">
                        <PickDates handleDates={this.handleDates} />
                    </section>)
                dynamicModal.modalPosition = { top: y + 35, left: x }
                break;

            case 'loc':
                dynamicModal.modalContent = (
                    <section className="dynamic-modal-child filter-loc-modal">
                        {tripService.getTopCities().map(city => {
                            return (
                                <div onClick={() => {
                                    this.handleChange({
                                        target: {
                                            name: "address",
                                            type: "search",
                                            value: `${city.city}`
                                        }
                                    })
                                }} key={Math.random()} className="modal-label">
                                    <img src={city.imgUrl} alt="city" />
                                    <div>
                                        <span>{city.city}</span>
                                        <span>{city.state}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </section>)
                dynamicModal.modalPosition = { top: y + 35, left: x }
                break;

            case 'guests':
                const { kids, adults } = this.state.trip.guests;
                dynamicModal.modalContent = (
                    <section className="dynamic-modal-child filter-guest-modal">
                        <div className="modal-label">
                            <div>
                                <span>Adults</span>
                                <span>Ages 13 or above</span>
                            </div>
                            <div>
                                <button type={"button"} onClick={() => {
                                    this.handleChange({
                                        target: {
                                            name: "adults",
                                            type: "number",
                                            value: (adults - 1)
                                        }
                                    })
                                }}>-
                                </button>
                                <span>{adults}</span>
                                <button type={"button"} onClick={() => {
                                    this.handleChange({
                                        target: {
                                            name: "adults",
                                            type: "number",
                                            value: (adults + 1)
                                        }
                                    })
                                }}>+
                                </button>
                            </div>
                        </div>
                        <div className="modal-label">
                            <div>
                                <span>Kids</span>
                                <span>Ages 2–12</span>
                            </div>
                            <div>
                                <button type={"button"} onClick={() => {
                                    this.handleChange({
                                        target: {
                                            name: "kids",
                                            type: "number",
                                            value: (kids - 1)
                                        }
                                    })
                                }}>-
                                </button>
                                <span>{kids}</span>
                                <button type={"button"} onClick={() => {
                                    this.handleChange({
                                        target: {
                                            name: "kids",
                                            type: "number",
                                            value: (kids + 1)
                                        }
                                    })
                                }}>+
                                </button>
                            </div>
                        </div>
                    </section>)
                dynamicModal.modalPosition = { top: y + 35, left: x }
                break;

            case '':
                dynamicModal.modalContent = ''
                dynamicModal.modalPosition = { top: 0, left: 0, height: 0 }
                break;

            default:
                break;
        }
        this.props.setModalContent(dynamicModal, modalKey)
    }

    loadTrip = () => {
        var trip = this.props.trip
        if (!trip) trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '', stay: null },
            time: { checkIn: '', checkOut: '' }
        }
        this.setState({ trip })
    }

    handleChange = (ev) => {
        if (ev.timeStamp) ev.preventDefault()
        const { name, value, type } = ev.target

        if (type === 'date') {
            this.setState({ trip: { ...this.state.trip, time: { ...this.state.trip.time, [name]: value } } });
        }

        else if (type === 'number') {
            if (value < 0) return
            this.setState({ trip: { ...this.state.trip, guests: { ...this.state.trip.guests, [name]: +value } } }, () => { this.openModal('guests') });
        }

        else this.setState({ trip: { ...this.state.trip, loc: { ...this.state.trip.loc, [name]: value } } });
    }

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSearch(this.state.trip)
        this.onSetModal(ev, '')
    }

    loadRated = async () => {
        const topRated = await stayService.getTopRatedStays();
        this.setState({ topRatedStays: topRated })
    }

    handle=() => {
        return
    }

    render() {
        const { isFullHeader, openFullHeader } = this.props
        const { loc, time, guests } = this.state.trip
        const { address } = loc;
        const { checkIn, checkOut } = time;
        const { kids, adults } = guests;


        return (
            <section className="main-filter-container">
                <form className={isFullHeader ? "max-filter" : "filter-close"}>

                    <label>
                        <span>Location</span>
                        <input onClick={(event) => this.onSetModal(event, 'loc')} name="address" value={address} autoComplete="off" id="location" type="search" placeholder="Where are you going?" onChange={this.handleChange} />
                    </label>
                    <label htmlFor="check-in">
                        <span>Check in</span>
                        <input value={checkIn} id="check-in" autoComplete="off" placeholder="Add dates" onClick={(event) => this.onSetModal(event, 'date')}  onChange={this.handle}/>
                    </label>
                    <label htmlFor="check-out">
                        <span>Check out</span>
                        <input value={checkOut} id="check-out" autoComplete="off" placeholder="Add dates" onClick={(event) => this.onSetModal(event, 'date')} onChange={this.handle} />
                    </label>
                    <label className="guests" htmlFor="guests">
                        <div>
                            <span>Guests</span>
                            <input onClick={(event) => { this.onSetModal(event, 'guests') }} value={kids + adults + '  guests'} id="guests" name="guests" placeholder="Add guests" onChange={this.handle} />
                        </div>
                    </label>

                    <button onClick={this.onSearch}>
                        <Link to="/explore"><i className="fas fa-search"></i></Link>
                    </button>

                </form>
                <form className={!isFullHeader ? "min-filter" : "filter-close"} onClick={openFullHeader} >
                    <span>{address ? address : 'Start your search'}</span>
                    <button onClick={this.onSearch}>
                        <Link to="/explore"><i className="fas fa-search"></i> </Link>
                    </button>
                </form>
            </section>
        )
    }
}