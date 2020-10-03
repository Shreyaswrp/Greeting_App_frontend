const postsLists = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const editPostForm = document.querySelector('.edit-post-form');
const url = 'http://localhost:4000/find-greetings';
const urlForCreate = 'http://localhost:4000/create-greeting';
const urlForEdit = 'http://localhost:4000/update-greeting';
const urlForDelete = 'http://localhost:4000/delete-greeting';

let firstNameValue = document.querySelector('firstName');
let lastNameValue = document.querySelector('lastName');
let greetingValue = document.querySelector('Greeting');

let output ='';

function getFirstName(val) {
  firstNameValue = val;
}

function getLastName(val) {
  lastNameValue = val;
}

function getGreeting(val) {
  greetingValue = val;
}

const renderPost = (posts) => {
  posts.forEach(post =>{
    output += `<div class="card mt-4 col-md-3 bg-ligt" >
    <div class="card-body">
      <p class="ObjectId card-p">${post._id}</p>
      <p class="NameOnCard card-p">${post.firstName +' ' +post.lastName}</p>
      <p class="Greeting card-p">${post.greeting}</p>
      <p mt -0 class="CreatedAt card-p">${post.createdAt}</p>
     <div class="row edit-delete-button"> <div class="card-link list-group-item-action button-for-edit-delete col-md-6" id="EditForm" onclick="getFormToEditInPopup()">Edit</div>
      <div class="card-link list-group-item-action button-for-edit-delete col-md-6" id="DeleteForm">Delete</div>
    </div>
    </div>
  </div>`;
});
postsLists.innerHTML = output;
}

//To get all the greetings
function loadAllTheGreetings() { 
   fetch(url)
  .then(res => res.json() )
  .then(result => result.data)
  .then(data => renderPost(data))
}

loadAllTheGreetings();

postsLists.addEventListener('click', (e) => {
  e.preventDefault();

  let deleteButtonPressed = e.target.id == 'DeleteForm'
  let editButtonPressed = e.target.id == 'EditForm'

  let id = e.target.parentElement.children[0].textContent;
  
  //Delete a greeting
  //Method: delete
  if(deleteButtonPressed){
    fetch(`${urlForDelete}/${id}`,{

      method:'DELETE',
    })
    .then(res => res.json())
    //.then(() => location.reload())
  }

  if(editButtonPressed) {
      const parent = e.target.parentElement;
      let firstName = parent.querySelector('.NameOnCard').textContent.split(" ", 1);
      console.log(firstName);
      let lastName = parent.querySelector('.NameOnCard').textContent.split(/[\s,]+/).pop();
      console.log(lastName);
      let greeting = parent.querySelector('.Greeting').textContent;
      console.log(greeting);

      firstnamevalue.value = firstName;
      lastnamevalue.value = lastName;
      greetingvalue.value = greeting;
      //fetch(`${urlForEdit}/${id}`, {

    //})
  }
})

// Create -Insert new greeting
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
       loadAllTheGreetings();
    }) 
    .catch(err => { 
      console.log(err);
    })
}

function getFormInPopup() {
  document.querySelector('.add-post-greeting').style.display = "block";
}

function getFormToEditInPopup() {
  document.querySelector('.edit-post-greeting').style.display = "block";
}

function closeForm() {
  document.querySelector('.add-post-greeting').style.display = "none";
}

function closeFormForEdit() {
  document.querySelector('.edit-post-greeting').style.display = "none";
}

