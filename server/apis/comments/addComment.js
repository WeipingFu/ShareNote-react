/**
 * Created by fuweiping on 2017/7/26.
 */

var CommentModel = require('../../models/comment');
var NoteModel = require('../../models/note');

module.exports = function (req, res) {
    let user = req.username,
        content = req.body.content,
        entity_id = req.body.entity_id,
        entity_type = req.body.entity_type,
        to_user = req.body.to_user,
        note_id = req.body.note_id;

    var CommentEntity = new CommentModel(),
        NoteEntity = new NoteModel();

    function getComment() {                                 //检查评论是否已经存在
        return new Promise(function (resolve, reject) {
            CommentEntity.getOneComment({
                content: content,
                user: user,
                entity_id: entity_id,
                entity_type: entity_type,
                to_user: to_user
            }, (err, comment) => {
                if (err) {
                    return res.status(500).send({"error": 'GENERAL_ERROR'});
                }
                if (comment) {
                    return res.status(500).send({"error": 'COMMENT_EXIST'});
                }
                resolve();
            });
        });
    }

    function saveNewComment() {                           //保存评论
        return new Promise(function (resolve, reject) {
            let newComment = {
                content: content,
                time: Date.now(),
                user: user,
                entity_id: entity_id,
                entity_type: entity_type,
                to_user: to_user
            };
            console.log('add');
            console.log(newComment);
            CommentEntity.saveComment(newComment, err => {
                if(err) {
                    return res.status(500).send({"error": 'ADD_COMMENT_ERROR'});
                }
                resolve();
            });
        });
    }
    function getNote() {                               //检查笔记是否存在
        return new Promise(function (resolve, reject) {
            NoteEntity.getOneNote({
                _id: note_id
            }, (err, note) => {
                if (err) {
                    return res.status(500).send({"error": 'GENERAL_ERROR'});
                }
                if(!note) {
                    return res.status(404).send({"error": 'NOTE_NOT_EXIST'});
                }
                resolve();
            })
        });
    }
    function addCommentCount() {                     //更新笔记评论数
        return new Promise(function (resolve, reject) {
             NoteEntity.updateNote(note_id, {
                 $inc:{ commentCount: 1 }
             }, err => {
                 if(err) {
                     return res.status(500).send({"error": 'UPDATE_COMMENTCOUNT_ERROR'});
                 }
                 resolve();
             })
        });
    }

    async function addComment() {
        await getComment();
        await saveNewComment();
        await getNote();
        await addCommentCount();
    }

    addComment().then(function () {
       return res.status(200).send({"success": 'ADD_COMMENT_SUCCESS'});
    });
    /*
    CommentEntity.getOneComment({
        content: content,
        user: user,
        entity_id: entity_id,
        entity_type: entity_type,
        to_user: to_user
    }, (err, comment) => {
        if(err) {
            return res.status(500).send({"error": 'GENERAL_ERROR'});
        }
        if(comment) {
            return res.status(500).send({"error": 'COMMENT_EXIST'});
        }
        let newComment = {
            content: content,
            time: Date.now(),
            user: user,
            entity_id: entity_id,
            entity_type: entity_type,
            to_user: to_user
        };
        console.log('add');
        console.log(newComment);
        CommentEntity.saveComment(newComment, err => {
            if(err) {
                return res.status(500).send({"error": 'ADD_COMMENT_ERROR'});
            }
            return res.status(200).send({"success": 'ADD_COMMENT_SUCCESS'});
        });
    });
    */
};