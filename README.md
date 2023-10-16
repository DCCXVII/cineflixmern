
# Project Title

A brief description of what this project does and who it's for

# CineFlix

CineFlix is a comprehensive open-source application for movies and series. The project is built using the MERN stack, which includes MongoDB, Express, React, and Node.js. Additionally, it leverages React with Vite for an enhanced development and building experience, along with Redux for state management.

## How to Set Up and Configure

To get started with this project on your local machine, you can either fork and clone the repository or download it as a zip file and extract it. After that, open the project using your preferred code editor. If you are using VS Code, you can set up two separate terminals to run the client and server individually.

### Client-side Configuration

```bash
$ cd Client
$ npm install (to install client-side dependencies)
$ npm run dev (to start the client)
```

### Server-side Configuration

Navigate to the server directory and set the necessary environment variables in the .env file. Create your MongoDB connection URL and ensure it's set as your MONGO_URL. Provide the following credentials:

```
#  --- .env  ---

MONGODB_URL
PORT =5000
TOKEN_SECRET=
TMDB_BASE_URL=
TMDB_KEY=
```

Then, execute the following commands:

```bash
$ cd Server
$ npm install (to install server-side dependencies)
$ npm install (to start the server)
```

## Key Features

- User registration and login
- JWT Token-based authentication
- Ability to add and delete favorites
- Leave and delete reviews
- Password update functionality
- Search for movies and series
- Watch trailers on YouTube
- 404 Error Page, and much more
- Skeleton loading effect for a smoother user experience
- Responsive design for optimal viewing on all devices

## Technologies Used

### Frontend

* [React js](#FrontEnd): JavaScript library for building user interfaces, particularly for single-page applications
* [React Hooks](#FrontEnd): State management tool for React applications
* [react-router-dom](#FrontEnd): Routing tool for React applications
* [axios](#FrontEnd): HTTP client for making API calls
* [React Toastify](#FrontEnd): Notification management tool for React applications
* [Swiperjs](#FrontEnd): Library for creating responsive and interactive sliders/carousels
* [react-icons](#FrontEnd): Icon library for React applications

### Backend

* [Node js](#) - Runtime environment for building fast server applications using JavaScript
* [Express js](#) - Server framework for handling and routing HTTP requests
* [Mongoose](#) - Object Data Modeling (ODM) library for MongoDB and Node.js
* [axios](#) - HTTP client for making API calls
* [jsonwebtoken](#) - Library for generating and verifying JSON Web Tokens
* [cookie-parser](#) - Middleware for handling cookies in Node.js web applications
* [cors](#) - Middleware for handling Cross-Origin Resource Sharing (CORS) in Node.js
* [Dotenv](#) - Module for loading environment variables from a .env file
* [express-validator](#) - Middleware for request validation in Express applications
* [nodemon](#) - Utility for automatically restarting the server during development

### Database

* [MongoDB](#) - NoSQL database for storing project data

### API

* [TMDB API](#) - The Movie Database API for accessing information about movies and TV shows

## Demo

images soon : ---


## Authors

- Github: (https://github.com/DCCXVII)
- Twitter: (https://twitter.com/0x_DCCXVII)
- Gmail: (dccxvii.inbox@gmail.com)

## License

MIT License

© 2023 DCCXVII

This software is provided under the MIT License, allowing any person to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided the original copyright notice and permission notice are included in all copies or substantial portions of the software. The software is provided "as is," without any warranty of any kind, and the authors or copyright holders will not be liable for any claims, damages, or other liabilities arising from the use of the software.