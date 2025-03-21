
from flask import Flask, request, jsonify
from app.services import graphRAGservices
from app.services import graphRAGrestaurant
from app import app
import json

@app.route('/', methods=['GET'])
def home_controller():
    return jsonify({
        "message" : "running...",
        "code" : 200
    }), 200


@app.route('/chatdoctor', methods=['POST'])
def chat_controller():
    """Processes the last user query and returns an answer."""
    messages  = request.get_json()
    data = messages['messages']

    # Ensure data is a list and not empty
    if isinstance(data, list) and len(data) > 0:
        last_entry = data[-1]  # Get the last element in the array
        content_str = last_entry.get("content", "")

        try:
            # Parse content string into a dictionary
            content_dict = json.loads(content_str)
            user_input = content_dict.get("input", "")
            file_content = content_dict.get("file", "")
            print(user_input)
        except json.JSONDecodeError:
            return "Invalid JSON format in content"

        if not user_input:
            return "Invalid input"

        # Process the last query
        answer = graphRAGservices.answer(user_input)
        return answer

    return "Invalid request"



@app.route('/chatrestaurant', methods=['POST'])
def chat_controller_restaurant():
    """Processes the last user query and returns an answer."""
    messages  = request.get_json()
    data = messages['messages']

    # Ensure data is a list and not empty
    if isinstance(data, list) and len(data) > 0:
        last_entry = data[-1]  # Get the last element in the array
        content_str = last_entry.get("content", "")

        try:
            # Parse content string into a dictionary
            content_dict = json.loads(content_str)
            user_input = content_dict.get("input", "")
            file_content = content_dict.get("file", "")
            print(user_input)
        except json.JSONDecodeError:
            return "Invalid JSON format in content"

        if not user_input:
            return "Invalid input"

        # Process the last query
        answer = graphRAGrestaurant.answer(user_input)
        return answer

    return "Invalid request"