# MT's Kitchen (Recipe Website)

## About this project
upload and store recipe (frontend, backend, datebase)
like and favorite recipe (frontend, backend, database)
allow user to login/logout (frontend, backend, database)
tailor ingredients measurement based on portion (frontend, backend, database)
different categories based on dishes type (frontend, backend, database)
user history
edit your own recipe 
customize liked/favorited recipe

## Page
Homepage (Intro)
Register 
Login
User (Recipes History, User Detail, Edit Recipes)
Recipes (All Recipes, Categorized Recipes, Favorited Recipes(Filter/Tag), Portion)
NewRecipe (Form)
AboutUs


## General frameworks
Fast api - backend
React - frontend
MySQL - database
Docker

## Setting up
For Docker:
Find Docker in the app store and install.
Run this command to verify:
- $ docker run hello-world
- Hello from Docker.
This message shows that your installation appears to be working correctly.

To dockerize backend:
First, create a Dockerfile in the backend/ directory.
(Use an official Python runtime as a parent image)
- FROM python:3.11-slim
(Set the working directory in the container)
- WORKDIR /app
(Copy the requirements file into the container)
- COPY requirements.txt .
(Install any needed packages specified in requirements.txt)
- RUN pip install --no-cache-dir -r requirements.txt
(Copy the current directory contents into the container at /app)
- COPY . .
(Make port 8000 available to the world outside this container)
- EXPOSE 8000
(Define environment variable for FastAPI)
- ENV PYTHONUNBUFFERED=1
(Run FastAPI when the container launches)
- CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
Then go to backend directory and use bash:
- docker build -t fastapi-backend .     (building)
- docker run -d -p 8000:8000 fastapi-backend       (running)

To dockerize frontend:
Create a Dockerfile in frontend/ directory.
(Use the official Node.js image as a parent image)
- FROM node:18-alpine
(Set the working directory in the container)
- WORKDIR /app
(Copy package.json and package-lock.json to the container)
- COPY package*.json ./
(Install dependencies)
- RUN npm install
(Copy the rest of the application code)
- COPY . .
(Build the React app for production)
- RUN npm run build
(Serve the frontend using a lightweight web server)
- RUN npm install -g serve
(Expose the port that the app will run on)
- EXPOSE 3000
(Start the app)
- CMD ["serve", "-s", "build"]
Then go to frontend directory and use bash:
- docker build -t react-frontend .         (building)
- docker run -d -p 3000:3000 react-frontend           (running)

Docker Compose:
To orchestrate both FastAPI and React services, use Docker Compose.
Create docker-compose.yml in the root of the project.
From the root of the project where docker-compose.yml is located
Once the Dockerfile is correctly set up, use this line to build the docker image:
- docker build -t my-app .
Then build the docker Container:
- docker run -d -p 8000:8000 my-app
This will build and run both containers, and you can access the services as:
Frontend: http://localhost:3000
Backend: http://localhost:8000

For Fast api:
To run backend dev server, go to backend directory and in bash:
- uvicorn app.main:app --reload --port 8000

For React:
To download Vite
- npm create vite@latest .
Make sure node.js is downloaded before run this command

Select React and JavaScript

Then run
- npm install

To run frontend dev server, go to frontend directory and in bash:
- npm start
- npm run dev

For MySQL:
Installation command:
- pip install aiomysql sqlalchemy
Example configuration:
- DATABASE_URL = "mysql://user:password@localhost/dbname"