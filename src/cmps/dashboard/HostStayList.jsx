
import { HostStayPreview } from './HostStayPreview'

export function HostStayList({ stays, onSelectedEditStay, onSelectAction }) {
    return (
        <section className="host-stay-list">
            <div className="host-stay-list-table">
                <div className="thead">
                    <div>
                        <span>{''}</span>
                        <span>Name</span>
                        <span>Address</span>
                        <span>Price</span>
                        <span className="stay-actions" >Actions</span>
                    </div>
                </div>
                <div className="tbody">
                {!stays.length && <h1 className="empty-msg">No Stays to show yet, you can add new stay on the <button value='add stay' onClick={onSelectAction}>Add Stay </button> tab</h1>}
                  {(stays.length > 0) && stays.map(stay => {
                        return (
                            <HostStayPreview
                                key={Math.random()}
                                stay={stay}
                                onSelectedEditStay={onSelectedEditStay}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}