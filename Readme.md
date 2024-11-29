# Full Stack Project with React, Redux, FastAPI, and PostgreSQL

## Introduction
This project is a full-stack web application that uses React and Redux for the frontend, and FastAPI for the backend with PostgreSQL as the database, managed using pgAdmin.
Note:- Api's are not deplyed on production ,can be tested using postman also the databse is running localy so install pgadmin in your local device then create a databse as named in the api and then use it (my local user and passsowrd - postgrey,sparsh123)

## ScreenShots

![Capture](https://github.com/user-attachments/assets/5c912aa2-1cba-4244-9571-65f9851b55a5)

![Capture1](https://github.com/user-attachments/assets/e8116bf2-c107-4152-954e-1a285043fc14)

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
root ├── backend │ ├── app │ │ ├── main.py│ │ ├── models.py│ │ └── ... │ ├── Dockerfile │ ├── requirements.txt│ └── ... ├── frontend │ ├── src │ │ ├── components │ │ ├── redux │ │ ├── App.js│ │ └── ... │ ├── public │ ├── package.json│ └── ... └── README.md


## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** and **npm** installed on your machine.
- **Python 3.7+** and **pip** installed.
- **PostgreSQL** database set up and running.
- **pgAdmin** for managing your database.

## Installation

### Clone the Repository
```sh
git clone https://github.com/your-username/your-repository.git
cd your-repository
Setting up the Backend
Navigate to the backend directory:

sh
cd backend
Create a virtual environment:

sh
python -m venv venv
Activate the virtual environment:

On Windows:

sh
venv\Scripts\activate
On macOS/Linux:

sh
source venv/bin/activate
Install the required packages:

sh
pip install -r requirements.txt
Set up the PostgreSQL database and update the DATABASE_URL in your environment variables.

Setting up the Frontend
Navigate to the frontend directory:

sh
cd ../frontend
Install the required packages:

sh
npm install
Running the Application
Start the Backend Server
Navigate to the backend directory (if not already):

sh
cd backend
Run the FastAPI server:

sh
uvicorn app.main:app --reload
Start the Frontend Server
Navigate to the frontend directory (if not already):

sh
cd ../frontend
Start the React app:

sh
npm start
Contributing
Contributions are welcome! Please fork this repository and open a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.


Feel free to customize this README file to better fit your specific project 
