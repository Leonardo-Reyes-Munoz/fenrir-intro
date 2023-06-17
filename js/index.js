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
// Hides messages section if there are no messages
displayMessages = document.getElementById("messages");
displayMessages.style.display = "none";
const lis = displayMessages.querySelector("ul").children;

// appends message and userInfo to message list
const messageForm = document.getElementsByName("leave_message")[0];
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //grabs user info and message and puts it into newMessage variable
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href='mailto:${usersEmail}'>${usersName} </a><br /><span>${usersMessage}</span><br />`;

  //creates a remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  //creates an edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  //delegates event listener to section with ID of #messages
  const messageSection = document.getElementById("messages");
  messageSection.addEventListener("click", (e) => {
    const button = e.target.innerText;
    const li = e.target.parentNode;

    const buttonActions = {
      remove: () => {
        const entry = removeButton.parentNode;
        entry.remove();
        if (lis.length === 0) {
          // toggles messages section to display of "none" if no messages
          displayMessages.style.display = "none";
        }
      },
      edit: () => {
        const newInput = document.createElement("input");
        const span = li.querySelector("span");
        newInput.type = "text";
        newInput.value = span.textContent;
        li.insertBefore(newInput, span);
        span.remove();
        e.target.innerText = "save";
      },
      save: () => {
        const savedInput = document.createElement("span");
        const input = li.querySelector("input");
        savedInput.textContent = input.value;
        li.insertBefore(savedInput, input);
        li.querySelector("input").remove();
        e.target.innerText = "edit";
      },
    };
    buttonActions[button]();
  });
  //toggles messages to default display behavior when appending message
  displayMessages.style.display = "";

  const messageList = messageSection.querySelector("ul");
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});
