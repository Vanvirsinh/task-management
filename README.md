# Task Management API

This API provides endpoints for managing tasks with features like priority updates, voice calling reminders, and more.

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- Mongoose (MongoDB object modeling for Node.js)
- Twilio (for voice calling)
- Node-cron (scheduling cron jobs)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Twilio account and credentials

### Installation

1. Clone the repository:

git clone https://github.com/vanvirsinh/task-management.git

cd task-management-api

2. Download the dependencies

npm install

3. Create a .env file in the root directory and add the following:

MONGODB_URI=mongodb://localhost:27017/task-management
PORT=3000
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
MY_PHONE_NUMBER=your_twilio_phone_number

4. Start the application

npm start

### API Endpoints

#1. User Creation

POST api/create-user

#2. Task Management

POST api/create-task ==> Creat a new task
GET api/user-tasks ==> Fetch all tasks. Parameters such as **priority**, **due_date**, **page**, **limit**
PUT api/update-task/:task_id ==> Update the given task
DELETE api/delete-task/:task_id ==> Delete the given task. This includes soft deletion.

#3. Subtask Management

POST api/create-subtask/:task_id ==> Creat a new subtask
GET api/user-subtasks ==> Fetch all Subtasks. Parameters such as **task_id**
PUT api/update-subtask/:subtask_id ==> Update the given subtask
DELETE api/delete-subtask/:subtask_id ==> Delete the given subtask. This includes soft deletion.


Make sure to replace placeholder values with your actual configurations and customize the endpoints based on your API design. This is a basic template; you can expand and refine it based on your specific project structure and features.

