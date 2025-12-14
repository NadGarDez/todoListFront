import React, { type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";

const Home = (): JSX.Element => {

    const signOut = () => {
        // await auth.removeUser();
        const clientId = "4g18cqrugc9kv0tdev8vhsgieh";
        const logoutUri = "http://localhost:5173/logout";
        const cognitoDomain = "https://us-east-2tr2vhtad9.auth.us-east-2.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

    };

    return (
        // <main style={{ maxWidth: 720, margin: "4rem auto", padding: "0 1rem", textAlign: "center" }}>
        //     <h1>Todo List</h1>
        //     <p>A minimal home page for your React app.</p>
        //     <p>
        //         <a href="/todos">View Todos</a>
        //         {" • "}
        //         <a href="/create">Create Todo</a>
        //     </p>
        //     <button onClick={signOut}>
        //         LogOut
        //     </button>
        // </main>
        <BackgroundLayout >
            <MobileFirstContainer>
                <p>Hols</p>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Home;