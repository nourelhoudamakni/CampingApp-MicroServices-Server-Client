import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const InfoContainer = styled.div`
    color: #fff;
    background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#010606')};
    
    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`;

export const TopLine = styled.p`
    color: #01bf71;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
`

export const Heading = styled.h1`
    
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#f7f8fa')};

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`
export const Subtitle = styled.p`
margin-top: 50px;
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 30px;
    line-height: 24px;
    color: ${({darkText}) => (darkText ? '#010606' : '#fff')}
`

export const BtnWrap = styled.div`
    display: flex;
    justify-content: center;
`
export const ImgWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative; /* To position the text overlay relative to this container */
`;

export const Img = styled.img`
    width: 100%;
    margin: 0;
    padding-right: 0;
`;

export const TextOverlay = styled.div`
    position: absolute;
    top: 40%; /* Adjust top position as needed */
    left: 120px; /* Adjust left position as needed */
    transform: translate(0, -50%); /* Vertically center the text */
    background: rgba(0, 0, 0, 0); /* Transparent background */
    color: #fff;
    padding: 10px; /* Adjust padding as needed */
    border-radius: 5px;
    font-size: 16px; /* Adjust font size as needed */
`;

export const Button = styled(LinkR)`
border-radius: 50px;
background: #01bf71;
white-space: nowrap;
padding: 10px 22px;
color: #010606;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
}
`;







