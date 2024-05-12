
export function DashSideNav ({onSelectAction}){

    return (
        <div className="dash-nav-container">
            <button className="add-stay-btn" value="add stay" onClick={onSelectAction}><i className="fas fa-plus"></i>Add Stay</button>
            <button value="my Stays" onClick={onSelectAction}><i className="fas fa-house-user"></i>My Stays</button>
            <button value="orders" onClick={onSelectAction}><i className="fas fa-clipboard-list"></i>Orders</button>
            <button value="rate stat" onClick={onSelectAction}><i className="fas fa-star"></i>Rates</button>
        </div>
    )
}