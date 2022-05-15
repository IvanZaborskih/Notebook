const { User, Notebook, Note } = require('../models/index');

class NoteService {
	async postNote(noteBody) {
		const { user_id, title, text, is_important, notebook_id } = noteBody;

		const note = await Note.create({ title, text, is_important, user_id, notebook_id });

		if (!note) {
			return false;
		} else {
			return note;
		}
	}

	async getAllNotes() {
		const notes = await Note.findAll();

		if (!notes) {
			return false;
		} else {
			return notes;
		}
	}

	async getOneNote(noteId) {
		const note = await Note.findOne({
			where: { id: noteId }
		});

		if (!note) {
			return false;
		} else {
			return note;
		}
	}

	async updateNote(noteId, noteBody) {
		const { title, text, is_important } = noteBody;
		const note = await Note.update(
			{ title, text, is_important },
			{ where: { id: noteId } }
		);

		if (!note) {
			return false;
		} else {
			return await Note.findByPk(noteId);
		}
	}

	async deleteNote(noteId) {
		const note = await Note.destroy({ where: { id: noteId } });

		if (!note) {
			return false;
		} else {
			return note;
		}
	}
}

module.exports = new NoteService();