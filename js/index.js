// Helper function
let domReady = (cb) => {
  document.readyState === "interactive" || document.readyState === "complete"
    ? cb()
    : document.addEventListener("DOMContentLoaded", cb);
};

domReady(() => {
  // Display body when DOM is loaded
  document.body.style.visibility = "visible";
});

const apiUrl = "https://valorant-api.com/v1/agents/";
let valData;
let agents = {};

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    valData = data.data;
    sortAgents();
    getAgents();
    agentDropdown();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

let agentList, agentDataSorted;

function getAgents() {
  agentList = new Array();
  for (let i = 0; i < agentDataSorted.length; i++) {
    agentList.push(agentDataSorted[i].displayName);
  }
}

function sortAgents() {
  valData.sort(function (a, b) {
    const nameA = a.displayName.toUpperCase();
    const nameB = b.displayName.toUpperCase();

    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  console.log(valData);

  agentDataSorted = valData.reduce((accumulator, current) => {
    if (current.isPlayableCharacter === true) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
}

//add agents to dropdown
const select = document.getElementById("agent-select");
function agentDropdown() {
  for (let i = 0; i < agentList.length; i++) {
    let option = agentList[i];
    let el = document.createElement("option");
    el.textContent = option;
    el.value = option;
    select.appendChild(el);
  }
  select.removeChild(select.firstElementChild);

  startingAgent();
}

// Show Agent Info
let selectAgent = document.querySelector("#agent-select");
let selectedAgent = document.querySelector("#agent-select");
let agentIndex;
selectAgent.onchange = startingAgent;

const agentProp = [
  ["displayName", "description", "fullPortrait", "role", "abilities"],
  ["agent-name", "agent-description", "agent-img", "agent-role"],
];
const agentPropAbilities = [
  ["displayName", "description", "displayIcon"],
  ["ability-name", "ability-description", "ability-img"],
];
let activeSlide;
let count = 0;
function startingAgent() {
  if (localStorage.getItem("selectedAgent") && count === 0) {
    selectedAgent = localStorage.getItem("selectedAgent");
    agentIndex = agentList.indexOf(selectedAgent);
    document
      .querySelectorAll(`.agent-dropdown option`) //searching by value gives error
      [agentIndex].setAttribute("selected", "selected");
    activeSlide = "slide-a";
    count++;
  } else {
    selectedAgent = selectAgent.value;
    localStorage.setItem("selectedAgent", selectedAgent);
    agentIndex = agentList.indexOf(selectedAgent);
    if (activeSlide === "slide-a") {
      activeSlide = "slide-b";
    } else {
      activeSlide = "slide-a";
    }
  }

  displayAgentInfo();
  // document.querySelector("#agent-name").innerText = agentDataSorted;
}

function displayAgentInfo() {
  for (let i = 0; i < agentProp[0].length; i++) {
    if (agentProp[0][i] === "fullPortrait") {
      document.querySelector(
        `.agent-display.${activeSlide} img.${agentProp[1][i]}`
      ).src = agentDataSorted[agentIndex][agentProp[0][i]];
    }
    if (agentProp[0][i] === "role") {
      document.querySelector(
        `.agent-display.${activeSlide} .${agentProp[1][i]}`
      ).innerText = agentDataSorted[agentIndex][agentProp[0][i]].displayName;
    } else if (agentProp[0][i] === "abilities") {
      //agent abilities
      let abilityNum;
      for (let j = 0; j < 4; j++) {
        abilityNum = j + 1;
        for (let k = 0; k < 3; k++) {
          if (agentPropAbilities[0][k] === "displayIcon") {
            document.querySelector(
              `.agent-display.${activeSlide} .ability-${j + 1} .${
                agentPropAbilities[1][k]
              }`
            ).src =
              agentDataSorted[agentIndex][agentProp[0][i]][j][
                agentPropAbilities[0][k]
              ];
          } else {
            document.querySelector(
              `.agent-display.${activeSlide} .ability-${j + 1} .${
                agentPropAbilities[1][k]
              }`
            ).innerText =
              agentDataSorted[agentIndex][agentProp[0][i]][j][
                agentPropAbilities[0][k]
              ];
          }
        }
      }
    } else {
      // agent bio
      document.querySelector(
        ".agent-display." + activeSlide + " ." + agentProp[1][i]
      ).innerText = agentDataSorted[agentIndex][agentProp[0][i]];
    }
  }
}
document.querySelector(".sliding").addEventListener("click", () => {
  document.querySelector(".agent-display").classList.add("transition");
  document.querySelector(".agent-display").classList.add("lefty");
});

document.querySelector(".slide-btn").addEventListener("click", () => {
  document.querySelector(".slide-a").classList.add("grow");
  setTimeout(() => {
    document.querySelector(".slide-a").classList.add("exit-left");
    setTimeout(() => {
      document.querySelector(".slide-b").classList.add("enter-right");
    }, 10);
  }, 500);
});
