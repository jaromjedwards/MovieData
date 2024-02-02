// routes/instructors.js
const express = require('express');
const router = express.Router();
const instructorsController = require('../controllers/instructors');

router.get('/', instructorsController.getAllInstructors);
router.get('/:id', instructorsController.getSingleInstructor);
router.post('/', instructorsController.createInstructor);
router.put('/:id', instructorsController.updateInstructor);
router.delete('/:id', instructorsController.deleteInstructor);

module.exports = router;
