// apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: ID único del usuario.
 *           example: "123456"
 *         nombres:
 *           type: string
 *           description: Nombre completo del usuario.
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *           example: "juan.perez@example.com"
 *         url_imagen:
 *           type: string
 *           description: URL de la imagen de perfil del usuario.
 *           example: ""
 *         fecha_nacimiento:
 *           type: object
 *           properties:
 *             seconds:
 *               type: integer
 *               example: 1738042253
 *             nanoseconds:
 *               type: integer
 *               example: 117000000
 *         fecha_registro:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro del usuario.
 *           example: "2025-01-15T12:00:00.000Z"
 *         rol:
 *           type: string
 *           description: Rol del usuario.
 *           example: "usuario"
 *         ajustes:
 *           type: object
 *           properties:
 *             notificaciones:
 *               type: boolean
 *               example: true
 *             tema:
 *               type: string
 *               example: "oscuro"
 */

/**
 * @swagger
 * /users/{uid}:
 *   get:
 *     summary: Obtiene un usuario por UID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
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
 *                       example: "Juan Andres C"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *                     url_imagen:
 *                       type: string
 *                       example: ""
 *                     fecha_nacimiento:
 *                       type: object
 *                       description: Fecha de nacimiento en formato TimeStamp de Firebase.
 *                       properties:
 *                         seconds:
 *                           type: integer
 *                           example: 1738123242
 *                         nanoseconds:
 *                           type: integer
 *                           example: 927000000
 *                     fecha_registro:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de registro en formato ISO 8601.
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
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error"
 */
router.get('/users/:id', apiController.getUser); // Consultar usuario por ID

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: Identificador único del usuario.
 *                 example: "123456"
 *               nombres:
 *                 type: string
 *                 description: Nombres del usuario.
 *                 example: "Juan Andres C"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan.perez@example.com"
 *               url_imagen:
 *                 type: string
 *                 description: URL de la imagen del usuario.
 *                 example: ""
 *               fecha_nacimiento:
 *                 type: string
 *                 description: Fecha de nacimiento en formato TimeStamp de Firebase.
 *                 example: "Wed Jan 15 2002 07:00:00 GMT-0500 (Colombia Standard Time)"
 *               fecha_registro:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de registro en formato ISO 8601.
 *                 example: "Wed Jan 15 2025 07:00:00 GMT-0500 (Colombia Standard Time)"
 *               rol:
 *                 type: string
 *                 description: Rol del usuario.
 *                 example: "usuario"
 *               ajustes:
 *                 type: object
 *                 description: Configuraciones del usuario.
 *                 properties:
 *                   notificaciones:
 *                     type: boolean
 *                     example: true
 *                   tema:
 *                     type: string
 *                     example: "oscuro"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuario creado con éxito."
 *       400:
 *         description: Error al crear el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al crear el usuario."
 */
router.post('/users', apiController.createUser); // Crear un usuario

/**
 * @swagger
 * /users/{uid}:
 *   put:
 *     summary: Actualiza un usuario existente.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 description: Nombres del usuario.
 *                 example: "Juan Andres C"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: "juan.perez@example.com"
 *               url_imagen:
 *                 type: string
 *                 description: URL de la imagen del usuario.
 *                 example: ""
 *               fecha_nacimiento:
 *                 type: object
 *                 description: Fecha de nacimiento en formato TimeStamp de Firebase.
 *                 properties:
 *                   _seconds:
 *                     type: integer
 *                     example: 1738123242
 *                   nanoseconds:
 *                     type: integer
 *                     example: 927000000
 *               ajustes:
 *                 type: object
 *                 description: Configuraciones del usuario.
 *                 properties:
 *                   notificaciones:
 *                     type: boolean
 *                     example: true
 *                   tema:
 *                     type: string
 *                     example: "oscuro"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Document updated successfully"
 *       400:
 *         description: Error al actualizar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el usuario."
 */
router.put('/users/:id', apiController.updateUser); // Editar usuario por ID

/**
 * @swagger
 * /users/{uid}:
 *   delete:
 *     summary: Elimina un usuario por UID.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/users/:id', apiController.deleteUser); // Eliminar usuario por ID

/**
 * @swagger
 * /users/check/{id}:
 *   get:
 *     summary: Verifica si un usuario existe por id.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario.
 *     responses:
 *       200:
 *         description: Resultado de la verificación de existencia del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 */
router.get('/users/check/:id', apiController.isUserRegistered); // Verificar si el usuario está registrado

module.exports = router;
