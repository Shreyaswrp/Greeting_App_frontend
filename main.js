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

  if(!regexConst.test(greeting))
  {
    document.getElementById("contain-no-greeting").style.cssText += "display : block !important"
  }

  if( regexConst.test(firstName) && regexConst.test(lastName) && regexConst.test(greeting) ){

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
    }).then(res => res.json())
    .catch(err => { 
      return err;
    })
    closeForm()
    location.reload()
  }
}

postsLists.addEventListener('click', (e) => {
  e.preventDefault();
  let deleteButtonPressed = e.target.id == 'DeleteForm';
  let editButtonPressed = e.target.id == 'EditForm';
  id = e.target.parentElement.children[0].textContent;
 
/**
 * @description: delete the card from database using the id
 * @returns: error if any
 */
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

/**
 * @description: edit the existing greeting in the database using id
 * @returns: error if any
 */
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

//to display the add form
function getFormInPopup() {
  document.querySelector('.add-post-greeting').style.display = "block";
}

//to hide the add form
function closeForm() {
  document.querySelector('.add-post-greeting').style.display = "none";
}

//to hide the edit form
function closeFormForEdit() {
  document.querySelector('.edit-post-greeting').style.display = "none";
}

