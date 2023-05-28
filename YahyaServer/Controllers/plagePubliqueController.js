const db = require('../Models');
const PlagePublique = db.PlagePublique
// Function to create a new plage publique
const AddPlagePublique = async (req, res) => {
    try {
        const plagePublique = await PlagePublique.create(req.body);
        res.status(201).json(plagePublique);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to find all plages publiques
const GetAllPlagesPubliques = async (req, res) => {
    try {
        const plagePublique = await db.sequelize.query(`SELECT * FROM plage_publique`);
        res.json(plagePublique[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to find a specific plage publique by ID
const GetPlagePubliqueById = async (req, res) => {
    const id_plage_publique = req.params.id
    try {
        const plagePublique = await db.sequelize.query(` SELECT ST_AsGeoJSON(surface_plage_publique) as geojson FROM plage_publique WHERE id_plage_publique = '${id_plage_publique}'`);
        const p1 = plagePublique[0]
        const p2 = p1[0].geojson
        const p3 = JSON.parse(p2)
        res.json(p3.coordinates[0]);
   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to update a specific plage publique by ID
const UpdatePlagePubliqueById = async (req, res) => {
    try {
        const plagePublique = await PlagePublique.findByPk(req.params.id);
        if (plagePublique) {
            await plagePublique.update(req.body);
            res.status(200).json(plagePublique);
        } else {
            res.status(404).json({ error: 'Plage publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Function to delete a specific plage publique by ID
const DeletePlagePubliqueById = async (req, res) => {
    try {
        const plagePublique = await PlagePublique.findByPk(req.params.id);
        if (plagePublique) {
            await plagePublique.destroy();
            res.status(200).json({ message: 'Plage publique deleted successfully' });
        } else {
            res.status(404).json({ error: 'Plage publique not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    AddPlagePublique,
    GetAllPlagesPubliques,
    GetPlagePubliqueById,
    UpdatePlagePubliqueById,
    DeletePlagePubliqueById
};