import ReactStars from 'react-rating-stars-component';
import { utilService } from '../../services/util-service';
import { Component } from 'react';
import Avatar from '../../assets/img/avatar.png';

export class AddReview extends Component {
	state = {
		review: {
			txt: '',
			avgRate: 0,
			categories: {
				Cleanliness: 0,
				Accuracy: 0,
				Communication: 0,
				Location: 0,
				'Check-in': 0,
				Accessibility: 0,
			},
			user: {
				_id: '123456789',
				fullname: 'Guest',
				imgUrl: Avatar,
				time: Date.now(),
			},
		},
	};

	componentDidMount() {
		const loggedInUser = this.props.loggedInUser;
		if (loggedInUser) {
			this.setState({
				review: {
					...this.state.review,
					user: {
						_id: loggedInUser._id,
						fullname: loggedInUser.username,
						imgUrl: loggedInUser.imgUrl,
						time: Date.now(),
					},
				},
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.loggedInUser && prevProps.loggedInUser !== this.props.loggedInUser) {
			this.setState({
				review: {
					...this.state.review,
					user: {
						_id: this.props.loggedInUser._id,
						fullname: this.props.loggedInUser.username,
						imgUrl: this.props.loggedInUser.imgUrl,
						time: Date.now(),
					},
				},
			});
		}
	}
	
	clearForm = () => {
		this.setState({
			review: {
				...this.state.review,
				txt: '',
				avgRate: 0,
				categories: {
					Cleanliness: 0,
					Accuracy: 0,
					Communication: 0,
					Location: 0,
					'Check-in': 0,
					Accessibility: 0,
				},
			},
		});
	};

	handleRateChange = (rate, key) => {
		this.setState({
			review: {
				...this.state.review,
				categories: { ...this.state.review.categories, [key]: rate },
			},
		});
	};

	handleChange = ({ target }) => {
		const { value } = target;
		this.setState({ review: { ...this.state.review, txt: value } });
	};

	saveReview = () => {
		const { review } = this.state;
		const { categories } = review;

		let avg = 0;
		for (const key in categories) {
			avg += categories[key];
		}
		const loggedInUser = this.props.loggedInUser;
		if (loggedInUser) {
			review.user.imgUrl = loggedInUser.imgUrl;
			review.user.fullname = loggedInUser.fullname;
			review.user._id = loggedInUser._id;
			review.user.time = Date.now();
		}
		review.avgRate = avg / 6;
		review._id = utilService.makeId();
		this.props.addReview(review);
		this.clearForm();
	};

	render() {
		const { loggedInUser } = this.props
		const imgUrl = (loggedInUser) ? loggedInUser.imgUrl : Avatar
		const fullname = (loggedInUser) ? loggedInUser.fullname : 'Guest'
		return (
			<section className="stay-add-review">
				<h2>Add review</h2>
				<div className="add-review-header">
					<img src={imgUrl} alt="avater" />
					<div>
						<h3>{fullname}</h3>
						<h4>{utilService.getTimeFormat(Date.now())}</h4>
					</div>
				</div>
				<div className="stay-add-review-ctgs">
					<div className="ctg-statistics">
						<label htmlFor="">Location</label>
						<ReactStars
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Location');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
					<div className="ctg-statistics">
						<label htmlFor="">Check-in</label>
						<ReactStars
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Check-in');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
					<div className="ctg-statistics">
						<label htmlFor="">Accessibility</label>
						<ReactStars
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Accessibility');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
					<div className="ctg-statistics">
						<label htmlFor="">Communication</label>
						<ReactStars
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Communication');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
					<div className="ctg-statistics">
						<label htmlFor="">Accuracy</label>
						<ReactStars
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Accuracy');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
					<div className="ctg-statistics">
						<label htmlFor="">Cleanliness-in</label>
						<ReactStars
							id="clean"
							classNames="rate-clean"
							count={5}
							onChange={(rate) => {
								this.handleRateChange(rate, 'Cleanliness');
							}}
							size={20}
							isHalf={true}
							activeColor="#ff385c"
						/>
					</div>
				</div>
				<div className="add-review-txt">
					<textarea
						type="text"
						name="txt"
						autoComplete="off"
						onChange={this.handleChange}
						value={this.state.review.txt}
						placeholder="Write your opinion about this stay..."
					/>
					<button onClick={this.saveReview}> send </button>
				</div>
			</section>
		);
	}
}
