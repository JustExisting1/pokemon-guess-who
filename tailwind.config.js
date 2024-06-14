/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend:{
            fontFamily:{
                "test": ['Tiny5', "sans-serif"],
            },
            colors:{
                red: {
                    xl: "ad",
                    l: "ad",
                    default: "ad",
                    d: "ad",
                    xd: "ad",
                }

            }
        }
    },
    plugins: [],
};
