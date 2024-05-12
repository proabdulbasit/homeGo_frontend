import { Link } from 'react-router-dom'

export function HostStayPreview({ stay, onSelectedEditStay }) {

    return (
        <div className="host-stay-preview">
            <span><img src={stay.imgUrls[0]} alt="stay" /></span>
            <span><Link to={`/stay/${stay._id}`}>{stay.name}</Link></span>
            <span><Link to={`/stay/${stay._id}`}>{stay.loc.address}</Link></span>
            <span><Link to={`/stay/${stay._id}`}>$ {stay.price}</Link></span>
            <span className="stay-actions">
                <button onClick={() => onSelectedEditStay(stay)} ><i className="far fa-edit"></i>Edit</button>
            </span>
        </div>
    )
}