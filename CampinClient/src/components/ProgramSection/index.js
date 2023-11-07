import React from 'react'
import {
    DiscoverContainer,
    DiscoverWrapper,
    DiscoverRow,
    Column1,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    Column2,
    ImgWrap,
    Button,
    Img
} from './ProgramElements'
import discover from '../../images/home4.png'

const Facility = ({ lightBg,
    id, 
    imgStart, 
    topLine, 
    lightText, 
    headline, 
    darkText, 
    description, 
    buttonLabel, 
    img,
    alt, 
    primary, 
    dark, 
    dark2 }) => {
    return (
        <>
            <DiscoverContainer lightBg={lightBg} id={id}>
                <DiscoverWrapper>
                    <DiscoverRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>Camping Programs</TopLine>
                                <Heading lightText={lightText}>want to join a camping program ?</Heading>
                                <Subtitle darkText={darkText}>Check for more.</Subtitle>
                                <BtnWrap>
                                    <Button to='home'
                                    smooth = {true}
                                    duration = {500}
                                    spy = {true}
                                    offset = {-80}
                                    primary = {primary ? 1 : 0}
                                    dark = {dark ? 1 : 0}
                                    
                                    // dark2 = {dark2 ? 1 : 0}
                                    >Learn More</Button>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={discover} alt={alt}></Img>
                            </ImgWrap>
                        </Column2>
                    </DiscoverRow>
                </DiscoverWrapper>
            </DiscoverContainer>
        </>
    )
}

export default Facility
