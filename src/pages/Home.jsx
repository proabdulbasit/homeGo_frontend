import { FilterGallery } from '../cmps/home/FilterGallery'
import { Banner } from '../cmps/home/Banner'
import { Hero } from '../cmps/home/Hero'
import { FilterCities } from '../cmps/home/FilterCities'
import { Component } from 'react'
import { Link } from 'react-router-dom'

export class Home extends Component {

  componentDidMount() {
    this.props.setHomePage('home')
    this.scrollUp()
  }

  componentWillUnmount() {
    this.props.setHomePage('')
  }

  scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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

  render() {
    const { loggedInUser, onSearch, topRatedStays, nearbayStays, loadStays, addTrip } = this.props

    return (
      <main className="home-page main">
        <Hero loadStays={loadStays} addTrip={addTrip} />
        <h1>Popular destinations</h1>
        <FilterCities onSearch={onSearch} />
        <div className="filter-gallery-header">
          <h1>Explore nearby</h1>
          <Link to="/explore" onClick={this.explorAll}>Show more</Link>
        </div>
        <FilterGallery stays={nearbayStays} addTrip={addTrip} />
        <Banner name={'banner-top'} btnTxt={'Get inspired'} title={'The Gearest Outdoors'} subtitle={'Wishlists curated by Airbnb.'} />
        <div className="filter-gallery-header">
          <h1>Top Rated</h1>
          <Link to="/explore" onClick={this.explorAll}>Show more</Link>
        </div>
        <FilterGallery stays={topRatedStays} addTrip={addTrip} />
        <Banner name={'banner-bottom'} btnTxt={'Learn more'} title={'Become a host'} subtitle={'earn extra income and unlock new opportunities by sharing your space.'} loggedInUser={loggedInUser} />
      </main>
    )
  }
}
