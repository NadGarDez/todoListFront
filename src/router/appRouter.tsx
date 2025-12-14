import React, { type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ProtectedRoute from "./protectedRoute";
import LoginPage from "../pages/login";
import Logout from "../pages/logout";
import Home from "../pages/home";


export default function AppRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Navigate to="/home" />
                    </ProtectedRoute>
                } />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}