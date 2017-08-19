/**
 * Created by fuweiping on 2017/7/11.
 */

var NoteModel = require('../../models/note');
var CommentModel = require('../../models/comment');

module.exports = function (req, res) {
    let noteId = req.params.note_id;

    console.log('server-deleteNote: ' + noteId);

    var NoteEntity = new NoteModel(),
        CommentEntity = new CommentModel();

    function getNoteById() {
        return new Promise(function (resolve, reject) {
            NoteEntity.getOneNote({
                _id: noteId
            }, (err, note) => {
                if (err) {
                    return res.status(500).send({"error": 'GENERAL_ERROR'});
                }
                if (!note) {
                    return res.status(404).send({"error": 'NOTE_NOT_EXIST'});
                }
                resolve();
            });
        });
    }

    //获取笔记评论
    function getNoteComments() {
        return new Promise(function (resolve, reject) {
            CommentEntity.getComments({
                entity_id: noteId,
                entity_type: 'note'
            }, (err, comments) => {
                if(err) {
                    return res.status(500).send({"error": 'GET_COMMENT_ERROR'});
                }
                resolve(comments);
            });
        });
    }

    //删除评论的回复
    function deleteCommentComments(comment) {
        return new Promise(function (resolve, reject) {
            CommentEntity.deleteComments({
                entity_id: comment._id,
                entity_type: 'comment'
            }, err => {
                if(err) {
                    return res.status(500).send({"error": 'DELETE_COMMENT_ERROR'});
                }
                resolve();
            });
        });
    }
    //删除笔记的评论
    function deleteNoteComments() {
        return new Promise(function (resolve, reject) {
            CommentEntity.deleteComments({
                entity_id: noteId,
                entity_type: 'note'
            }, err => {
                if(err) {
                    return res.status(500).send({"error": 'GET_COMMENT_ERROR'});
                }
                resolve();
            });
        });
    }
    //删除笔记
    function deleteNoteById() {
        return new Promise(function (resolve, reject) {
            NoteEntity.deleteNote({
                _id: noteId
            }, (err) => {
                if (err) {
                    return res.status(500).send({"error": 'DELETE_NOTE_ERROR'});
                }
                resolve();
            });
        });
    }
    async function deleteNote() {
        await getNoteById();
        var noteComments = await getNoteComments();
        for(var i = 0; i < noteComments.length; i++) {
            await deleteCommentComments(noteComments[i]._doc);
        }
        await deleteNoteComments();
        await deleteNoteById();
    }
    deleteNote().then(function () {
        return res.status(200).send({"success": 'DELETE_NOTE_SUCCESS'});
    });
    /*
    NoteEntity.getOneNote({
        _id: noteId
    }, (err, note) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        if(!note) {
            return res.status(404).send({"error": 'NOTE_NOT_EXIST'});
        }
        NoteEntity.deleteNote({
            _id: noteId
        }, (err) => {
            if(err) {
                return res.status(500).send({"error": 'DELETE_NOTE_ERROR'});
            }
            return res.status(200).send({"success": 'DELETE_NOTE_SUCCESS'});
        });
    });
    */
};