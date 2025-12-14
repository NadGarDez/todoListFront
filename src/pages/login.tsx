import React, { type JSX } from "react";
import { useAuth } from "react-oidc-context";

const LoginPage = ():JSX.Element => {

    const {signinRedirect} = useAuth();

    const handleLogin = async  () => {
       await signinRedirect()
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                width: '100%',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f3f4f6",
                margin: 0,
            }}
        >
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    borderRadius: 6,
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    fontSize: 16,
                    cursor: "pointer",
                }}
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;



// const auth = useAuth();

//   const signOut = async () => {
//     await auth.removeUser();

//     const clientId = "4g18cqrugc9kv0tdev8vhsgieh";
//     const logoutUri = "http://localhost:5173/";
//     const cognitoDomain = "us-east-2_TR2vhtAD9";
//     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
//   };

//   if (auth.isLoading) {
//     switch (auth.activeNavigator) {
//       case "signinSilent":
//       case "signinRedirect":
//         return <div>Iniciando sesión en silencio...</div>;
//       case "signoutRedirect":
//         return <div>Cerrando sesión...</div>;
//       default:
//         return <div>Cargando...</div>;
//     }
//   }

//   if (auth.error) {
//     return <div>Oops... Error: {auth.error.message}</div>;
//   }

//   if (!auth.isAuthenticated) {
//     return (
//       <div style={{ padding: '20px' }}>
//         <p>No autenticado.</p>
//         <button onClick={() => auth.signinRedirect()}>Iniciar Sesión</button>
//       </div>
//     );
//   }