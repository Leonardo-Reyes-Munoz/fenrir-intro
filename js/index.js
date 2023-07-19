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
  newMessage.innerHTML = `<a href='mailto:${usersEmail}'>${usersName} </a><p>${usersMessage}</p>`;

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
  if (e.target.type === "button") {
    const button = e.target.innerText;
    const entry = e.target.parentNode;
    const allButtons = document.getElementsByTagName("button");

    //button actions stored in a variable object
    const buttonActions = {
      remove: () => {
        entry.remove();
        if (lis.length === 0) {
          // toggles messages to display of "none" if no messages
          messages.parentNode.style.display = "none";
        }
      },
      edit: () => {
        const entryAnchorTag = entry.querySelector("a");
        const entryMessage = entry.querySelector("p");
        const breakSpace = document.createElement("br");
        const breakSpace2 = document.createElement("br");
        const breakSpace3 = document.createElement("br");

        // edits usersName
        const editingNameBox = document.createElement("input");
        const editingNameLabel = document.createElement("label");
        editingNameLabel.innerText = "Name:";
        editingNameBox.type = "text";
        editingNameBox.setAttribute("class", "editedUsersName");
        editingNameBox.value = entryAnchorTag.textContent;
        entry.insertBefore(editingNameBox, entryAnchorTag);
        entry.insertBefore(editingNameLabel, editingNameBox);

        // edits usersMessage
        const editingMessageBox = document.createElement("textarea");
        const editingMessageBoxLabel = document.createElement("label");
        editingMessageBoxLabel.innerText = "Message:";
        editingMessageBox.innerText = entryMessage.textContent;
        editingMessageBox.setAttribute("class", "editedUsersMessage");
        entry.insertBefore(editingMessageBox, entryMessage);
        entry.insertBefore(editingMessageBoxLabel, editingMessageBox);
        entry.insertBefore(breakSpace, entryMessage);
        entryMessage.remove();

        // edits usersEmail
        const editingEmailBox = document.createElement("input");
        const editingEmailLabel = document.createElement("label");
        editingEmailLabel.innerText = "Email:";
        let email = entry.querySelector("a").getAttribute("href");
        //regular expression to remove "mailto:" from email
        email = email.replace(/mailto:/i, "");
        editingEmailBox.type = "email";
        editingEmailBox.setAttribute("class", "editedUsersEmail");
        editingEmailBox.value = email;

        entry.insertBefore(editingEmailBox, editingMessageBoxLabel);
        entry.insertBefore(editingEmailLabel, editingEmailBox);
        entry.insertBefore(breakSpace2, editingMessageBoxLabel);
        entry.insertBefore(breakSpace3, entryAnchorTag);
        entryAnchorTag.remove();

        for (let i = 0; i < allButtons.length; i++) {
          allButtons[i].disabled = true;
        }
        e.target.innerText = "save";
        e.target.disabled = false;
      },
      save: () => {
        const newLi = document.createElement("li");

        const editedUsersName = entry.querySelector(".editedUsersName").value;
        const editedUsersEmail = entry.querySelector(".editedUsersEmail").value;
        let editedUsersMessage = entry.querySelector(
          ".editedUsersMessage"
        ).value;
        newLi.innerHTML = `<a href='mailto:${editedUsersEmail}'>${editedUsersName} </a><p>${editedUsersMessage}</p>`;

        //creates a remove button
        const removeButton = document.createElement("button");
        removeButton.innerText = "remove";
        removeButton.type = "button";

        //creates an edit button
        const editButton = document.createElement("button");
        editButton.innerText = "edit";
        editButton.type = "button";

        newLi.appendChild(removeButton);
        newLi.appendChild(editButton);

        messages.insertBefore(newLi, entry);
        e.target.innerText = "edit";
        entry.remove();

        for (let i = 0; i < allButtons.length; i++) {
          allButtons[i].disabled = false;
        }
      },
    };
    buttonActions[button](e);
  }
});

//Lesson 6-1: AJAX //
const githubRequest = new XMLHttpRequest();
githubRequest.open(
  "GET",
  "https://api.github.com/users/Leonardo-Reyes-Munoz/repos"
);
githubRequest.send();
githubRequest.onload = () => {
  repositories = JSON.parse(githubRequest.response);
  console.log(repositories);

  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement("li");
    const projectLink = document.createElement("a");
    projectLink.setAttribute("href", `${repositories[i].html_url}`);
    projectLink.innerText = `${repositories[i].name} : ${repositories[i].description}`;
    project.appendChild(projectLink);
    projectList.appendChild(project);
  }
};
