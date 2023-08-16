// Lesson 4.2 Footer
let currentDate = new Date();
let thisYear = currentDate.getFullYear();

const copyrightParagraph = document.getElementById("copyright");

const copyright = document.createElement("p");
copyright.setAttribute("class", "copyright");
copyright.innerHTML = `<small>Leonardo Reyes &copy; ${thisYear}</small>`;
copyrightParagraph.appendChild(copyright);

// Skills Section

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

function createNewMessage(event) {
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

  return newMessage;
}

//Event listener to append message and userInfo to message list
messageForm.addEventListener("submit", (event) => {
  let message = createNewMessage(event);
  messages.appendChild(message);

  // resets the form
  messageForm.reset();
});

//Event listener to append message and userInfo to message list
messages.addEventListener("submit", (e) => {
  if (e.target.submit) {
    const entry = e.target;
    const allButtons = document.getElementsByTagName("button");
    let editedMessage = createNewMessage(e);

    messages.insertBefore(editedMessage, entry);
    // deletes the form in messages
    entry.remove();

    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].disabled = false;
    }
  }
});

// Event listener to execute remove and edit buttons.
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
        let form = document.getElementById("message-form");
        let newNode = form.cloneNode(true);
        const entryAnchorTag = entry.querySelector("a");
        const entryMessage = entry.querySelector("p");
        let email = entry.querySelector("a").getAttribute("href");
        //regular expression to remove "mailto:" from email
        email = email.replace(/mailto:/i, "");
        newNode.usersName.value = entryAnchorTag.textContent;
        newNode.usersEmail.value = email;
        newNode.usersMessage.value = entryMessage.textContent;

        messages.insertBefore(newNode, entry);
        entry.remove();
        for (let i = 0; i < allButtons.length; i++) {
          allButtons[i].disabled = true;
        }
        newNode.submit.disabled = false;
      },
    };
    buttonActions[button](e);
  }
});

fetch("https://api.github.com/users/Leonardo-Reyes-Munoz/repos")
  .then((repositories) => repositories.json())
  .then((repositories) => {
    console.log(repositories);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.setAttribute("class", "card");
      const projectName = document.createElement("h3");
      projectName.innerText = `${repositories[i].name}`;
      project.appendChild(projectName);
      const projectDescription = document.createElement("p");
      projectDescription.innerText = `${repositories[i].description}`;
      project.appendChild(projectDescription);
      const projectLink = document.createElement("a");
      projectLink.setAttribute("href", `${repositories[i].html_url}`);
      const codeBtn = document.createElement("button");
      codeBtn.innerText = "See Code";
      projectLink.appendChild(codeBtn);
      project.appendChild(projectLink);
      projectList.appendChild(project);
    }
  })
  .catch((error) =>
    console.log("Looks like was a problem with API request!", error)
  );
