import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../store/slices/user-slice'
function Navbar() {

    const dispatch = useDispatch()

    return (
        <>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>

            <nav className="site-nav">
                <div className="container">
                    <div className="site-navigation">
                        <Link to={'/'} className="logo m-0">Travelista <span className="text-primary">.</span></Link>

                        <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
                            <li className="active"><Link to={'/'}>Home</Link></li>
                            <li className="has-children">
                                <a>Account</a>
                                <ul className="dropdown">
                                    {/* <li><a href="elements.html">Elements</a></li> */}
                                    <li onClick={() => dispatch(userLogout())}><Link> Logout</Link></li>
                                    {/* <li className="has-children">
                                        <a href="#">Menu Two</a>
                                        <ul className="dropdown">
                                            <li><a href="#">Sub Menu One</a></li>
                                            <li><a href="#">Sub Menu Two</a></li>
                                            <li><a href="#">Sub Menu Three</a></li>
                                        </ul>
                                    </li> */}
                                    {/* <li><a href="#">Menu Three</a></li> */}
                                </ul>
                            </li>
                            {/* <li><a href="services.html">Services</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact Us</a></li> */}
                        </ul>

                        <a href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light" data-toggle="collapse" data-target="#main-navbar">
                            <span></span>
                        </a>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
