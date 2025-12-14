import React, { type JSX } from "react";
import { Box } from "@mui/material";



const WHITE_MATE = "rgba(255, 255, 255)";

const LIQUID_SECTION_HEIGHT = '10vh'; 
const LiquidWaveBackground = ():JSX.Element => (
    <Box
        sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: LIQUID_SECTION_HEIGHT,
            pointerEvents: 'none',
            overflow: 'hidden',
        }}
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            style={{ width: '100%', height: '100%' }}
        >
            <defs>
                {/* Gradiente principal con color proporcionado */}
                <linearGradient id="mainLiquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F48B29" stopOpacity="0.38"/>
                    <stop offset="100%" stopColor="#F48B29" stopOpacity="0.25"/>
                </linearGradient>

                {/* Gradiente para capa intermedia */}
                <linearGradient id="midLayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F48B29" stopOpacity="0.45"/>
                    <stop offset="100%" stopColor="#F48B29" stopOpacity="0.3"/>
                </linearGradient>

                {/* Gradiente para capa superior */}
                <linearGradient id="topLayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#F8F8F8" stopOpacity="0.8"/>
                </linearGradient>

                {/* Gradiente blanco semitransparente */}
                <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7"/>
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4"/>
                </linearGradient>

                {/* Filtro de suavizado para las curvas */}
                <filter id="smoothBlur">
                    <feGaussianBlur stdDeviation="0.5" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
            </defs>

            {/* 1. FONDO BASE - Color sólido */}
            <rect x="0" y="0" width="100" height="100" fill="#F5F5F5"/>

            {/* 2. CAPA BASE - Pendiente principal izquierda (más alta) a derecha (más baja) */}
            <path 
                d="M 0 70 
                   C 15 50, 25 65, 40 60
                   C 55 55, 65 75, 80 70
                   C 90 68, 95 85, 100 90
                   L 100 100 L 0 100 Z"
                fill="url(#mainLiquidGradient)"
                opacity="0.8"
            />

            {/* 3. CAPA MEDIA - Curvas más pronunciadas */}
            <path 
                d="M 0 65 
                   C 10 40, 20 55, 35 50
                   S 45 35, 60 45
                   S 70 60, 85 55
                   C 92 53, 96 70, 100 75
                   L 100 100 L 0 100 Z"
                fill="url(#midLayerGradient)"
                opacity="0.85"
            />

            {/* 4. CAPA CON MÁS CURVAS DINÁMICAS */}
            <path 
                d="M 0 60 
                   C 8 30, 25 45, 40 35
                   C 55 25, 65 40, 75 30
                   C 85 20, 92 40, 100 50
                   L 100 100 L 0 100 Z"
                fill="#F48B29"
                fillOpacity="0.2"
                opacity="0.9"
            />

            {/* 5. CAPA DE ESPUMA/CRESTAS - Ondas blancas */}
            <path 
                d="M 0 55 
                   C 5 25, 18 40, 30 28
                   C 42 16, 50 30, 65 22
                   C 80 14, 88 32, 100 40
                   L 100 100 L 0 100 Z"
                fill="url(#whiteGradient)"
                opacity="0.95"
            />

            {/* 6. ONDAS PRONUNCIADAS SUPERIORES */}
            {/* Onda 1 - Izquierda */}
            <path 
                d="M 0 50 
                   C 12 15, 22 35, 35 20
                   Q 45 10, 55 25
                   L 55 30 L 0 55 Z"
                fill={WHITE_MATE}
                fillOpacity="0.7"
                opacity="0.9"
            />

            {/* Onda 2 - Centro */}
            <path 
                d="M 40 25 
                   C 50 10, 60 20, 70 15
                   Q 80 10, 85 22
                   L 85 28 L 40 35 Z"
                fill={WHITE_MATE}
                fillOpacity="0.6"
                opacity="0.85"
            />

            {/* Onda 3 - Derecha */}
            <path 
                d="M 75 20 
                   C 82 10, 88 18, 92 15
                   Q 96 12, 100 25
                   L 100 35 L 75 30 Z"
                fill={WHITE_MATE}
                fillOpacity="0.5"
                opacity="0.8"
            />

            {/* 7. DETALLES DE FLUJO - Líneas de corriente */}
            <path 
                d="M 0 45 
                   C 20 20, 40 35, 60 25
                   C 80 15, 90 30, 100 35"
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="0.8" 
                strokeOpacity="0.3"
                strokeLinecap="round"
                strokeDasharray="1,2"
            />

            <path 
                d="M 0 35 
                   C 25 10, 45 25, 70 15
                   C 85 8, 95 22, 100 28"
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="0.6" 
                strokeOpacity="0.25"
                strokeLinecap="round"
                strokeDasharray="2,3"
            />

            {/* 8. ACENTOS DE COLOR - Pequeñas áreas con el color principal */}
            {/* Acento izquierdo */}
            <path 
                d="M 10 40 
                   Q 18 32, 25 38
                   Q 32 44, 20 48
                   Z"
                fill="#F48B29"
                fillOpacity="0.35"
            />

            {/* Acento central */}
            <path 
                d="M 45 30 
                   Q 52 25, 58 30
                   Q 64 35, 55 38
                   Z"
                fill="#F48B29"
                fillOpacity="0.3"
            />

            {/* Acento derecho */}
            <path 
                d="M 80 35 
                   Q 86 30, 92 35
                   Q 98 40, 88 43
                   Z"
                fill="#F48B29"
                fillOpacity="0.25"
            />

            {/* 9. SOMBRAS PARA PROFUNDIDAD */}
            <path 
                d="M 0 70 
                   C 15 50, 25 65, 40 60
                   L 40 62 
                   C 25 67, 15 52, 0 72
                   Z"
                fill="#000000"
                fillOpacity="0.05"
            />

            <path 
                d="M 60 45 
                   C 70 60, 85 55, 100 75
                   L 100 77 
                   C 85 57, 70 62, 60 47
                   Z"
                fill="#000000"
                fillOpacity="0.04"
            />

        </svg>
    </Box>
);


export default LiquidWaveBackground;