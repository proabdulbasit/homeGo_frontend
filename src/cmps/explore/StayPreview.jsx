import { Link } from 'react-router-dom'
import { StayGallery } from '../explore/StayGallery'

export function StayPreview({ stay, loggedInUser, updateUser, toggleMsgModal, login, trip, addTrip, stayType, loadWishlist }) {

    const getTotalRate = () => {
        const rates = stay.reviews.map(review => review.avgRate)
        const sum = rates.reduce((acc, rate) => {
            acc += rate
            return acc
        }, 0)
        if (sum === 0) return 'new'
        return (sum / rates.length).toFixed(1)
    }

    function toggleWish(stayId) {
        if (!loggedInUser) {
            toggleMsgModal(<span><h2>You must log in frist</h2><Link to='/login'>Login</Link><button className="demo-user-btn" onClick={() => { login({ username: 'mor', password: '1111' }) }}>Demo User</button></span>)
            return false
        }
        if (!loggedInUser.wishlist) loggedInUser.wishlist = [stayId]
        else {
            let match = loggedInUser.wishlist.findIndex((wishId) => wishId === stayId)
            if (match !== -1) {
                loggedInUser.wishlist.splice(match, 1)
            }
            else loggedInUser.wishlist.push(stayId)
        }
        updateUser(loggedInUser)
        if (stayType === 'wish') loadWishlist(loggedInUser)
    }

    function checkIsWish(stayId) {
        if (!loggedInUser || !loggedInUser.wishlist) return false
        const match = loggedInUser.wishlist.find((wishId) => wishId === stayId)
        if (match) return true
        return false
    }

    function onSelectStay() {
        var updatedTrip = trip
        updatedTrip.stay = stay
        addTrip(updatedTrip)
    }

    return (
        <section className="stay-preview-container" >
            <Link to={`/stay/${stay._id}`} onClick={onSelectStay} className="stay-preview-link">
                <StayGallery stay={stay} />
                <div className="stay-preview-info">
                    <span className="stay-preview-rate">
                        <i className="fas fa-star"></i>
                        <p>{getTotalRate()}</p>
                        <p>( {stay.reviews.length} )</p>
                    </span>
                    <h3>
                        <span>{stay.propertyType}</span>
                                     •
                        <span>{stay.loc.address.substring(0, stay.loc.address.indexOf(','))}</span>
                    </h3>
                    <h3>{stay.name}</h3>
                    <h3 className="stay-price"><span >${stay.price}</span> / night</h3>
                </div>
            </Link>
            <button className="stay-preview-save-btn" onClick={() => { toggleWish(stay._id) }} >
                {!checkIsWish(stay._id) ? <i className="fas fa-heart off"></i> : <i className="fas fa-heart"></i>}
            </button>
        </section>
    )
}