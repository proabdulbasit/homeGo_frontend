import { Link } from "react-router-dom";
import { tripService } from '../../services/trip-service'

export function FooterLinks({ onSearch, topRatedStays, nearbayStays }) {

    function onSelectLink(address) {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address },
            time: { checkIn: '', checkOut: '' }
        }
        onSearch(trip)
        window.scroll({
            top: 0
        })
    }

    const topCities = tripService.getTopCities()

    return (
        <section className="footer-links-container">
            <h3>Inspiration for future getaways</h3>
            <div>
                <div>
                    <h4>Top Rated</h4>
                    {topRatedStays.map((stay) => {
                        return <Link key={Math.random()} to={`/stay/${stay._id}`} ><span>{stay.name}</span><span>{stay.loc.address}</span></Link>
                    })}
                </div>
                <div>
                    <h4>Nearby</h4>
                    {nearbayStays.map((stay) => {
                        return <Link key={Math.random()} to={`/stay/${stay._id}`} ><span>{stay.name}</span><span>{stay.loc.address}</span></Link>
                    })}
                </div>
                <div>
                    <h4>Cities</h4>
                    {topCities.map((city) => {
                        return <Link key={Math.random()} to="/explore" onClick={() => { onSelectLink(`${city.city}`) }}><span>{city.city}</span><span>{city.state}</span></Link>
                    })}
                </div>
            </div>
        </section>

    )
}