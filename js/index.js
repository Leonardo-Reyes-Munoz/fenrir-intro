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
