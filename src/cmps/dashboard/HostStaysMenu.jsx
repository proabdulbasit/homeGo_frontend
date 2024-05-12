
export function HostStaysMenu({ stays, updateSelectedStay }) {
    return (
        <section className="host-rate-card">
            {stays.map(stay => {
                return (
                    <label key={Math.random()} onClick={() => { updateSelectedStay(stay) }}>
                        <img src={stay.imgUrls[0]} alt="stay-preview" />
                        <div>
                            <h4>{stay.name}</h4>
                            <h6>{`${stay.loc.address}`}</h6>
                            <h6>{`${stay.capacity} Guests`}</h6>
                        </div>
                    </label>
                )
            })}
        </section>
    )
}