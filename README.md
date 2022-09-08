npx create-next-app [app-name]

in app:
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

change .eslintrc.json as follows:
{
"extends": ["eslint:recommended", "next/core-web-vitals"]
}
