import { Link } from 'react-router-dom'

export function Banner({ name, btnTxt, title, subtitle,loggedInUser }) {

    return (
        <section className={"banner " + name}>
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                {title ==='Become a host' && <button><Link to={(loggedInUser)? `/host/${loggedInUser._id}`:"/host"}>{btnTxt}</Link></button>}
                {title !=='Become a host' && <button>{btnTxt}</button>}
            </div>
        </section>
    )
}