# API Endpoints Summary

This document summarizes all available endpoints for the application, categorized by resource.

---

## 🔐 1. AUTH ROUTES

| Method | Endpoint | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | None |
| `POST` | `/api/auth/login` | Login user and get a JWT token | None |

---

## 🗂️ 2. FOLDER ROUTES

**Authentication Requirement:** All routes require a JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Input (JSON) | Output (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/folders` | Create a new folder | `{"title": "AI Research Notes"}` | `{"_id": "...", "title": "...", "userId": "..."}` |
| `GET` | `/api/folders` | Get all folders for the logged-in user | None | `[{"_id": "...", "title": "..."}, ...]` |
| `GET` | `/api/folders/:id` | Get a single folder by ID | None | `{"_id": "...", "title": "..."}` |
| `PUT` | `/api/folders/:id` | Update folder name | `{"title": "Updated Folder Name"}` | `{"_id": "...", "title": "Updated Folder Name"}` |
| `DELETE` | `/api/folders/:id` | Delete a folder | None | `{"message": "Folder deleted successfully"}` |

---

## 📝 3. NOTE ROUTES

**Authentication Requirement:** All routes require a JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Input (JSON) | Output (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/notes/:folderId` | Create a new note under a folder | `{"title": "...", "content": "..."}` | `{"_id": "...", "folderId": "...", "title": "...", "content": "..."}` |
| `GET` | `/api/notes/:folderId` | Get all notes inside a specific folder | None | `[{"_id": "...", "title": "...", "content": "..."}, ...]` |
| `GET` | `/api/notes/single/:id` | Get a single note by ID | None | `{"_id": "...", "title": "...", "content": "..."}` |
| `PUT` | `/api/notes/:id` | Update note title/content | `{"title": "...", "content": "..."}` | `{"_id": "...", "title": "...", "content": "..."}` |
| `DELETE` | `/api/notes/:id` | Delete a note | None | `{"message": "Note deleted successfully"}` |

---

## 🤖 4. AI SUMMARY ROUTES

**Authentication Requirement:** Requires a JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Input | Output (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/notes/:id/summary` | Generate an AI summary for a note (uses Google Studio AI API) | None | `{"noteId": "...", "summary": {"heading": "...", "body": "...", "keyPoints": ["...", "..."]}}` |

---

## 🧩 5. NODE ROUTES

**Authentication Requirement:** All routes require a JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Input (JSON) | Output (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/nodes/:noteId` | Create nodes (key points) for a note based on its summary | None | `[{"_id": "...", "noteId": "...", "title": "...", "snippet": "..."}, ...]` |
| `GET` | `/api/nodes/:noteId` | Get all nodes for a note | None | `[{"_id": "...", "noteId": "...", "title": "...", "snippet": "..."}, ...]` |
| `PUT` | `/api/nodes/:id` | Update a node | `{"title": "...", "snippet": "..."}` | `{"_id": "...", "title": "...", "snippet": "..."}` |
| `DELETE` | `/api/nodes/:id` | Delete a node | None | `{"message": "Node deleted successfully"}` |

---

## ⏰ 6. TASK SCHEDULER ROUTES

**Authentication Requirement:** All routes require a JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Input (JSON) | Output (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task | `{"title": "...", "description": "...", "startTime": "...", "endTime": "..."}` | `{"_id": "...", "title": "...", "description": "...", "startTime": "...", "endTime": "..."}` |
| `GET` | `/api/tasks` | Get all tasks for the logged-in user | None | `[{"_id": "...", "title": "...", "description": "..."}, ...]` |
| `GET` | `/api/tasks/:id` | Get one task by ID | None | `{"_id": "...", "title": "...", "description": "..."}` |
| `PUT` | `/api/tasks/:id` | Update a task | `{"title": "...", "description": "...", "endTime": "..."}` | `{"_id": "...", "title": "...", "description": "..."}` |
| `DELETE` | `/api/tasks/:id` | Delete a task | None | `{"message": "Task deleted successfully"}` |
