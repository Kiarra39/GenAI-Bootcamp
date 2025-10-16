const axios = require('axios');
const Note = require('../models/noteModel');
const Node = require('../models/nodeModel');

const generateNoteSummary = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.summary && !note.isModified) {
      return res.status(200).json(note.summary);
    }

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GOOGLE_AI_API_KEY,
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
${note.content}`
              }
            ]
          }
        ]
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

    const summary = {
      heading: `Summary of ${note.title}`,
      body: aiText,
      importantPoints: [],
    };

    note.summary = summary;
    note.isModified = false;
    await note.save();

    res.status(200).json(summary);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating summary', error: error.message });
  }
};

const generateNoteNodes = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    if (!note || !note.summary) {
      return res.status(404).json({ message: 'Note or summary not found' });
    }

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GOOGLE_AI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `Based on this summary, create small learning nodes with short titles and one-line info for each point.
Return as JSON list with "title" and "info" fields.

Summary:
${note.summary.body}`
              }
            ]
          }
        ]
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

    const node = await Node.create({
      noteId: note._id,
      content: aiText,
    });

    res.status(200).json({
      message: 'Nodes generated successfully',
      data: node,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating nodes', error: error.message });
  }
};

module.exports = { generateNoteSummary, generateNoteNodes };

