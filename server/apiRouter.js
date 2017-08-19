/**
 * Created by fuweiping on 2017/6/8.
 */

var express = require('express');
var path = require('path');
var register = require('./apis/users/register');
var login = require('./apis/users/login');

var addNote = require('./apis/notes/addNote');
var deleteNote = require('./apis/notes/deleteNote');
var deleteNotesByQuery = require('./apis/notes/deleteNotesByQuery');
var updateNote = require('./apis/notes/updateNote');
var getUserNotes = require('./apis/notes/getUserNotes');
var getNotes = require('./apis/notes/getNotes');

var getNotebooks = require('./apis/notebooks/getNotebooks');
var addNotebook = require('./apis/notebooks/addNotebook');
var deleteNotebook = require('./apis/notebooks/deleteNotebook');

var getCommentsByNote = require('./apis/comments/getCommentsByNote');
var addComment = require('./apis/comments/addComment');

var userAuth = require('./middleware/userAuth');

var router = express.Router();


router.get('/', function (req, res) {
   res.render('index', {title: '分享笔记'});
});
router.use('/auth', userAuth);

//users router
router.post('/users/register', register);
router.post('/users/login', login);
router.post('/auth/users/logout/:username', function (req, res) {
    res.status(200).send({"success": 'LOGOUT_SUCCESS'});
});
router.get('/auth/users/:username', function (req, res) {
    res.status(200).send({"success": 'CHECK_AUTH_SUCCESS'});
});

//notes router
router.get('/auth/notes/:username', getUserNotes);
router.post('/auth/notes/:username', addNote);
router.put('/auth/notes/:username/:note_id', updateNote);
router.delete('/auth/notes/:username/:note_id', deleteNote);
router.delete('/auth/notes/:username', deleteNotesByQuery);

router.get('/notes', getNotes);

router.get('/auth/notebooks/:username', getNotebooks);
router.post('/auth/notebooks/:username', addNotebook);
router.delete('/auth/notebooks/:username/:bookname', deleteNotebook);

router.get('/comments/:note_id', getCommentsByNote);
router.post('/auth/comments/:username', addComment);

/*
router.post('/register', register);
router.post('/login', login);
router.post('/auth/logout', function (req, res) {
   res.status(200).send({});
});

router.post('/auth/addNote', addNote);
router.post('/auth/deleteNote', deleteNote);
router.post('/auth/updateNote', updateNote);
router.get('/auth/getUserNotes', getUserNotes);
 */


module.exports = router;