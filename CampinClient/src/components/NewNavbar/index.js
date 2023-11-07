import React, { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink,
    NavLinksHamza
} from './NavbarElements'

const Navbar = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick = {toggleHome}>Camplus</NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinksHamza to="/ListPrograms" 
                                smooth = {true} duration = {500} spy = {true}
                                exact = 'true' offset = {-80} >Programs</NavLinksHamza>
                            </NavItem>
                            <NavItem>
                                <NavLinksHamza to="/ListOffrePlat"
                                smooth = {true} duration = {500} spy = {true}
                                exact = 'true' offset = {-80}>Meals</NavLinksHamza>
                            </NavItem>
                            <NavItem>
                                <NavLinksHamza to="/campings"
                                smooth = {true} duration = {500} spy = {true}
                                exact = 'true' offset = {-80}>Campings</NavLinksHamza>
                            </NavItem>
                            <NavItem>
                                <NavLinksHamza to=''
                                smooth = {true} duration = {500} spy = {true}
                                exact = 'true' offset = {-80}>Reservations</NavLinksHamza>
                            </NavItem>
                            <NavItem>
                                <NavLinksHamza to='/ListAvis'
                                smooth = {true} duration = {500} spy = {true}
                                exact = 'true' offset = {-80}>Reviews</NavLinksHamza>
                            </NavItem>

                        </NavMenu>
                        <NavBtn>
                            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                            <NavBtnLink to="/signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
