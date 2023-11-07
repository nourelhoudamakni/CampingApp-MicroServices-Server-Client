import React, { useState } from 'react'
import Video from '../../video/video.mp4'
import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight,
    Button,
} from './HomeElements'

const HeroSection = () => {
    const [hover, setHover] = useState();

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video}
                    type="video/mp4" />
            </HeroBg>
            <HeroContent>
                <HeroH1>Adventure Awaits</HeroH1>
                <HeroP>
                    Sign up for your outdoor escape today and go for a camping adventure.
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="/AddReservation" onMouseEnter={onHover}
                        onMouseLeave={onHover} primary={true} dark={true}
                        smooth={true} duration={500} spy={true}
                        exact='true' offset={-80}>
                        <b>Make reservation </b>{hover ? <ArrowForward /> : <ArrowRight></ArrowRight>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
