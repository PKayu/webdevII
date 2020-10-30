const commentList = [
    {
        name: 'Belcher Falls',
        date: new Date(),
        content: 'This is a test'
    },
    {
        name: 'Belcher Falls',
        date: new Date(),
        content: 'This is a test too'
    }

];


export default class Comment{
    getAllComments() {
        return newComment;
    }
    storeComment(commentValue){
        window.localStorage.setItem(comment, commentValue);

    }

    renderCommentList(parent, comments) {
        comments.forEach(comment => {
            parent.appendChild(renderOneComment(comment));
        });
    }

    renderOneComment(comment) {
        const item = document.createElement('li');
        item.innerHTML = ` <h2>${comment.name}</h2>
<div>
        <p>${comment.content}</p>
   
</div>`;

        return item;
    }


}


