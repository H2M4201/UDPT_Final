# UDPT Final

## Overview

This project is a web application that includes a backend API built with Flask and a frontend built with React. The backend connects to a MySQL database running in a Docker container. The frontend uses Vite for development and is styled with Material-UI.

## Prerequisites

- Docker
- Python 3.9
- Node.js and Yarn

## Backend Setup

1. **Create a Virtual Environment:**

   ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install Dependencies:**

   ```sh
    pip install -r requirements.txt
   ```

3. **Environment Variables:**

   Create a `.env` file in the `backend` directory with the following content:

   ```sh
    FLASK_APP=run.py
    FLASK_ENV=development
    DATABASE_URI=mysql+pymysql://root:PublicationDB@localhost:3306/PublicationDB
   ```

4. **Run the Flask Application:**

   ```sh
    flask run
   ```

## Database Setup

1. **Build and Run the Docker Container for MySQL:**

   ```sh
    docker build -t mysql-udpt .
    docker run -d -p 3306:3306 --name mysql-udpt mysql-udpt
   ```

## Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```sh
   cd frontend
   ```

2. **Install Dependencies:**

   ```sh
   yarn install
   ```

3. **Run the Vite Development Server:**

   ```sh
   yarn dev
   ```

## Application

- Backend API: `http://127.0.0.1:5000`
- Frontend: `http://127.0.0.1:5173`
