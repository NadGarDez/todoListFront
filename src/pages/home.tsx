import React, { useState, type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";
import DefaultModal from "../components/ui/defaultModal";

const Home = (): JSX.Element => {

    const signOut = () => {
        const clientId = "4g18cqrugc9kv0tdev8vhsgieh";
        const logoutUri = "http://localhost:5173/logout";
        const cognitoDomain = "https://us-east-2tr2vhtad9.auth.us-east-2.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

    };

    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisibility = () => setVisible(!visible);
    const onChangeVisibility = (newVisibility:boolean) => {
        setVisible(newVisibility)
    }

    return (
        
        <BackgroundLayout >
            <MobileFirstContainer>
               <button onClick={toggleVisibility}>toggle</button>
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