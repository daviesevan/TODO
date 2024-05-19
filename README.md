# Flask x React Todo App

This is a full-stack web application built with Flask and React that allows users to create, read, update, and delete todo items. The backend is powered by Flask, a Python web framework, and the frontend is built with React, a popular JavaScript library for building user interfaces.

## Features

- User authentication (registration, login, and logout)
- Create new todo items
- View a list of existing todo items
- Update the status or description of a todo item
- Delete todo items
- JWT-based authentication for secure API access

## Technologies Used

### Backend

- Python
- Flask
- Flask-SQLAlchemy (for database management)
- Flask-JWT-Extended (for JWT authentication)
- Flask-Bcrypt (for password hashing)

### Frontend

- React
- React Router
- Axios (for making HTTP requests)

## Getting Started

### Prerequisites

- Python 3.12.x
- Node.js and npm (Node Package Manager)

### Installation

1. Clone the repository:

```
git clone https://github.com/daviesevan/TODO.git
```

2. Navigate to the project directory:

```
cd TODO
```

3. Install the backend dependencies:

```
pip install -r requirements.txt
```

4. Install the frontend dependencies:

```
cd client
npm install
```

5. Create a `.env` file in the root directory and add the required environment variables (e.g., `SECRET_KEY`, `SQLALCHEMY_DATABASE_URI`).

6. Run the Flask development server:

```
flask run --debug
```

7. In a separate terminal, start the React development server:

```
cd client
npm start
```

The app should now be running at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).