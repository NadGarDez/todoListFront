import React from "react";

const NotFound: React.FC = () => (
    <main
        style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
            padding: 16,
            textAlign: "center",
        }}
    >
        <h1 style={{ margin: 0 }}>404</h1>
        <p style={{ margin: 0 }}>Page not found</p>
        <a href="/" style={{ marginTop: 12 }}>
            Go home
        </a>
    </main>
);

export default NotFound;