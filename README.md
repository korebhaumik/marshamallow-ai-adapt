
# Adapt AI - Graph Database Integration

## Overview

Adapt AI leverages advanced AI models and graph databases to provide accurate and context-aware responses to user queries. This system integrates Llama 3 and Neo4j to build and query graph databases, ensuring precise and relevant answers.

## Architecture

### Organization

1. **Usage Related Documents**: 
   - Drag and drop related files (e.g., restaurant menu, staff information, etc.).
   
2. **Llama 3**:
   - Extracts information from the uploaded documents.
   - Builds a graph database for any use case.

3. **Neo4j**:
   - Stores the extracted information in a graph database.

### Consumer

1. **User Query**:
   - Users interact with the system through a chat interface.

2. **Llama 3**:
   - Generates Cypher queries based on user prompts.
   - Sends the queries to Neo4j.

3. **Neo4j**:
   - Executes the Cypher queries.
   - Returns accurate answers based on the graph database.

4. **Llama 3**:
   - Processes the response from Neo4j.
   - Provides the final answer to the user.

## Features

- **Document Upload**: Easily upload documents to extract relevant information.
- **Graph Database**: Utilizes Neo4j for efficient data storage and querying.
- **AI Integration**: Llama 3 for advanced AI capabilities and query generation.
- **Accurate Responses**: Ensures precise answers by leveraging context from the graph database.

## Getting Started

### Prerequisites

- Node.js
- Neo4j
- Llama 3

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/adapt-ai.git
   cd adapt-ai