import { StayList } from '../cmps/explore/StayList'
import { StayFilter } from '../cmps/explore/StayFilter'
import { Component } from 'react'
import { Loader } from '../cmps/app/Loader'

export class Explore extends Component {

  state = {
    stays: []
  }

  componentDidMount() {
    this.setState({ stays: this.props.stays })
    this.props.setHomePage('explore')
    this.scrollUp()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stays !== this.props.stays) {
      this.setState({ stays: this.props.stays });
    }
  }

  onfilterStays = (filterBy) => {
    var stays = filterStays(this.props.stays, filterBy)
    this.setState({ stays })
  }

  scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const { trip, loggedInUser, updateUser, openDynamicModal, closeDynamicModal, setModalContent, toggleMsgModal, login, addTrip } = this.props
    const { stays } = this.state
    if (!stays) return <Loader />
    return (
      <main className="explore-container main page">
        <span>{stays.length} stays</span>
        {trip.loc.address === "" && <h1>Find place to stay {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}`}</h1>}
        {trip.loc.address !== "" && <h1>Stays {trip && trip.loc && trip.loc.address && `in ${trip.loc.address}`}</h1>}
        <StayFilter openDynamicModal={openDynamicModal} closeDynamicModal={closeDynamicModal} setModalContent={setModalContent} onfilterStays={this.onfilterStays} />
        <StayList stays={stays} stayType={'explor'} updateUser={updateUser} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} login={login} trip={trip} addTrip={addTrip} />
      </main>
    )
  }
}

function filterStays(stays, filterBy) {
  let filteredStays = [];
  stays.forEach(stay => {
    if (_isTypePlace(stay, filterBy.placeType) && _isPropertyType(stay, filterBy.propertyType)
      && _isPrice(stay, filterBy.price) && _isAmenities(stay, filterBy.amenities)) {
      (Math.random() < 0.5) ? filteredStays.unshift(stay) : filteredStays.push(stay);
    }
  })
  return filteredStays
}

function _isTypePlace(stay, filter) {
  return (filter === '' || stay.stayType === filter) ? true : false
}
function _isPropertyType(stay, filter) {
  return (filter === '' || stay.propertyType === filter) ? true : false
}
function _isPrice(stay, filter) {
  return (stay.price <= filter) ? true : false
}
function _isAmenities(stay, filter) {
  var _isAmenities = true;
  for (const key in filter) {
    if (filter[key] === true && !stay.amenities.find(amenity => amenity === key)) _isAmenities = false
  }
  return _isAmenities
}