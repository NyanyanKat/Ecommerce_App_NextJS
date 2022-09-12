npx create-next-app [app-name]

in app:
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

react-hook-form
js-cookie
next-auth
headless ui

change .eslintrc.json as follows:
{
"extends": ["eslint:recommended", "next/core-web-vitals"]
}

For hydrating problem, use dynamic rendering on client, set SSR to false


