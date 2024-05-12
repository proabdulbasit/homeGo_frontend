import { Component } from "react";

export class StayFilter extends Component {

    state = {

        dynamicModal: {
            modalContent: '',
            modalPosition: {}
        }
    }

    componentDidMount() {
        this.resetFilter()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalType !== this.props.modalType) {
            this.openModal(this.props.modalType)
        }
    }

    onSetModal = (event, modalKey) => {
        const { x, y } = event.target.getBoundingClientRect()
        const clickPos = { x, y: y+30 }
        this.setState({
            dynamicModal: {
                ...this.state.dynamicModal,
                modalPosition: clickPos
            }
        }, () => { this.openModal(modalKey) })
    }

    resetFilter = () => {
        this.setState({
            stayFilterBy: {
                placeType: '',
                propertyType: '',
                price: 250,
                amenities: {
                    TV: false,
                    Wifi: false,
                    "Air conditioning": false,
                    "Smoking allowed": false,
                    "Pets allowed": false,
                    "Cooking basics": false
                }
            }
        }, () => { this.props.onfilterStays(this.state.stayFilterBy) })
    }

    handleChange = (key, val, isAmenities = false) => {
        if (isAmenities) {
            this.setState({ stayFilterBy: { ...this.state.stayFilterBy, amenities: { ...this.state.stayFilterBy.amenities, [key]: val } } }, () => {
                this.openModal('amenities')
                this.props.onfilterStays(this.state.stayFilterBy)
            })

        } else {
            this.setState({ stayFilterBy: { ...this.state.stayFilterBy, [key]: val } }, () => {
                if (key === 'price') this.openModal('price')
                this.props.onfilterStays(this.state.stayFilterBy)
            })
        }
    }

    openModal = (modalKey) => {
        const { price, amenities } = this.state.stayFilterBy
        const dynamicModal = {}
        const { x, y } = this.state.dynamicModal.modalPosition

        switch (modalKey) {
            case 'placeType':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div onClick={() => this.handleChange('placeType', 'entire place')}>
                            <h4>Entire place</h4>
                            <h5>You'll have the place to yourself</h5>
                        </div>
                        <div onClick={() => this.handleChange('placeType', 'private room')}>
                            <h4>Private room</h4>
                            <h5>You'll have a private room to yourself</h5>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: y, left: x }
                break;
            case 'propertyType':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div onClick={() => this.handleChange('propertyType', 'loft')}>
                            <span>Loft</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'studio')}>
                            <span>Studio</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'penthouse')}>
                            <span>Penthouse</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'appartment')}>
                            <span>Appartment</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'hotel')}>
                            <span>Hotel</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'villa')}>
                            <span>villa</span>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: y, left: x }
                break;
            case 'price':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div className="price">
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange('price', (price - 10)) }}>-</button>
                            <span>{price}</span>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange('price', (price + 10)) }}>+</button>
                        </div>
                    </div>
                </section >)
                dynamicModal.modalPosition = { top: y, left: x }
                break;

            case 'amenities':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label amenities">
                        <div className={amenities.TV ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('TV', !amenities.TV, true)} >
                            <span >TV</span>
                        </div>
                        <div className={amenities.Wifi ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('Wifi', !amenities.Wifi, true)}>
                            <span>Wifi</span>
                        </div>
                        <div className={amenities["Air conditioning"] ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('Air conditioning', !amenities["Air conditioning"], true)}>
                            <span>AC</span>
                        </div >
                        <div className={amenities['Smoking allowed'] ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('Smoking allowed', !amenities['Smoking allowed'], true)}>
                            <span>Smoking allowed</span>
                        </div>
                        <div className={amenities['Pets allowed'] ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('Pets allowed', !amenities['Pets allowed'], true)}>
                            <span>Pets allowed</span>
                        </div>
                        <div className={amenities['Cooking basics'] ? 'clicked' : 'unclicked'} onClick={() => this.handleChange('Cooking basics', !amenities['Cooking basics'], true)}>
                            <span>Cooking basics</span>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: y, left: x }
                break;
            case '':
                dynamicModal.modalContent = ''
                dynamicModal.modalPosition = { top: 0, left: 0, height: 0, width: 0 }
                break;

            default:
                break;
        }
        this.props.setModalContent(dynamicModal, modalKey)
    }

    render() {

        return (
            <section className="stay-filter">
                <button onClick={(event) => { this.onSetModal(event, 'placeType') }} >Type of place</button>
                <button onClick={(event) => { this.onSetModal(event, 'propertyType') }} >Property type</button>
                <button onClick={(event) => { this.onSetModal(event, 'price') }}>Price</button>
                <button onClick={(event) => { this.onSetModal(event, 'amenities') }} >Amenities</button>
                <button onClick={this.resetFilter} >Clear</button>
            </section>
        )
    }
}