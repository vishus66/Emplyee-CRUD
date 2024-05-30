
# Employee Management App
This project is a simple Employee Management application built with Node.js and Express. It allows users to view, add, edit, and delete employee information.





## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
## Prerequisites
- Node.js and npm (or yarn) installed on your system
- A MongoDB database instance
## Setup Instructions
1. Clone this repository:
    Bash
    git clone https://your-github-repo-url.git
2. Install dependencies:

    - cd employee-management-app

    - npm install
3. Configure database connection:
    - Create a .env file in the project root directory.
    - Add your MongoDB connection string to the .env file with the key DB_CONNECT.
4. Start the application:
    - nodemon index.js,hbs
This will start the server on port 8000. You can access the application at http://localhost:8000 in your web browser
## Usage
### View Employees:
- The application will display a list of all employees on the homepage.
### Add Employee:
- Click on the "Add Employee" button to navigate to the add employee form. Fill out the form with employee details and submit it.
### Edit Employee:
- Click on the edit icon next to an employee on the list to navigate to the edit employee form. Edit the employee details and submit the form.
### Delete Employee: 
- Click on the delete icon next to an employee on the list to delete the employee.
## Contributing
Feel free to fork this repository and contribute your improvements!