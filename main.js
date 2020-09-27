const postsLists = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const url = 'http://localhost:4000/find-greetings';
const urlForCreate = 'http://localhost:4000/create-greeting';
const urlForEdit = 'http://localhost:4000/update-greeting';

let firstnamevalue = document.getElementById('firstName-value');
let lastnamevalue = document.getElementById('lastName-value');
let greetingvalue = document.getElementById('greeting-value');

let output ='';

function getFirstName(val) {
  firstnamevalue = val;
}

function getLastName(val) {
  lastnamevalue = val;
}

function getGreeting(val) {
  greetingvalue = val;
}

const renderPost = (posts) => {
  /*posts.forEach(post =>{
    output += `<div class="card mt-4 col-md-3 bg-ligt" >
    <div class="card-body" data-id=${post._id}>
      <h6 class="card-title">${post._id}</h6>
      <h6 class="card-title">${post.firstName +' ' +post.lastName}</h6>
      <h6 class="card-title">${post.greeting}</h6>
      <h6 class="card-title">${post.createdAt}</h6>
      <a href="#" class="card-link" id="EditForm" onclick="editGreeting()">Edit</a>
      <a href="#" class="card-link" id="DeleteForm" onclick="deleteGreeting()">Delete</a>
    </div>
  </div>`;
});
*/

posts.map((post,index) =>{
  output += `<div class="card mt-4 col-md-3 bg-ligt" >
  <div class="card-body" data-id=${post._id}>
    <h6 class="card-title">${post._id}</h6>
    <h6 class="card-title">${post.firstName +' ' +post.lastName}</h6>
    <h6 class="card-title">${post.greeting}</h6>
    <h6 class="card-title">${post.createdAt}</h6>
    <a href="#" class="card-link" id="EditForm" onclick="editGreeting()">Edit</a>
    <a href="#" class="card-link" id="DeleteForm" onclick="deleteGreeting()">Delete</a>
  </div>
</div>`;
});

postsLists.innerHTML = output;
}

postsLists.addEventListener('click', (e) => {
  console.log('9999');
  e.preventDefault();
  let varas = e.target.id == 'EditForm';
  console.log(e.currentTarget.parentEl);
})

//Get: Read the greetings
//Method : Get

fetch(url)
.then(res => res.json() )
.then(result => result.data)
.then(data => renderPost(data));

// Create -Insert new greeting
// Method: POST

function addGreetings(){
  fetch(urlForCreate, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstnamevalue,
      lastName: lastnamevalue,
      greeting: greetingvalue 
    })
    }).then(data => {

        closeForm();
      
      fetch(url)
        .then(res => res.json() )
        .then(result => result.data)
        .then(data => renderPost(data));
    }) 
    .catch(err => { 
      console.log(err);
    })
}

function getFormInPopup() {
  document.getElementById('addForm').style.display = "block";
}

function closeForm() {
  document.getElementById('addForm').style.display = "none";
}

//Edit a greeting
//Method: Put

function editGreeting(id) {
console.log(document.getElementById('EditForm').getAttribute('data-id.id'));
fetch(`${urlForEdit}/${id}`)
.then()

}

//Delete a greeting
//Method: Delete

function deleteGreeting(id){
  console.log('delete');

}