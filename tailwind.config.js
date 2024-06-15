/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Tiny5", "sans-serif"],
                sans: ["Jost", "sans-serif"],
            },
            colors: {
                primary: {
                    xl: "#f8e8e4",
                    l: "#f6e0dc",
                    DEFAULT: "#F3D8D3",
                    d: "#b4a09c",
                    xd: "#7a6b69",
                },
                secondary: {
                    xl: "#b9b8b7",
                    l: "#a3a2a0",
                    DEFAULT: "#8D8C8A",
                    d: "#676765",
                    xd: "#444342",
                },
                accent: {
                    xl: "#f49383",
                    l: "#eb6c5a",
                    DEFAULT: "#DF3E2C",
                    d: "#a52b1e",
                    xd: "#6f1a11",
                },
                dark: {
                    xl: "#767573",
                    l: "#4d4c49",
                    DEFAULT: "#282623",
                    d: "#1b1917",
                    xd: "#0f0d0c",
                },
                light: {
                    xl: "#f2f1f2",
                    l: "#d9d6d8",
                    DEFAULT: "#c0bbbf",
                    d: "#8e8a8d",
                    xd: "#5f5c5e",
                },
            },
        },
    },
    plugins: [],
};
