const newComment = {
    name: 'Hikename',
    date: new Date(),
    content: 'comment'
};

export default class Comment{
    getAllComments() {
        return newComment;
    }
}

