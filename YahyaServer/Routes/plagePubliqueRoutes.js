const express = require('express');
const plagePubliqueController = require('../Controllers/plagePubliqueController')
const { AddPlagePublique,GetAllPlagesPubliques,GetPlagePubliqueById } = plagePubliqueController;
const router = express.Router();

router.post('/AddNewPlagePublique', AddPlagePublique);

 router.get('/GetAllPlagesPubliques', GetAllPlagesPubliques);
 router.get('/GetPlagePubliqueById/:id', GetPlagePubliqueById );
// router.get('/findPlagePubliqueById/:id', findPlagePubliqueById);

// router.put('/updatePlagePubliqueById/:id', updatePlagePubliqueById);

// router.delete('/deletePlagePubliqueById/:id', deletePlagePubliqueById);

module.exports = router;