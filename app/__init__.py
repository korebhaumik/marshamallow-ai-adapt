import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)





# Import other controllers (if needed)
from app.controllers import home_controller


