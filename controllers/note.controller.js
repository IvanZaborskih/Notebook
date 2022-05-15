const noteService = require('../services/note.service');

class NoteController {
	async postNote(req, res) {
		try {
			const note = await noteService.postNote(req.body);

			if (!note) {
				throw new Error;
			} else {
				return res.status(200).json(note);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async getAllNotes(req, res) {
		try {
			const notes = await noteService.getAllNotes();

			if (!notes) {
				throw new Error;
			} else {
				return res.status(200).json(notes);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async getOneNote(req, res) {
		try {
			const note = await noteService.getOneNote(req.params.id);

			if (!note) {
				throw new Error;
			} else {
				return res.status(200).json(note);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async updateNote(req, res) {
		try {
			const note = await noteService.updateNote(req.params.id, req.body);

			if (!note) {
				throw new Error;
			} else {
				return res.status(200).json(note);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async deleteNote(req, res) {
		try {
			const note = await noteService.deleteNote(req.params.id);

			if (!note) {
				throw new Error;
			} else {
				return res.status(200).json('Note deleted!');
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}
}

module.exports = new NoteController();