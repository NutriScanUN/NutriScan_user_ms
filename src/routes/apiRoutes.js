// apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Consultar usuario por ID
 *     description: Obtiene los datos de un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       example: "123456"
 *                     nombres:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     url_imagen:
 *                       type: string
 *                       example: ""
 *                     fecha_nacimiento:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           example: 1738042253
 *                         _nanoseconds:
 *                           type: integer
 *                           example: 117000000
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-15T12:00:00.000Z"
 *                     rol:
 *                       type: string
 *                       example: "usuario"
 *                     ajustes:
 *                       type: object
 *                       properties:
 *                         notificaciones:
 *                           type: boolean
 *                           example: true
 *                         tema:
 *                           type: string
 *                           example: "oscuro"
 *                     store:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 */
router.get('/users/:id', apiController.getUser); // Consultar usuario por ID

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               imagen:
 *                 type: string
 *                 description: URL de la imagen del usuario.
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario.
 *               rol:
 *                 type: string
 *                 description: Rol del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 */
router.post('/users', apiController.createUser); // Crear un usuario

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Editar usuario por ID
 *     description: Actualiza los datos de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               rol:
 *                 type: string
 *                 description: Rol del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 */
router.put('/users/:id', apiController.updateUser); // Editar usuario por ID

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     description: Elimina un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 */
router.delete('/users/:id', apiController.deleteUser); // Eliminar usuario por ID

/**
 * @swagger
 * /users/check/{id}:
 *   get:
 *     summary: Verificar si el usuario está registrado
 *     description: Comprueba si un usuario con un ID específico está registrado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario verificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registrado:
 *                   type: boolean
 *                   description: Indica si el usuario está registrado.
 */
router.get('/users/check/:id', apiController.isUserRegistered); // Verificar si el usuario está registrado

module.exports = router;
