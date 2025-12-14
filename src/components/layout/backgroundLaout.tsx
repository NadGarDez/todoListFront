import React, { type ReactNode, type JSX } from "react"; // Usamos ReactNode para children por ser más flexible
import { Box, styled } from "@mui/material";
import image from '../../assets/city-5637906_1920.jpg';
import CircleLayerAndFooter from "./circleLayer";

interface BackgroundLayoutProps {
    children: ReactNode;
}

const BackgroundImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh', 
    objectFit: 'cover', 
    zIndex: 1,
});

const OrangeOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#F48B2935',
    zIndex: 2, 
});

const ContentContainer = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 4, 
    display: 'flex',
    justifyContent: 'center', 
    paddingTop:16

});

const BackgroundLayout = ({ children }: BackgroundLayoutProps): JSX.Element => {
    return (
        <>
            <BackgroundImage src={image} />
            <ContentContainer>
                {children}
            </ContentContainer>
            <OrangeOverlay />
            <CircleLayerAndFooter />
        </>
    );
};

export default BackgroundLayout;