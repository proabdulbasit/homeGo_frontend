
export function DashHeader({ stays, orders, orderChangeStatus }) {

    function getTotalAvgRate() {
        var totalRate = 0;
        stays.forEach(stay => {
            const rates = stay.reviews.map((review) => review.avgRate);
            var stayAvgRate = rates.reduce((a, b) => a + b, 0)
            totalRate += (stayAvgRate / rates.length)
        })
        var RateToDisplay = (totalRate / stays.length) ? (totalRate / stays.length).toFixed(1) : 0
    
        return RateToDisplay
    };

    function getSumByOrderStatus(status) {
        var sum = 0;
        orders.forEach(order => {
            if (order.status === status) sum++
        })
        return sum
    }

    function getActiveGuests() {
        const activeUsers = []
        const now = new Date(Date.now())
        orders.forEach(order => {
            const checkIn = new Date(order.startDate)
            const checkOut = new Date(order.endDate)
            if (checkIn < now && checkOut > now) activeUsers.push(order)
        })
        return activeUsers
    }

    function getMonthlyEarning() {
        var totalEarning = 0;
        const currMonth = new Date(Date.now()).getMonth() + 1
        const currYear = new Date(Date.now()).getFullYear()

        orders.forEach(order => {
            const orderMonth = new Date(order.startDate).getMonth() + 1
            const orderYear = new Date(order.startDate).getFullYear()
            if (currMonth === orderMonth && currYear === orderYear) {
                totalEarning += order.totalPrice
            }
        })
        return totalEarning.toLocaleString('en-US')
    }

    return (
        <section className="dash-header">
            <div>
                <h3>Total Rate</h3>
                <div>
                    <span><i className="fas fa-star"></i>{getTotalAvgRate()}</span>
                    <p>{orderChangeStatus}%<i className="fas fa-long-arrow-alt-up"></i></p>
                </div>
            </div>
            <div>
                <h3>monthly earning</h3>
                <div>
                    <span>$ {getMonthlyEarning()}</span>
                </div>
            </div>
            <div>
                <h3>Orders</h3>
                <div>
                    <span>{orders.length}</span>
                    <div className="circle-container">
                        <div>
                            <span title="pending" className="circle circle-yellow"></span>
                            <p>{getSumByOrderStatus('wait for approval')}</p>
                        </div>
                        <div>
                            <span title="approved" className="circle circle-green"></span>
                            <p>{getSumByOrderStatus('approved')}</p>
                        </div>
                        <div>
                            <span title="decline" className="circle circle-red"></span>
                            <p>{getSumByOrderStatus('declined')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h3>Active Guests</h3>
                    <span>{getActiveGuests().length}</span>
                </div>
                <div>
                    {getActiveGuests().map(order => {
                        return (<img src={order.user.imgUrl} alt="guest" key={Math.random()}/>)
                    })}
                </div>
            </div>
        </section>
    )
}