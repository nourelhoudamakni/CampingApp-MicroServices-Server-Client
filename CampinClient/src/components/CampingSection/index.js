import React from 'react';
import {
    InfoContainer,
    ImgWrap,
    Img,
    TextOverlay,
    Subtitle,
    Heading,
    Button,
    TopLine,
} from './CampingElements';
import Car from '../../images/home1.png';
import { useNavigate } from 'react-router-dom';


const InfoSection = ({ lightBg, id, alt }) => {
    const navigate=useNavigate();
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <ImgWrap>
                    <Img src={Car} alt={alt} />
                    <TextOverlay>
                    <TopLine>Campings</TopLine>
                        <Heading>There are new campings for you!</Heading>
                        <Subtitle>Check our list now.</Subtitle>
                        <Button to="/Campings">View List</Button>
                        <Subtitle>Or Create your own Camping .</Subtitle>
                        <Button  to="/AddCamping">Add Camping</Button>
                    </TextOverlay>
                </ImgWrap>
            </InfoContainer>
        </>
    );
};

export default InfoSection;
