import { Link } from "react-router-dom";

export function FilterGallery({ stays ,addTrip}) {

    function onSelectStay(stay) {
        addTrip({ guests: { adults: 1, kids: 0 }, loc: { address: '' }, time: { checkIn: '', checkOut: '' }, stay })
    }
    
    return (
        <section className="filter-gallery">
            {stays.map((stay, idx) => {
                if (idx < 4) {
                    return (
                        <Link to={`/stay/${stay._id}`} key={Math.random()} onClick={() => onSelectStay(stay)}>
                            <div className="gallery-preview-img">
                                <img src={`${stay.imgUrls[0]}`} alt={stay.name} />
                            </div>
                            <h3>{stay.name}</h3>
                        </Link>
                    )
                }
                else return ''
            })}
        </section>
    )
}
