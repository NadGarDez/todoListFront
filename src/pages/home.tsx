import React, { useRef, useState, type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";
import DefaultModal from "../components/ui/defaultModal";
import Slider, { type Settings } from 'react-slick';


const sliderConfig: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};


interface modalState { // futuro estado del modal
    visible: boolean,
    contentName: 'signOut' | 'delete' | 'none'
}

const Home = (): JSX.Element => {

    const signOut = () => {
        const clientId = "4g18cqrugc9kv0tdev8vhsgieh";
        const logoutUri = "http://localhost:5173/logout";
        const cognitoDomain = "https://us-east-2tr2vhtad9.auth.us-east-2.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

    };


    const sliderRef = useRef<Slider>(null);

    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisibility = () => setVisible(!visible);
    const onChangeVisibility = (newVisibility: boolean) => {
        setVisible(newVisibility)
    }

    const back = () => {
        sliderRef.current?.slickPrev();
    }

    const next = () => {
        sliderRef.current?.slickNext();
    }


    return (

        <BackgroundLayout >
            <MobileFirstContainer>
                <button onClick={next}>next</button>
                <button onClick={back}>back</button>




                <Slider {...sliderConfig} ref={sliderRef}>

                    <div>
                        page1
                    </div>
                    <div>
                        Page 2
                    </div>

                </Slider>







                {/* modal aquí tendremos un selector de contenido dinámico*/}

                <DefaultModal
                    visible={visible}
                    relativeHeight="70%"
                    onChangeVisibility={onChangeVisibility}
                >
                    <p>super modal</p>
                </DefaultModal>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Home;