import { Component } from 'react'
import { Link } from 'react-router-dom'
import { stayService } from '../services/stay-service'
import { ReviewList } from '../cmps/stay-details/ReviewList'
import { AddReview } from '../cmps/stay-details/AddReview'
import { BookStay } from '../cmps/stay-details/BookStay'
import { GoogleMap } from '../cmps/stay-details/GoogleMap'
import ReactStars from 'react-rating-stars-component'
import { Loader } from '../cmps/app/Loader'

export class StayDetails extends Component {
	state = {
		stay: null,
		toggleWish: '',
	}

	async componentDidMount() {
		this.scrollUp();
		await this.loadStay();
		this.props.setHomePage('stay')
	}

	scrollUp = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}

	setWishList = () => {
		const user = this.props.loggedInUser;
		if (!user.wishlist) return;
		const match = user.wishlist.findIndex(
			(wishId) => wishId === this.state.stay._id
		)
		if (match !== -1) {
			this.setState({ ...this.state, toggleWish: true });
		}
	}

	loadStay = async () => {
		const { stayId } = this.props.match.params
		const stay = await stayService.getById(stayId)
		this.setState({ stay })
		if (this.props.loggedInUser) {
			this.setWishList()
		}
	}

	setWishList = () => {
		const user = this.props.loggedInUser
		if (!user.wishlist) return
		const match = user.wishlist.findIndex((wishId) => wishId === this.state.stay._id)
		if (match !== -1) {
			this.setState({ ...this.state, toggleWish: true })
		}
	}

	onAddToWishList = () => {
		const user = this.props.loggedInUser
		if (!user) {
			this.props.toggleMsgModal(
				<span>
					<h2>You must log in frist</h2>
					<Link to='/login'>Login</Link>
					<button className="demo-user-btn" onClick={() => { this.props.login({ username: 'mor', password: '1111' }) }}>Demo User</button>
				</span>
			)
			return
		}
		if (user.wishlist) {
			const wishId = user.wishlist.find((wish) => wish === this.state.stay._id)
			if (!wishId) {
				this.setState({ ...this.state, toggleWish: true })
				user.wishlist.push(this.state.stay._id)
			} else {
				let idx = user.wishlist.findIndex((wishidx) => wishidx === wishId)
				this.setState({ ...this.state, toggleWish: false })
				user.wishlist.splice(idx, 1)
			}
		} else user.wishlist = [this.state.stay._id]
		this.props.updateUser(user)
	}

	getTotalRate = () => {
		const rates = this.state.stay.reviews.map((review) => review.avgRate)
		const sum = rates.reduce((acc, rate) => {
			acc += rate
			return acc
		}, 0);
		if (sum === 0) return 'new'
		return (sum / rates.length).toFixed(2)
	}

	getStayReviewStatistics = () => {
		const { reviews } = this.state.stay
		const num = reviews.length

		if (!reviews) return
		const reviewCtgMap = {
			Cleanliness: 0,
			Accuracy: 0,
			Communication: 0,
			Location: 0,
			'Check-in': 0,
			Accessibility: 0,
		}

		reviews.forEach((review) => {
			for (const key in review.categories) {
				reviewCtgMap[key] += review.categories[key]
			}
		})

		for (const ctg in reviewCtgMap) {
			reviewCtgMap[ctg] = +(reviewCtgMap[ctg] / num).toFixed(2)
		}

		const elReviews = []
		for (const ctg in reviewCtgMap) {
			elReviews.push(
				<div key={Math.random()} className="ctg-statistics">
					<h3>{ctg}</h3>
					<ReactStars
						count={5}
						value={reviewCtgMap[ctg]}
						size={20}
						isHalf={true}
						edit={false}
						activeColor="#ff385c"
					/>
				</div>
			)
		}

		return elReviews
	}

	getAmenityIcon(amenity) {
		switch (amenity) {
			case 'TV':
				return <i className="fas fa-tv"></i>
			case 'Wifi':
				return <i className="fas fa-wifi"></i>
			case 'Air conditioning':
				return <i className="fas fa-fan"></i>
			case 'Smoking allowed':
				return <i className="fas fa-smoking"></i>
			case 'Pets allowed':
				return <i className="fas fa-paw"></i>
			case 'Cooking basics':
				return <i className="fas fa-blender"></i>
			default:
				return <i className="fab fa-airbnb"></i>
		}
	}

	addReview = (review) => {
		const { stay } = this.state
		stay.reviews.push(review)
		this.props.updateStay(stay)
		this.props.toggleMsgModal(
			<span>
				<i className="far fa-check-circle"></i>
				<h3>Your review has been saved</h3>
			</span>
		)
	}

	render() {
		const { stay } = this.state;
		if (!stay) return <Loader />

		const {
			loggedInUser,
			toggleMsgModal,
			onSearch,
			openDynamicModal,
			modalType,
			setModalContent
		} = this.props

		const { toggleWish } = this.state
		const {
			loc,
			capacity,
			desc,
			amenities,
			stayType,
			propertyType,
			reviews,
			name,
			host,
		} = stay

		return (
			<main className="stay-details-container narrow">
				<section className="stay-details-header">
					<h1>{name}</h1>
					<div className="stay-short-info">
						<div>
							<span className="stay-rate-display">
								<i className="fas fa-star"></i>
								<span>{this.getTotalRate()}</span>
								<p> ( {reviews.length} reviews )</p>
							</span>
							<span>•</span>
							<p>{loc.address}</p>
						</div>
						<div className="action-btn-container">
							<button>
								<p>
									<i className="fas fa-external-link-alt"></i>share
								</p>
							</button>
							<button onClick={this.onAddToWishList} className="stay-save-btn">
								<p>
									<i className={toggleWish ? 'fas fa-heart' : 'far fa-heart'}	></i>
									save
								</p>
							</button>
						</div>
					</div>
				</section>
				<div id="stay-gallery" className="stay-gallery">
					{stay.imgUrls.map((imgUrl, idx) => {
						if (idx < 5) {
							return (
								<img src={imgUrl} alt="stay-gallery-preview-img" key={Math.random()} />
							)
						}
						else return ''
					})}
				</div>
				<section className="stay-info-container">
					<div className="stay-long-info">

						<div className="stay-long-info-header">
							<div>
								<h2>{`${propertyType} hosted by ${host.fullname}`}</h2>
								<span>
									{capacity} guests • {stayType} • {propertyType}
								</span>
							</div>
							<img src={host.imgUrl} alt="avatar" />
						</div>

						<div className="stay-feature-container">
							<div>
								<i className="fas fa-home"></i>
								<div>
									<h3>{stayType}</h3>
									<h4>
										{stayType === 'entire place'
											? "You'll have the place to yourself."
											: "You'll have a private room to yourself."}
									</h4>
								</div>
							</div>
							<div>
								<i className="fas fa-book-open"></i>
								<div>
									<h3>House rules</h3>
									<h4>
										This place isn’t suitable for children under 12 and the host
										doesn’t allow pets.
									</h4>
								</div>
							</div>
							<div>
								<i className="fas fa-medal"></i>
								<div>
									<h3>{host.fullname} is a Superhost</h3>
									<h4>
										Superhosts are experienced, highly rated hosts who are
										committed to providing great stays for guests.
									</h4>
								</div>
							</div>
							<div>
								<i className="fas fa-bookmark"></i>
								<div>
									<h3>Wifi</h3>
									<h4>Guests often search for this popular amenity</h4>
								</div>
							</div>
						</div>

						<div className="description">
							<h2>Description</h2>
							<span>{desc}</span>
						</div>

						<div id="amenities" className="amenities-list">
							<h2>Amenities</h2>
							<ul>
								{amenities.map((amenity) => {
									return (
										<li key={Math.random()}>
											<span>{this.getAmenityIcon(amenity)}</span>
											<span>{amenity}</span>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
					<BookStay
						stay={stay}
						getTotalRate={this.getTotalRate}
						onSearch={onSearch}
						loggedInUser={loggedInUser}
						toggleMsgModal={toggleMsgModal}
						openDynamicModal={openDynamicModal}
						modalType={modalType}
						setModalContent={setModalContent}
					/>
				</section>
				<section className="stay-review-container">
					<div className="stay-review-header">
						<h2>
							<span className="stay-rate-display">
								<i className="fas fa-star"></i>
								{this.getTotalRate()} <p> ({reviews.length} reviews)</p>
							</span>
						</h2>
						<div className="stay-review-ststistics">
							{this.getStayReviewStatistics().map((elCtgRate) => elCtgRate)}
						</div>
					</div>
					<ReviewList reviews={reviews} />
				</section>
				<section className="stay-review">
					<AddReview loggedInUser={loggedInUser} addReview={this.addReview} />
				</section>
				<section className="stay-details-map">
					<h2>Location</h2>
					<h3>{loc.address}</h3>
					<GoogleMap pos={loc} />
				</section>
			</main>
		)
	}
}
