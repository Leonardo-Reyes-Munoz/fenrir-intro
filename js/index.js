// Lesson 4.2
let currentDate = new Date();
let thisYear = currentDate.getFullYear();

const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `<small>Leonardo Reyes &copy; ${thisYear}</small>`;

footer.appendChild(copyright);

let skills = ["Management Experience", "JavaScript", "CSS", "HTML"];

let skillsSelection = document.getElementById("skills");
let skillsList = skillsSelection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];

  skillsList.appendChild(skill);
}

// Lesson 4.3
// Global variable declarations
const messageForm = document.getElementsByName("leave_message")[0];
const messages = document.getElementById("messages");
const lis = messages.children;

// initial state of message section is hidden
messages.parentNode.style.display = "none";

//Event listener to append message and userInfo to message list
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //grabs user info and message and puts it into newMessage variable
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href='mailto:${usersEmail}'>${usersName} </a><br /><span>${usersMessage}</span><br />`;

  //toggles messageSection to default display behavior when appending message
  messages.parentNode.style.display = "";

  //creates a remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  //creates an edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  // appends message and buttons
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  messages.appendChild(newMessage);

  // resets the form
  messageForm.reset();
});

// Event listener to execute remove, edit, and save buttons.
messages.addEventListener("click", (e) => {
  const button = e.target.innerText;
  console.log(e.target.parentNode);
  //button actions stored in a variable object
  const buttonActions = {
    remove: () => {
      const entry = e.target.parentNode;
      entry.remove();
      if (lis.length === 0) {
        // toggles messages to display of "none" if no messages
        messages.parentNode.style.display = "none";
      }
    },
    edit: () => {
      // edits usersName
      const editedUsersName = document.createElement("input");
      const anchor = e.target.parentNode.querySelector("a");
      editedUsersName.type = "text";
      editedUsersName.setAttribute("id", "editedUsersName");
      editedUsersName.value = anchor.textContent;
      e.target.parentNode.insertBefore(editedUsersName, anchor);
      // anchor.remove();

      // edits usersEmail
      const editedUsersEmail = document.createElement("input");
      const email = e.target.parentNode.querySelector("a").getAttribute("href");
      editedUsersEmail.type = "text";
      editedUsersEmail.setAttribute("id", "editedUsersEmail");
      editedUsersEmail.value = email;
      e.target.parentNode.insertBefore(editedUsersEmail, anchor);
      anchor.remove();

      // edits usersMessage
      const editedUsersMessage = document.createElement("input");
      const span = e.target.parentNode.querySelector("span");
      editedUsersMessage.type = "text";
      editedUsersMessage.setAttribute("id", "editedUsersMessage");
      editedUsersMessage.value = span.textContent;
      e.target.parentNode.insertBefore(editedUsersMessage, span);
      span.remove();

      const buttons = document.getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
      }
      e.target.innerText = "save";
      e.target.style.display = "";
    },
    save: () => {
      const parentNode = e.target.parentNode;
      console.log(parentNode);
      // saves users new name
      const savedUsersName = document.createElement("a");
      const updatedUsersName = document.getElementById("editedUsersName");
      savedUsersName.textContent = updatedUsersName.value;

      // saves users new email
      const selectEmail = document.getElementById("editedUsersEmail");
      const updatedUsersEmail =
        document.getElementById("editedUsersEmail").value;
      savedUsersName.setAttribute("href", updatedUsersEmail);
      e.target.parentNode.insertBefore(savedUsersName, updatedUsersName);
      updatedUsersName.remove();
      selectEmail.remove();

      // saves users new message
      const savedUsersMessage = document.createElement("span");
      const updatedUsersMessage = document.getElementById("editedUsersMessage");
      savedUsersMessage.textContent = updatedUsersMessage.value;
      e.target.parentNode.insertBefore(savedUsersMessage, updatedUsersMessage);
      updatedUsersMessage.remove();

      e.target.innerText = "edit";
      const buttons = document.getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "";
      }
    },
  };
  buttonActions[button]();
});
