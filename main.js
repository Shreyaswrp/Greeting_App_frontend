/**
 *Purpose  : To carry out the fetch operations from api
 *@files   : main.js
 *@overview: API get,put,post,delete opreations
 *@author  : Shreya Swaroop
 *@verson  : 1.0
 *@since   : 22-09-2020
 */

const listButton = document.querySelector('.load-greetings');
const postsLists = document.querySelector('.posts-list');

const URL = 'http://localhost:4000/';

let id = ' ';

const renderPost = (posts) => {
  let output = '';
  posts.forEach(post =>{
    let date = post.createdAt.split('-')[0]+"-"+post.createdAt.split('-')[1]+"-"+post.createdAt.split('-')[2][0]+post.createdAt.split('-')[2][1];
    output += `<div class="card mt-4 mr-4 col-md-4 card-contents" >
    <div class="card-body card=dim">
      <div mb-2 class="object-id">ObjectId('${post._id}')</div>
      <div mb-2 class="name-on-card">${post.firstName +' ' +post.lastName} (name)</div>
      <div mb-2 class="greeting-of-card">${post.greeting} (Greeting)</div>
      <div mt-4 class="created-at">${date}</div>
      <span class="card-link fa fa-pencil-square-o edit-delete-button" id="EditForm"></span>
      <span class="card-link fa fa-trash edit-delete-button" id="DeleteForm"></span>
    </div>
  </div>`;
});
postsLists.innerHTML = output;
}

/**
 * @description: load all the greetings data from database and add in div
 * @returns: error if any
 */
function loadAllTheGreetings(){
  fetch(`${URL}find-greetings`)
  .then(res => res.json() )
  .then(result => result.data)
  .then(data => renderPost(data))
  .catch(err =>{
    return err
  })
}

listButton.addEventListener('click', function() {
  loadAllTheGreetings();
})

loadAllTheGreetings();

/**
 * @description: add the new greetigs to the database
 * @returns: error if any
 */
function addGreetings(){
  document.getElementById("contain-no-fname").style.cssText += "display : none !important"
  document.getElementById("contain-no-lname").style.cssText += "display : none !important"
  document.getElementById("contain-no-greeting").style.cssText += "display : none !important"

  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let greeting = document.querySelector(".greeting").value;

  let regexConst = new RegExp(/^[a-zA-Z]{3,}$/);
  
  if(!regexConst.test(firstName))
  {
    document.getElementById("contain-no-fname").style.cssText += "display : block !important"
  }

  if(!regexConst.test(lastName))
  {
    document.getElementById("contain-no-lname").style.cssText += "display : block !important"
  }

  if(greeting.length < 3)
  {
    document.getElementById("contain-no-greeting").style.cssText += "display : block !important"
  }

  if( regexConst.test(firstName) && regexConst.test(lastName) && greeting.length >= 3){

  fetch(`${URL}create-greeting`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      greeting: greeting
    })
    }).then(res => {res.json()
      alert("successfully added");
    })
    .catch(err => { 
      return err;
    })
    closeForm();
    location.reload();
  }
}

postsLists.addEventListener('click', (e) => {
  e.preventDefault();
  let deleteButtonPressed = e.target.id == 'DeleteForm';
  let editButtonPressed = e.target.id == 'EditForm';
  id = e.target.parentElement.children[0].textContent.split('\'')[1];

  if(deleteButtonPressed){
    openConfirmFormToDelete();
  }

  if(editButtonPressed){
  let first_name = e.target.parentElement.children[1].textContent.split(' ')[0];
  let last_name = e.target.parentElement.children[1].textContent.split(' ')[1];
  let greeting = e.target.parentElement.children[2].textContent.split(' ');

  let greeting_length=greeting.length;

  let message ="";

  for(let m=0;m<greeting_length-1;m++){
      message+=greeting[m]+" ";
  }

  document.querySelector(".firstNameEdit").value=first_name;
  document.querySelector(".lastNameEdit").value=last_name;
  document.querySelector(".greetingEdit").value=message;
  openFormToEdit();
  }
})

/**
 * @description: delete the card from database using the id
 * @returns: error if any
 */
function deleteGreeting() {
  fetch(`${URL}delete-greeting/${id}`, {
    method:'DELETE',
  })
  .then(res => {res.json()
    alert("successfully deleted");
  })
  .catch(err => { 
    return err;
  })
  closeFormForDelete()
  location.reload()
}

/**
 * @description: edit the existing greeting in the database using id
 * @returns: error if any
 */
function editGreetings(){
  document.getElementById("contain-no-fname-edit").style.cssText += "display : none !important"
  document.getElementById("contain-no-lname-edit").style.cssText += "display : none !important"
  document.getElementById("contain-no-greeting-edit").style.cssText += "display : none !important"

  let firstName = document.querySelector(".firstNameEdit").value;
  let lastName = document.querySelector(".lastNameEdit").value;
  let greeting = document.querySelector(".greetingEdit").value;

  let regexConst = new RegExp(/^[a-zA-Z]{3,}$/);

  if(!regexConst.test(firstName))
  {
    document.getElementById("contain-no-fname-edit").style.cssText += "display : block !important"
  }

  if(!regexConst.test(lastName))
  {
    document.getElementById("contain-no-lname-edit").style.cssText += "display : block !important"
  }

  if(greeting.length<3)
  {
    document.getElementById("contain-no-greeting-edit").style.cssText += "display : block !important"
  }

  if( regexConst.test(firstName) && regexConst.test(lastName) && greeting.length >= 3 ){

  fetch(`${URL}update-greeting/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      greeting: greeting
    })
    })
    .then(res => {res.json()
      alert("successfully edited");
    }) 
    .catch(err => { 
      return err;
    })
    closeFormForEdit();
    location.reload();
  }
}

//to display the add form
function getFormInPopup() {
  document.querySelector('.add-post-greeting').style.display = "block";

  document.querySelector(".firstName").value = '';
  document.querySelector(".lastName").value = '';
  document.querySelector(".greeting").value = '';

  document.getElementById("contain-no-fname").style.cssText += "display : none !important"
  document.getElementById("contain-no-lname").style.cssText += "display : none !important"
  document.getElementById("contain-no-greeting").style.cssText += "display : none !important"
}

function openConfirmFormToDelete() {
      document.querySelector('.delete-form').style.display = "block";
}
//to hide the add form
function closeForm() {
  document.querySelector('.add-post-greeting').style.display = "none";
}

//to hide the edit form
function closeFormForEdit() {
  document.querySelector('.edit-post-greeting').style.display = "none";
}

//to hide the delete form
function closeFormForDelete() {
  document.querySelector('.delete-form').style.display = "none";
}

function openFormToEdit() {
  document.querySelector('.edit-post-greeting').style.display = "block";
  document.getElementById("contain-no-fname-edit").style.cssText += "display : none !important"
  document.getElementById("contain-no-lname-edit").style.cssText += "display : none !important"
  document.getElementById("contain-no-greeting-edit").style.cssText += "display : none !important"
}