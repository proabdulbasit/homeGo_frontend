import { Link } from "react-router-dom";
import { FooterLinks } from './app/FooterLinks'

export function Footer({ onSearch, topRatedStays, nearbayStays }) {
    return (
        <footer className="main-footer full">

            <section>
                <FooterLinks onSearch={onSearch} topRatedStays={topRatedStays} nearbayStays={nearbayStays} />

                <section className="footer-nav-container">
                    <div >
                        <p>© 2021 Home & Go, <span>Inc.</span></p>
                        <span>·</span>
                        <Link to="/about">About</Link>
                        <span>·</span>
                        <Link to="/login">Login</Link>
                        <span>·</span>
                        <Link to="/host">Become a host</Link>
                    </div>
                    <div>
                        <p>
                            <i className="fas fa-globe"></i>
                            <span>English (US)</span>
                            <span>$ US</span>
                        </p>
                        <p>
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                        </p>
                    </div>
                </section>
            </section>
        </footer>
    )
}