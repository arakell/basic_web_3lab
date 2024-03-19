class script {
    constructor() {
        this.bindButton();
        this.fetchComments(); 
    }

    sendComment() {
        const author = encodeURIComponent(document.getElementById('authorInput').value);
        const comment = encodeURIComponent(document.getElementById('commentInput').value);

        const url = `http://localhost:3000/api/postcomment?login=${author}&comment=${comment}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при отправке комментария');
                }
                console.log('Комментарий успешно отправлен');
                this.fetchComments(); 
                document.getElementById('commentInput').value = '';
            })
            .catch(error => {
                console.error('Ошибка:', error.message);
            });
    }

    bindButton() {
        const button = document.getElementById('button');
        button.addEventListener('click', () => this.sendComment());
    }

    fetchComments() {
        fetch('http://localhost:3000/api/comments')
            .then(response => response.json())
            .then(comments => {
                const commentsList = document.getElementById("comments-list");
                commentsList.innerHTML = ''; 
                comments.forEach(comment => {
                    const commentElement = document.createElement("div");
                    commentElement.classList.add('comment');
                    commentElement.textContent = `${comment.name}: ${comment.comment}`;
                    commentsList.appendChild(commentElement);
                });
            })
            .catch(error => console.error("Ошибка загрузки комментариев: ", error));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const scriptInstance = new script();
});