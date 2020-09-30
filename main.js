const listButton = document.querySelector('.load-greetings');
const postsLists = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const editPostForm = document.querySelector('.edit-post-form');
const url = 'http://localhost:4000/find-greetings';
const urlForCreate = 'http://localhost:4000/create-greeting';
const urlForEdit = 'http://localhost:4000/update-greeting';
const urlForDelete = 'http://localhost:4000/delete-greeting';


const renderPost = (posts) => {
  let output = '';
  posts.forEach(post =>{
    output += `<div class="card mt-4 col-md-3 bg-ligt" >
    <div class="card-body">
      <p class="ObjectId card-p">${post._id}</p>
      <p class="NameOnCard card-p">${post.firstName +' ' +post.lastName}</p>
      <p class="Greeting card-p">${post.greeting}</p>
      <p mt -0 class="CreatedAt card-p">${post.createdAt}</p>
      <a href="#" class="card-link" id="EditForm" onclick="editGreeting()">Edit</a>
      <a href="#" class="card-link" id="DeleteForm">Delete</a>
    </div>
  </div>`;
});
postsLists.innerHTML = output;
}

//To load all the greetings
function loadAllTheGreetings(){
  fetch(url)
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
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let greeting = document.querySelector(".greeting").value;
  fetch(urlForCreate, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      greeting: greeting 
    })
    }).then(data => {
       closeForm();
    }) 
    .catch(err => { 
      return err;
    })
    location.reload();
}

postsLists.addEventListener('click', (e) => {
  e.preventDefault();
  let deleteButtonPressed = e.target.id == 'DeleteForm';
  let editButtonPressed = e.target.id == 'EditForm';
  let id= e.target.parentElement.children[0].textContent;
  
if(deleteButtonPressed){
    fetch(`${urlForDelete}/${id}`, {
        method:'DELETE',
      })
      .then(res => res.json())
      .then(() => location.reload())
      .catch(err => { 
        return err;
      })
}
})



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

