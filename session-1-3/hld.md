AHigh-Level Design (HLD)

1. Project Title : MindMapAI 

2. Team Members : 
* Alen Lajeesh
* Albert Abraham
* Danushri Prakash
* Hemasri Suresh
* Kiesha Maria

3. Problem Statement: 
Learners, researchers, and professionals often struggle to organize large amounts of unstructured information (notes, research papers, or study material) into a form that’s easy to understand and remember.
Traditional note-taking tools are linear and text-heavy, making it difficult to visualize relationships between ideas.

MindMapAI solves this by using Generative AI to convert raw text into an interactive, intelligent mind map — turning information into visually connected knowledge networks.


4. Core Components
UI : 
* Simple web interface (HTML, CSS, JavaScript)
* User can upload files or type notes
* Output is shown as a mind map using a lightweight library (like GoJS, Mermaid.js, or vis.js)

LLM API : gemini 

Tools : 
* Frontend: HTML, CSS, JavaScript
* Backend: Python with Flask (optional — can skip if directly using API calls)
* Libraries:
	- fetch() in JS for API calls
	-D3.js or Mermaid.js for drawing the map
	-dotenv for storing API keys safely

 5. LLM’s Primary Task:

* Extract structured knowledge (concepts + relationships) from user input
* Generate JSON schema representing nodes and edges
* Summarize and enhance each node with relevant references or questions
* Support dynamic expansion when users click a node (context-aware knowledge expansion)

6. Inputs and Outputs
Input:

* User-provided text, PDF, or notes
* Optional: keywords or learning goal
* External knowledge (via RAG from Wikipedia or documents)

Output:

* Interactive mind map (concepts as nodes, relationships as edges)
* Node details (summary, citations, related concepts, quiz questions)
* Exportable map (PNG, JSON, or shareable link)

7. Expected Outcome: 
* AI auto-generates a visual concept map from any knowledge source.
* Users can explore, summarize, and quiz themselves on topics visually.
* Enhances learning productivity, retention, and research clarity.
* Provides a unique, demo-ready AI visualization tool showcasing the power of structured reasoning and retrieval.

8. System Diagram:

            ┌───────────────────────────┐
            │        User UI (Web)      │
            │───────────────────────────│
            │ Upload Notes / PDFs       │
            │ Display Mind Map          │
            │ View Node Summaries       │
            └────────────┬──────────────┘
                         │
                         ▼
             ┌────────────────────────┐
             │     Backend Server     │
             │ (Flask / FastAPI API)  │
             ├────────────────────────┤
             │ Handles API Calls       │
             │ Pre/Post-Processing     │
             │ Function Calling Logic  │
             └──────────┬─────────────┘
                        │
                        ▼
        ┌────────────────────────────────┐
        │        LLM + RAG Engine        │
        │────────────────────────────────│
        │ Prompt Engineering Layer        │
        │ Concept & Relationship Extraction│
        │ Wikipedia / Docs Retrieval (RAG) │
        │ Node Summaries & Quiz Gen       │
        └────────────────────────────────┘
                        │
                        ▼
              ┌────────────────────┐
              │   Database Layer    │
              │ (MongoDB / Firebase)│
              │ Store Mind Maps     │
              │ User Sessions       │
              └────────────────────┘


GitHub Submission:
