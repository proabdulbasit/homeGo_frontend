import { Link } from "react-router-dom";


export function Hero({ loadStays,addTrip }) {

    async function explorAll() {
        const trip = {
            guests: { adults: 1, kids: 0 },
            loc: { address: '' },
            time: { checkIn: '', checkOut: '' }
        }
        await addTrip(trip)
        loadStays()
    }

    return (
        <section className="main-hero full">
            <div>
                <h1>Discover stays to live, work, or just relax.</h1>
                <button onClick={explorAll}><Link to="/explore">Explore now</Link></button>
            </div>
        </section>
    )
}