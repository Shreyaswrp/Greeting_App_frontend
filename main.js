const postsLists = document.querySelector('.posts-list');
let output ='';

const url = 'http://localhost:4000/find-greetings';

//Get: Read the greetings
//Method : Get

fetch(url)
.then(res => res.json() )
.then(result => result.data)
.then(data => {
    data.forEach(post =>{
        output += `
        <div class="card mt-4 col-md-3 bg-light">
        <div class="card-body">
          <h6 class="card-title">${post._id}</h6>
          <h6 class="card-title">${post.greeting}</h6>
          <h6 class="card-title">${post.firstName +' '+post.lastName}</h6>
          <a href="#" class="card-link ml-4">Edit</a>
          <a href="#" class="card-link mr-2">Delete</a>
        </div>
      </div>`;
    })
    postsLists.innerHTML = output;
});



