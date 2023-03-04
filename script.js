const createPostBtn = document.getElementById('create-post-btn');
const postPopup = document.getElementById('post-popup');
const closeBtn = document.querySelector('.close-btn');
const publishBtn = document.getElementById('publish-btn');
const cancelBtn = document.getElementById('cancel-btn');
const postsContainer = document.getElementById('posts-container');
let postId = 0;

createPostBtn.addEventListener('click', function() {
  postPopup.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  postPopup.style.display = 'none';
});

cancelBtn.addEventListener('click', function() {
  postPopup.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == postPopup) {
    postPopup.style.display = 'none';
  }
});

publishBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  if (title && content) {
    const post = createPost(title, content);
    postsContainer.appendChild(post);
    postPopup.style.display = 'none';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  } else {
    alert('Please fill in both the title and content fields.');
  }
});

function createPost(title, content) {
  const post = document.createElement('div');
  post.classList.add('post');
  post.setAttribute('id', 'post-' + postId);
  postId++;
  const postTitle = document.createElement('h1');
  postTitle.textContent = title;
  const postContent = document.createElement('p');
  postContent.textContent = content;
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Post';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Post';
  const timestamp = document.createElement('span');
  timestamp.classList.add('post-timestamp');
  timestamp.textContent = 'Last Updated At : '+new Date().toLocaleString();
  const postButtons = document.createElement('div');
  postButtons.classList.add('post-buttons');
  postButtons.appendChild(editBtn);
  postButtons.appendChild(deleteBtn);
  post.appendChild(postTitle);
  post.appendChild(postContent);
  post.appendChild(postButtons);
  postButtons.appendChild(timestamp);

  editBtn.addEventListener('click', function() {
    editPost(post);
  });

  deleteBtn.addEventListener('click', function() {
    deletePost(post);
  });

  return post;
}

function editPost(post) {

  const postTitle = post.querySelector('h1').textContent;
  const postContent = post.querySelector('p').textContent;
  document.getElementById('title').value = postTitle;
  document.getElementById('content').value = postContent;
  post.remove();
  postPopup.style.display = 'block';
}

function deletePost(post) {
  post.remove();
}
