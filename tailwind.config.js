/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./en/*.html",
        "./pt/*.html",
        "./assets/js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                "neon-cyan": "#00f2ff",
                "background-dark": "#05070a",
                "matte-black": "#121212",
            }
        },
    },
    plugins: [],
}