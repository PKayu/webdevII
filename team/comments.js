const newComment = {
    name: hikeName,
    date: new Date(),
    content: comment
};

export default class Comment{
    getAllComments() {
        return newComment;
    }
}

