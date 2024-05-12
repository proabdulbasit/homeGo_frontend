import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stayService } from '../../services/stay-service';
import { addStay, updateStay } from '../../store/actions/stayActions';
import { Upload } from '../Upload';

class _StayEdit extends Component {
	state = {
		stay: {
			name: '',
			imgUrls: [],
			price: '',
			desc: '',
			capacity: '',
			amenities: {
				TV: true,
				Wifi: false,
				'Air conditioning': false,
				'Smoking allowed': false,
				'Pets allowed': false,
				'Cooking basics': false,
			},
			stayType: 'entire place',
			propertyType: 'appartment',
			host: {
				_id: this.props.loggedInUser._id,
				fullname: this.props.loggedInUser.fullname,
				imgUrl: this.props.loggedInUser.imgUrl,
			},
			loc: {
				country: '',
				countryCode: '',
				address: '',
				lat: 0,
				lng: 0,
			},
			reviews: [],
		},
	};

	componentDidMount() {
		if (this.props.stayEdit) {
			const currAmenities = {};
			this.props.stayEdit.amenities.forEach((amenitie) => {
				currAmenities[amenitie] = true;
			});
			this.setState({
				stay: {
					...this.props.stayEdit,
					amenities: currAmenities,
				},
			});
		} else {
			this.loadStay();
		}
	}

	loadStay() {
		if (!this.props.match || !this.props.match.params) return;
		const { stayId } = this.props.match.params;
		if (stayId) {
			stayService.getById(stayId).then((stay) => {
				this.setState({ stay });
			});
		}
	}

