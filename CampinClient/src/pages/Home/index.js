import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import HomeSection from '../../components/HomeSection'
import Camping from '../../components/CampingSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../../components/Data'
import OffrePlat from '../../components/OffrePlatSection'
import ServiceSection from '../../components/Services'
import Program from '../../components/ProgramSection'
import Footer from '../../components/Foooter'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HomeSection />
            <Program {...homeObjOne}/>
            <OffrePlat {...homeObjTwo} />
            <Camping {...homeObjThree} />
            
            <Footer />
        </>
    )
}

export default Home
