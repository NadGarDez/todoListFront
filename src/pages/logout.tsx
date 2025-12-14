import React, { useEffect, type JSX } from "react";

const Logout = (): JSX.Element => {
    
    useEffect(() => {
        // Clear storage
        try {
            localStorage.clear();
            sessionStorage.clear();
        } catch { }

        // Expire all cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
        });

        // Redirect to home (or change to your desired route)
        window.location.replace("/login");
    }, []);

    return <div>Logging out…</div>;
};

export default Logout;