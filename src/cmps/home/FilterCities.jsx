import { Link } from 'react-router-dom'

export function FilterCities({ onSearch }) {

    function onSelectTopCity(city) {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: city },
            time: { checkIn: '', checkOut: '' }
        }
        onSearch(trip)
    }

    return (
        <main className="top-cities-gallery">
            <Link to="/explore" onClick={() => { onSelectTopCity('Hong Kong') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&im_w=240" alt="TopCities" />
                <div className="city-details-container">
                    <h3>Hong Kong</h3>
                    <div className="city-details">
                        <h4>China</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('Bangkok') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Bangkok</h3>
                    <div className="city-details">
                        <h4>Thailand</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('London') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>London</h3>
                    <div className="city-details">
                        <h4>England</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('Paris') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Paris</h3>
                    <div className="city-details">
                        <h4>France</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('Dubai') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Dubai</h3>
                    <div className="city-details">
                        <h4>United Arab Emirates</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('New York') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>New York</h3>
                    <div className="city-details">
                        <h4>United States</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('Amsterdam') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Amsterdam</h3>
                    <div className="city-details">
                        <h4>Netherlands</h4>
                    </div>
                </div>
            </Link>
            <Link to="/explore" onClick={() => { onSelectTopCity('Tel Aviv') }} className="top-cities-card">
                <img src="https://a0.muscache.com/im/pictures/7c309a70-bc93-4603-8d3b-9d4cd9bf75b2.jpg?im_q=medq&im_w=240" alt="TopCities"/>
                <div className="city-details-container">
                    <h3>Tel Aviv</h3>
                    <div className="city-details">
                        <h4>Israel</h4>
                    </div>
                </div>
            </Link>
        </main>
    )
}