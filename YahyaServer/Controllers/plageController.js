const db = require('../Models');
const Plage = db.Plage
// Function to create a new plage
const AddNewPlage = async (req, res) => {
    try {
        const plage = await db.plage.create(req.body);
        res.status(201).json(plage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all plages
const GetAllPlages = async (req, res) => {
    try {
        const plages = await Plage.findAll();
        res.status(200).json(plages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find a specific plage by ID
const GetPlageById = async (req, res) => {
    try {
        const plage = await Plage.findByPk(req.params.id);
        if (plage) {
            res.status(200).json(plage);
        } else {
            res.status(404).json({ error: 'Plage not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to update a specific plage by ID
const UpdatePlageById = async (req, res) => {
    try {
        const plage = await Plage.findByPk(req.params.id);
        if (plage) {
            await plage.update(req.body);
            res.status(200).json(plage);
        } else {
            res.status(404).json({ error: 'Plage not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific plage by ID
const DeletePlageById = async (req, res) => {
    try {
        const plage = await Plage.findByPk(req.params.id);
        if (plage) {
            await plage.destroy();
            res.status(200).json({ message: 'Plage deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plage not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    AddNewPlage,
    GetPlageById,
    GetAllPlages,
    UpdatePlageById,
    DeletePlageById
};