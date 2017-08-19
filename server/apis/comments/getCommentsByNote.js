/**
 * Created by fuweiping on 2017/7/26.
 */

//var async = require('async');
var CommentModel = require('../../models/comment');

module.exports = function (req, res) {
    let noteId = req.params.note_id;
    console.log('note_id:' + noteId);
    var CommentEntity = new CommentModel();

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

    //获取评论的回复
    function getCommentComments(comment) {
        return new Promise(function (resolve, reject) {
            CommentEntity.getComments({
                entity_id: comment._id,
                entity_type: 'comment'
            }, (err, commentComments) => {
                if(err) {
                    return res.status(500).send({"error": 'GET_COMMENT_ERROR'});
                }
                resolve(commentComments);
            });
        });
    }

    //赋值评论数组
    async function getAllComments() {
        let allComments = [];
        var noteComments = await getNoteComments();
        if(noteComments.length) {
            for(var i = 0; i < noteComments.length; i++) {
                var replies = await getCommentComments(noteComments[i]._doc);
                let newComment = Object.assign({}, noteComments[i]._doc, {
                    replies: replies
                });
                console.log(newComment);
                allComments.push(newComment);
            }
            //console.log(allComments);
        }
        return allComments;
    }
    getAllComments().then(function (result) {
        return res.status(200).send(result);
    });
};
