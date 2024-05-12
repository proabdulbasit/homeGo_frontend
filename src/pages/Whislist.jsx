import { StayList } from '../cmps/explore/StayList'
import { Component } from 'react'

export class Wishlist extends Component {

  componentDidMount() {
    this.props.loadWishlist(this.props.loggedInUser)
    this.props.setHomePage('wishlist')
  }

  scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  render() {
    const { stays, loggedInUser, toggleMsgModal, login, updateUser, trip, addTrip, loadWishlist } = this.props
    this.scrollUp()

    return (
      <main className="explore-container wishlist main page">
        <span>{stays.length} stays</span>
        <h1>Wishlist</h1>
        <StayList stays={stays} stayType={'wish'} updateUser={updateUser} toggleMsgModal={toggleMsgModal} loggedInUser={loggedInUser} login={login} trip={trip} addTrip={addTrip} loadWishlist={loadWishlist} />

      </main>
    )
  }
}
