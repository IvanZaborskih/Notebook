const notebookService = require('../services/notebook.service');

class NotebookController {
	async postNotebook(req, res) {
		try {
			const notebook = await notebookService.postNotebook(req.body);

			if (!notebook) {
				throw new Error;
			} else {
				return res.status(200).json(notebook);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async getAllNotebooks(req, res) {
		try {
			const notebooks = await notebookService.getAllNotebooks();

			if (!notebooks) {
				throw new Error;
			} else {
				return res.status(200).json(notebooks);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async getOneNotebook(req, res) {
		try {
			const notebook = await notebookService.getOneNotebook(req.params.id);

			if (!notebook) {
				throw new Error;
			} else {
				return res.status(200).json(notebook);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async updateNotebook(req, res) {
		try {
			const notebook = await notebookService.updateNotebook(req.params.id, req.body);

			if (!notebook) {
				throw new Error;
			} else {
				return res.status(200).json(notebook);
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async deleteNotebook(req, res) {
		try {
			const notebook = await notebookService.deleteNotebook(req.params.id);

			if (!notebook) {
				throw new Error;
			} else {
				return res.status(200).json('Notebook deleted!');
			}
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}
}

module.exports = new NotebookController();