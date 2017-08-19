/**
 * Created by fuweiping on 2017/7/26.
 */

var CommentModel = require('../../models/comment');

module.exports = function (req, res) {
    let commentId = req.params.comment_id;

    var CommentEntity = new CommentModel();
    CommentEntity.getComments({
        entity_id: commentId,
        entity_type: 'comment'
    }, (err, comments) => {
        if(err) {
            return res.status(500).send({"error": 'GET_COMMENT_ERROR'});
        }
        return res.status(200).send(comments);
    });
};