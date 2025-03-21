


# Adapt AI - Backend Setup

This guide provides step-by-step instructions to set up and run the Flask backend for Adapt AI.

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- **Python** (>=3.8)
- **pip** (Python package manager)
- **Virtual Environment (venv)**
- **Neo4j** (if required for database integration)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/adapt-ai.git
cd adapt-ai
```

### 2. Switch to Backend Branch

```bash
git checkout backend
```

### 3. Create and Activate a Virtual Environment

#### Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

#### macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Set Up Environment Variables

Create a `.env` file in the root directory and add the required environment variables:

```ini
FLASK_APP=app.py
FLASK_ENV=development
OPENAI_SECRET_KEY=your_secret_key
NEO4J_URI=your_neo4j_connection_string
NEO4J_USER=your_neo4j_username
NEO4J_PASSWORD=your_neo4j_password (FOR CLINIC) 
NEO4J_URI2=your_neo4j_connection_string
NEO4J_PASSWORD2=your_neo4j_password (FOR RESTAURANT)
```

*(Update the values as needed.)*

### 6. Run the Flask Server

```bash
flask run
```

By default, the server will start at `http://127.0.0.1:5000/`.

If you need to run the app using `python -m flask`:

```bash
python -m flask run
```

---

## API Endpoints

| Method | Endpoint         | Description                          |
|--------|----------------- |------------------------------        |
| GET    | `/`              | Health check endpoint                |
| POST   | `/chatdoctor`    | uses the neo4j graph of clinic       |
| POST   | `/chatrestaurant`| uses the neo4j graph of restaurnant  |

---

## Notes

- Ensure Neo4j is running before starting the backend if it is required.
- Keep your `.env` file secure and do not expose credentials in public repositories.
- To deactivate the virtual environment, run:

  ```bash
  deactivate  # On macOS/Linux
  .venv\Scripts\deactivate  # On Windows
  ```

---

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

```

Let me know if you need modifications! 🚀
