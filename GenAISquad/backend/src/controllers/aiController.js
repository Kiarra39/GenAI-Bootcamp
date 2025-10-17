const axios = require('axios');
const Note = require('../models/Note');
const Node = require('../models/Node');

// Generate AI summary using Gemini API
const generateNoteSummary = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Avoid regeneration if recent summary exists
    if (
      note.aiSummary &&
      note.aiSummary.lastGeneratedAt &&
      new Date() - new Date(note.aiSummary.lastGeneratedAt) < 1000 * 60 * 60 * 24 * 7 // 7 days cache
    ) {
      return res.status(200).json({ summary: note.aiSummary, cached: true });
    }

    // Call Gemini API
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' +
        process.env.GOOGLE_AI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this note with clear sections:
- Heading
- Main body
- Important points (as bullet list)

Note content:
${note.content}`,
              },
            ],
          },
        ],
      }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';

    // Format AI summary structure
    const summary = {
      heading: `Summary of ${note.title}`,
      body: aiText,
      importantPoints: [],
      lastGeneratedAt: new Date(),
    };

    note.aiSummary = summary;
    await note.save();

    res.status(200).json({ summary, cached: false });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating summary', error: error.message });
  }
};

// Generate AI nodes from summary
const generateNoteNodes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note || !note.aiSummary || !note.aiSummary.body) {
      return res.status(404).json({ message: 'Note or summary not found' });
    }

    // Ask Gemini to create nodes
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' +
        process.env.GOOGLE_AI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `Based on this summary, create small learning nodes with short titles and one-line info for each point.
Return as JSON array like this:
[
  { "title": "Concept 1", "info": "Brief summary..." },
  { "title": "Concept 2", "info": "Brief summary..." }
]

Summary:
${note.aiSummary.body}`,
              },
            ],
          },
        ],
      }
    );

    let aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    let parsedNodes;

    try {
      parsedNodes = JSON.parse(aiText);
    } catch {
      parsedNodes = [{ title: 'Error parsing AI response', info: aiText }];
    }

    // Create Node documents for each generated node
    const createdNodes = await Node.insertMany(
      parsedNodes.map((n) => ({
        noteId: note._id,
        title: n.title,
        snippet: n.info,
      }))
    );

    res.status(200).json({
      message: 'Nodes generated successfully',
      data: createdNodes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating nodes', error: error.message });
  }
};

module.exports = { generateNoteSummary, generateNoteNodes };

