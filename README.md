MindMapAI – AI-Powered Visual Knowledge Mapper
Overview

MindMapAI is an intelligent tool designed to help learners, researchers, and professionals manage, explore, and understand large volumes of unstructured information. By transforming plain text, notes, or documents into interactive mind maps, it visualizes relationships between concepts, enabling better comprehension, retention, and exploration of complex topics.

With the integration of generative AI (Gemini API) and modern web technologies, MindMapAI turns static text into dynamic, navigable knowledge networks, bridging the gap between raw information and structured understanding.

Features

Text & Document Input: Upload notes, paste text, or convert PDFs into analyzable content.

AI-Powered Mind Map Generation: Automatically extracts key concepts and their relationships to create an interactive map.

Node Details & Expansion: Click on nodes to view summaries, references, related ideas, and context-aware explanations.

Learning Support: Generates flashcards and quiz questions from nodes for active recall and revision.

Export & Share: Download mind maps as PNG images or JSON files for sharing or future use.

Optional RAG Integration: Enrich nodes with relevant external data from Wikipedia or uploaded documents.

How It Works

Frontend:

Built with React.js, providing a responsive and modular interface.

Features pages for note uploads, mind map viewing (via React Flow or D3.js), and node details.

Handles user interactions and communicates with the backend via Axios or fetch APIs.

Backend:

Node.js + Express.js API server processes requests from the frontend.

Preprocesses text input and postprocesses AI outputs into a structured node-edge format.

Handles authentication, CORS, and secure communication with the Gemini AI API.

AI Layer – Gemini API:

Extracts entities (concepts) and their relationships from the input text.

Generates JSON-based knowledge graphs, summaries, quizzes, and related ideas.

Optional Retrieval-Augmented Generation (RAG) fetches additional context from external sources.

Database – MongoDB:

Stores user profiles, session data, and generated mind maps.

Maintains node metadata, summaries, and quiz information for retrieval and reusability.

Tech Stack

Frontend: React.js, React Flow / D3.js, Tailwind CSS / Material UI

Backend: Node.js, Express.js

AI: Gemini API (Generative AI for concept extraction and summarization)

Database: MongoDB

Communication: Axios / Fetch APIs

Optional Integrations: Wikipedia API or custom document sources for RAG

Benefits

Visualizes complex topics as interactive concept maps.

Enhances understanding and knowledge retention.

Facilitates exploration of relationships between ideas.

Supports active learning with quizzes and summaries.

Enables sharing and exporting of mind maps for collaboration.

Future Scope

Support for keyword-based topic generation.

Integration with more external data sources for enriched context.

Collaborative mind mapping with real-time multi-user editing.

Mobile-friendly interface and offline support.

Getting Started

Clone the repository:
git clone <repository-url>

Install dependencies for frontend and backend:
npm install (in both directories)

Configure environment variables for Gemini API and MongoDB connection.

Run the backend server:
npm run start

Run the frontend app:
npm run start

Open your browser at http://localhost:3000 and start creating AI-generated mind maps.

License

This project is licensed under the MIT License.
