const express = require('express');
const router = express.Router();
const { allUsers, newUser, singleUser, updateUser, deleteUser } = require('../controller/user')


router.get('/allUsers', allUsers)
router.post('/newUser', newUser)
router.get('/singleUser/:id', singleUser)
router.patch('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router
