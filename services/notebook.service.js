const { User, Notebook, Note } = require('../models/index');

class NotebookService {
	async postNotebook(notebookBody) {
		const { user_id, title } = notebookBody;

		const notebook = await Notebook.create({ title, user_id });

		if (!notebook) {
			return false;
		} else {
			return notebook;
		}
	}

	async getAllNotebooks() {
		const notebooks = await Notebook.findAll({ include: ['user'] });

		if (!notebooks) {
			return false;
		} else {
			return notebooks;
		}
	}

	async getOneNotebook(notebookId) {
		const notebook = await Notebook.findOne({
			where: { id: notebookId },
			include: [
				{ model: Note, as: 'notes' }
			]
		});

		if (!notebook) {
			return false;
		} else {
			return notebook;
		}
	}

	async updateNotebook(notebookId, notebookBody) {
		const { title } = notebookBody;
		const notebook = await Notebook.update(
			{ title },
			{ where: { id: notebookId } }
		);

		if (!notebook) {
			return false;
		} else {
			return await Notebook.findByPk(notebookId);
		}
	}

	async deleteNotebook(notebookId) {
		const notebook = await Notebook.destroy({ where: { id: notebookId } });

		if (!notebook) {
			return false;
		} else {
			return notebook;
		}
	}
}

module.exports = new NotebookService();