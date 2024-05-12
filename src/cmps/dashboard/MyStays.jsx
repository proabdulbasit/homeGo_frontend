import { HostStayList } from './HostStayList'
import {Loader} from '../app/Loader'

export function MyStays({ stays, onSelectedEditStay,  onSelectAction }) {

    if (!stays) return <Loader/>
    return (
        <section className="host-stay-container">
            <HostStayList stays={stays} onSelectedEditStay={onSelectedEditStay} onSelectAction={onSelectAction} />
        </section>
    )
}
