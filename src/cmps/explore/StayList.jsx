import { StayPreview } from '../explore/StayPreview'

export function StayList({ stays, loggedInUser, updateUser, toggleMsgModal, login, trip,addTrip ,loadWishlist ,stayType}) {

    return (
        <section className="stay-list">
            {stays.map(stay => <StayPreview key={Math.random()} updateUser={updateUser} loggedInUser={loggedInUser} stay={stay} toggleMsgModal={toggleMsgModal} stayType={stayType} login={login} trip={trip} addTrip={addTrip} loadWishlist={loadWishlist}/>)}
        </section>
    )
}