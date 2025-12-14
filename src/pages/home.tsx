import React, { useRef, useState, type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";
import DefaultModal from "../components/ui/defaultModal";
import Slider, { type Settings } from 'react-slick';
import StandardModalContent from "../components/ui/standarModalContent";
import { CLIENT_ID, COGNITO_DOMAIN, LOGOUT_URL } from "../constants";


const sliderConfig: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};


interface modalState { 
    visible: boolean,
    contentName: 'signOut' | 'delete'
}

const Home = (): JSX.Element => {

    const signOut = () => {
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}}&logout_uri=${encodeURIComponent(LOGOUT_URL)}`;

    };


    const sliderRef = useRef<Slider>(null);

    const [modalState, setModalStatus] = useState<modalState>({
        visible: false,
        contentName: 'signOut'
    })

    const toggleVisibility = () => {
        setModalStatus(
            {
                ...modalState, visible: !modalState.visible
            }
        )
    }

    const onChangeVisibility = (newVisibility: boolean) => {
        setModalStatus({ ...modalState, visible: newVisibility })
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
                <button onClick={toggleVisibility}>toggle</button>


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
                    visible={modalState.visible}
                    relativeHeight="35%"
                    onChangeVisibility={onChangeVisibility}
                >
                    {
                        modalState.contentName === 'signOut' ? (
                            <StandardModalContent
                                title="¿Estás seguro de que quieres cerrar sesión?"
                                subtitle="Serás redirigido a la página de inicio de sesión."
                                onCancel={toggleVisibility}
                                onAction={signOut}
                                actionLabel="Cerrar Sesión"
                            />
                        ) : null
                    }


                </DefaultModal>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Home;