	onRemoveStays = async (ev, stayId) => {
		ev.target.value = 'my Stays';
		await this.props.removeStay(stayId)
		this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been deleted</h3></span>)
		this.props.onSelectAction(ev);
	}

	onUploadImg = (imgState, position) => {
		const imgUrls = this.state.stay.imgUrls;
		imgUrls[position] = imgState.imgUrl;
		this.setState({ stay: { ...this.state.stay, imgUrls } });
	};

	handleChange = ({ target }) => {
		let { name, value, id, checked } = target;
		value = name === 'price' || name === 'capacity' ? +value : value;
		if (name === 'amenities') {
			this.setState({
				stay: {
					...this.state.stay,
					amenities: { ...this.state.stay.amenities, [id]: checked },
				},
			});
		} else if (name === 'address') {
			this.setState({
				stay: {
					...this.state.stay,
					loc: { ...this.state.stay.loc, [name]: value },
				},
			});
		} else {
			this.setState({ stay: { ...this.state.stay, [name]: value } });
		}
	};

	onSaveStay = (ev) => {
		ev.preventDefault();

		ev.target.value = 'my Stays';
		const { stay } = this.state;
		const { amenities } = stay;
		const currAmenities = [];
		for (const key in amenities) {
			if (amenities[key]) {
				currAmenities.push(key);
			}
		}
		stay.amenities = currAmenities
		if (stay._id) {
			this.props.updateStay(stay);
			this.props.toggleMsgModal(
				<span>
					<i className="far fa-check-circle"></i>
					<h3>Your stay has been updated</h3>
				</span>
			);
		} else {
			this.props.addStay(stay);
			this.props.toggleMsgModal(
				<span>
					<i className="far fa-check-circle"></i>
					<h3>Your stay has been added</h3>
				</span>
			);
		}
		this.props.onSelectAction(ev);

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

	render() {
		const { stay } = this.state;
		if (this.props.stayEdit && !stay.imgUrls[0]) return '';
		if (!stay) return ''; // LOADER
		return (
			<section className="stay-edit-container">
				<form className="stay-edit-form" onSubmit={this.onSaveStay}>
					<section className="stay-edit-header">
						<div className="stay-edit-header-name">
							<h1>
								<input
									type="text"
									name="name"
									autoComplete="off"
									onChange={this.handleChange}
									value={stay.name}
									placeholder="stay name"
									required
								/>
							</h1>
							{this.props.stayEdit && <button type="button" className="remove-btn" onClick={(event) => this.onRemoveStays(event, this.props.stayEdit._id)}><i className="far fa-trash-alt"></i>Remove</button>}
						</div>
						<div className="stay-edit-short-info">
							<div>
								<span className="stay-rate-display">
									<i className="fas fa-star"></i>
									<span>{this.getTotalRate()}</span>
									<p> ( {stay.reviews.length} reviews )</p>
								</span>
								<span>•</span>
								<p>
									Address:
									<input
										type="text"
										name="address"
										autoComplete="off"
										onChange={this.handleChange}
										value={stay.loc.address}
										required
									/>
								</p>
							</div>
							<div>
								<button type="button">
									<p>
										<i className="fas fa-external-link-alt"></i>share
									</p>
								</button>
								<button type="button" className="stay-save-btn">
									<p>
										<i className="far fa-heart"></i>save
									</p>
								</button>
							</div>
						</div>
					</section>

					<div className="stay-gallery">
						<Upload
							userImgUrl={stay.imgUrls[0]}
							onUploadImg={this.onUploadImg}
							position={0}
						/>
						<Upload
							userImgUrl={stay.imgUrls[1]}
							onUploadImg={this.onUploadImg}
							position={1}
						/>
						<Upload
							userImgUrl={stay.imgUrls[2]}
							onUploadImg={this.onUploadImg}
							position={2}
						/>
						<Upload
							userImgUrl={stay.imgUrls[3]}
							onUploadImg={this.onUploadImg}
							position={3}
						/>
						<Upload
							userImgUrl={stay.imgUrls[4]}
							onUploadImg={this.onUploadImg}
							position={4}
						/>
					</div>

					<section className="stay-edit-info-container">
						<div className="stay-edit-long-info">
							<div className="stay-long-info-header">
								<div className="stay-long-info-header-txt">
									<span>
										capacity:
										<input
											className="capacity"
											type="number"
											name="capacity"
											autoComplete="off"
											onChange={this.handleChange}
											value={stay.capacity}
											required
										/>
										• stayType:
										<select name="stayType" onChange={this.handleChange}>
											<option value="entire place">entire place</option>
											<option value="private room">private room</option>
										</select>
										• propertyType:
										<select
											name="propertyType"
											onChange={this.handleChange}
											value={stay.propertyType}>
											<option value="loft">loft</option>
											<option value="room">room</option>
											<option value="studio">studio</option>
											<option value="villa">villa</option>
											<option value="appartment">appartment</option>
										</select>
									</span>
								</div>
								<img src={stay.host.imgUrl} alt="avatar" />
							</div>

							<div className="stay-feature-container">
								<div>
									<i className="fas fa-home"></i>
									<div>
										<h3>{stay.stayType}</h3>
										<h4>
											{stay.stayType === 'entire place'
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
											This place isn’t suitable for children under 12 and the
											host doesn’t allow pets.
										</h4>
									</div>
								</div>
								<div>
									<i className="fas fa-medal"></i>
									<div>
										<h3>{stay.host.fullname} is a Superhost</h3>
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

							<span className="description">
								<h2>description</h2>
								<textarea
									type="text"
									name="desc"
									autoComplete="off"
									onChange={this.handleChange}
									value={stay.desc}
									required
								/>
							</span>
							<div className="amenities-list">
								<h2>Amenities</h2>
								<div>
									<span>
										<input
											type="checkbox"
											id="TV"
											name="amenities"
											value={stay.amenities.TV}
											checked={stay.amenities.TV}
											onChange={this.handleChange}
										/>
										<label htmlFor="TV"> TV</label>
									</span>
									<span>
										<input
											type="checkbox"
											id="Wifi"
											name="amenities"
											value={stay.amenities.Wifi}
											checked={stay.amenities.Wifi}
											onChange={this.handleChange}
										/>
										<label htmlFor="Wifi">Wifi</label>
									</span>
									<span>
										<input
											type="checkbox"
											id="Air conditioning"
											name="amenities"
											value={stay.amenities['Air conditioning']}
											checked={stay.amenities['Air conditioning']}
											onChange={this.handleChange}
										/>
										<label htmlFor="Air conditioning">AC </label>
									</span>
									<span>
										<input
											type="checkbox"
											id="Smoking allowed"
											name="amenities"
											value={stay.amenities['Smoking allowed']}
											checked={stay.amenities['Smoking allowed']}
											onChange={this.handleChange}
										/>
										<label htmlFor="Smoking_allowed">Smoking allowed </label>
									</span>
									<span>
										<input
											type="checkbox"
											id="Pets allowed"
											name="amenities"
											value={stay.amenities['Pets allowed']}
											checked={stay.amenities['Pets allowed']}
											onChange={this.handleChange}
										/>
										<label htmlFor="Pets allowed">Pets allowed </label>
									</span>
									<span>
										<input
											type="checkbox"
											id="Cooking basics"
											name="amenities"
											value={stay.amenities['Cooking basics']}
											checked={stay.amenities['Cooking basics']}
											onChange={this.handleChange}
										/>
										<label htmlFor="Cooking basics">Cooking basics </label>
									</span>
								</div>
							</div>
						</div>
						<div className="order-form-container">
							<h3>
								price:{' '}
								<input
									type="number"
									name="price"
									autoComplete="off"
									onChange={this.handleChange}
									value={stay.price}
								/>{' '}
								/ night
							</h3>
						</div>
					</section>
					<button type="submit" className="stay-edit-save-btn">Save</button>
				</form>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		stays: state.stayModule.stays,
	};
}

const mapDispatchToProps = {
	addStay,
	updateStay,
};

export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit);
