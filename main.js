const listButton = document.querySelector('.load-greetings');
const postsLists = document.querySelector('.posts-list');

const URL = 'http://localhost:4000/';

let id = ' ';

const renderPost = (posts) => {
  let output = '';
  posts.forEach(post =>{
    output += `<div class="card mt-4 col-md-3 bg-ligt" >
    <div class="card-body">
      <div class="ObjectId card-p">${post._id}</div>
      <div class="name-on-card card-p">${post.firstName +' ' +post.lastName}</div>
      <div class="Greeting card-p">${post.greeting}</div>
      <div mt -0 class="CreatedAt card-p">${post.createdAt}</div>
      <span class="card-link fa fa-pencil-square-o edit-delete-button" id="EditForm"></span>
      <span class="card-link fa fa-trash edit-delete-button" id="DeleteForm"></span>
    </div>
  </div>`;
});
postsLists.innerHTML = output;
}

//To load all the greetings
function loadAllTheGreetings(){
  fetch(`${URL}find-greetings`)
  .then(res => res.json() )
  .then(result => result.data)
  .then(data => renderPost(data))
}

listButton.addEventListener('click', function() {
  loadAllTheGreetings();
})

loadAllTheGreetings();

// Create -Insert new greeting
function addGreetings(){
  fetch(`${URL}create-greeting`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: document.querySelector(".firstName").value,
      lastName: document.querySelector(".lastName").value,
      greeting: document.querySelector(".greeting").value 
    })
    }).then(data => {
       closeForm();
    }) 
    .catch(err => { 
      console.log(err);
    })
    location.reload();
}

postsLists.addEventListener('click', (e) => {
  e.preventDefault();
  let deleteButtonPressed = e.target.id == 'DeleteForm';
  let editButtonPressed = e.target.id == 'EditForm';
  id= e.target.parentElement.children[0].textContent;
  
if(deleteButtonPressed){
    fetch(`${URL}delete-greeting/${id}`, {
        method:'DELETE',
      })
      .then(res => res.json())
      .then(() => location.reload())
      .catch(err => { 
        return err;
      })
}
if(editButtonPressed){
  let first_name = e.target.parentElement.children[1].textContent.split(' ')[0];
  let last_name = e.target.parentElement.children[1].textContent.split(' ')[1];
  let greeting = e.target.parentElement.children[2].textContent;

  document.querySelector(".firstNameEdit").value=first_name;
  document.querySelector(".lastNameEdit").value=last_name;
  document.querySelector(".greetingEdit").value=greeting;
  document.querySelector('.edit-post-greeting').style.display = "block";
}
})

function editGreetings(){
  fetch(`${URL}update-greeting/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: document.querySelector(".firstNameEdit").value,
      lastName: document.querySelector(".lastNameEdit").value,
      greeting: document.querySelector(".greetingEdit").value
    })
    })
    .then(res => res.json()) 
    .catch(err => { 
      return err;
    })
    closeFormForEdit();
    location.reload();
}

function getFormInPopup() {
  document.querySelector('.add-post-greeting').style.display = "block";
}

function closeForm() {
  document.querySelector('.add-post-greeting').style.display = "none";
}

function closeFormForEdit() {
  document.querySelector('.edit-post-greeting').style.display = "none";
}

