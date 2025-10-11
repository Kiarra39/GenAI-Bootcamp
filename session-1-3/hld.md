High-Level Design (HLD)

1. Project Title : MindMapAI 

    MindMapAI – AI-Powered Visual Knowledge Mapper

2. Team Members

    Alen Lajeesh, 
    Albert Abraham, 
    Danushri Prakash, 
    Hemasri Suresh, 
    Kiesha Maria, 

3. Problem Statement

    Learners, researchers, and professionals often find it hard to manage and understand large volumes of unstructured information — such as notes, documents, or research material.Traditional note-taking tools are linear and lack visualization, making it difficult to see relationships between ideas.MindMapAI solves this problem by using Generative AI (Gemini) to automatically convert plain text or documents into an interactive, dynamic mind map that visualizes the relationships between concepts.It transforms raw information into a visual knowledge network — enabling better understanding, retention, and exploration.

4. Core Components
    Frontend (React)
        Developed using React.js (for modular and interactive UI)

    Pages: 
        Upload/Notes Page, Mind Map Viewer, Node Detail Viewer

    Libraries:
        React Flow or D3.js for rendering the mind map
        Axios / Fetch for API communication
        Tailwind CSS / Material UI for responsive UI

    Features:
        Upload or paste notes/text
        Submit to AI for analysis
        View generated mind map
        Click a node to expand related concepts or summaries

    Backend (Express + Node.js)

    API server built using Express.js

    Responsibilities:
        Handle requests from frontend
        Communicate securely with Gemini API
        Preprocess input (clean text, extract keywords)
        Postprocess output (convert Gemini JSON → node-edge structure)
        Middleware for authentication and CORS handling

    LLM Layer – Gemini AI
        Gemini API handles the main AI logic:
            Extracts concepts and relationships from text
            Generates JSON schema for nodes and edges
            Creates summaries, quiz questions, and related ideas
            Optional RAG (Retrieval-Augmented Generation):
            Fetches relevant data from Wikipedia API or stored documents to enrich nodes

    Database Layer (MongoDB)
        Stores:
            User profiles and sessions
            Generated mind maps (in JSON format)
            Node summaries, history, and quiz data
            Enables reloading, sharing, or exporting previous mind maps

5. LLM’s Primary Task (Gemini API)

    Extract Knowledge Graph
    Identify entities (concepts) and their relationships
    Structure them in JSON: { nodes: [...], edges: [...] }
    Enhance Knowledge
    Add concise summaries and relevant details per node
    Suggest related ideas and sources (via RAG)
    Generate Learning Support
    Create flashcards or quiz questions from nodes
    Provide context-aware explanations when user expands a node

6. Inputs and Outputs
    Input:
        User-provided text, notes, or PDFs (converted to text)
        Optional keywords or topic goals
        (Future Scope) Integration with external sources like Wikipedia or uploaded documents

    Output:
        Interactive Mind Map (React Flow / D3.js)
        Nodes = key concepts
        Edges = conceptual relationships
        Node Details Panel
        Summaries, references, related questions
        Export options:
        PNG (image of map)
        JSON (for re-importing)
        Shareable link

    Automatically visualize any topic as an intelligent, AI-generated concept map
    Improve understanding and knowledge retention
    Enable interactive exploration of complex subjects
    Showcase the power of AI reasoning, visualization, and structured learning in one app

8. Updated System Diagram
```
┌──────────────────────────────┐
│        React UI (Web)        │
│──────────────────────────────│
│ Upload Notes / Text          │
│ Display Mind Map (ReactFlow) │
│ Node Details & Expansion     │
└────────────┬─────────────────┘
             │
             ▼
┌─────────────────────────────┐
│      Express.js Backend     │
│─────────────────────────────│ 
│ Handles API Requests        │
│ Pre/Post Processing         │
│ Routes to Gemini API        │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│          Gemini AI API          │
│──────────────────────────────── │
│ Concept & Relation Extraction   │
│ Summary & Quiz Generation       │
│ Optional RAG (Wikipedia / Docs) │
└─────────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│         MongoDB Database      │
│───────────────────────────────│
│ Store User Maps & Sessions    │
│ Save Node Data & Metadata     │
└───────────────────────────────┘
```
