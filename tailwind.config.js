/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend:{
            fontFamily:{
                "test": ['Work Sans', "sans-serif"],
                "test01": ['Major Mono Display', "sans-serif"]
            },
        }
    },
    plugins: [],
};
