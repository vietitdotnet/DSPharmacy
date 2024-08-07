# React + Vite

# Create a React project 

The latest recommended way of creating a new React application is to use a front-end tooling software such as Vite or Parcel, but you can also use a more classic method such as Create React App.

## Using Vite React
```
   npm create vite@latest DSPharmacy -- --template react
   cd DSPharmacy
```
# Install Tailwind CSS

Install Tailwind CSS by running the following two commands:
```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
```

# Install Flowbite

Install Flowbite and Flowbite React by running the following command in your terminal:
```
 npm install flowbite flowbite-react
```

Configure the template paths inside the tailwind.config.js file:

```
    export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        "./node_modules/flowbite/**/*.js",
        'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
        extend: {},
    },
    plugins: [  
        require('flowbite/plugin'),
    ]
    }
```
# Install the libraries

Install install react-router-dom

```
 npm install react react-dom 
```


