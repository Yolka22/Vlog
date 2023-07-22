const url = "https://jsonplaceholder.typicode.com/users";
const usersDOM = document.getElementById('users-container');

const load = async () => {

    usersDOM.innerHTML=""

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        users.forEach((element) => {
            const user = document.createElement('div');
                    user.className = "user";
                    user.innerHTML = `
                        <p>Name: ${element.name}</p>
                        <p>Username: ${element.username}</p>
                        <p>Email: ${element.email}</p>
                        <hr>
                    `;
                    user.onclick = () =>{
                        loadUserData(element.id)
                    }
                    usersDOM.appendChild(user);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

load();


const loadUserPosts = async (userId) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
  
      
      const userPosts = posts.filter(post => post.userId === userId);
  
      
      const userPostsUl = document.getElementById('user-posts');
      userPostsUl.innerHTML = '';
      userPosts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.onclick = () => {
            LoadComents(userId)
        }
        userPostsUl.appendChild(li);
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

const loadUserData = async (id) => {

    usersDOM.innerHTML=""

    try {
        const response = await fetch(url+'/'+id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const user = await response.json();
        

        const userDiv = document.createElement('div')

        userDiv.className = "userfullinfo";

        userDiv.innerHTML =`
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Catch Phrase:</strong> ${user.company.catchPhrase}</p>
        <p><strong>Business:</strong> ${user.company.bs}</p>
        <ul id="user-posts"></ul>
      `;
      usersDOM.appendChild(userDiv);
    } catch (error) {
        console.error('Fetch error:', error);
    }
    loadUserPosts(id);
}

const LoadComents  = async (userId) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await response.json();

        const Post = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`);
        const PostInfo = await Post.json();
        
        usersDOM.innerHTML=""
      
        const userComments = comments.filter(comment => comment.postId === userId);

        const ComentsDiv = document.createElement('div');
        ComentsDiv.className = 'userfullinfo'


        ComentsDiv.innerHTML =`
            <p>Title :${PostInfo.title}</p>
            <p>Body :${PostInfo.body}</p>
        `

        userComments.forEach(comment => {
            const p = document.createElement('p');
            p.textContent = comment.body;
            ComentsDiv.appendChild(p)
          });

          usersDOM.appendChild(ComentsDiv);
}

document.getElementById('Home').addEventListener('click',load);