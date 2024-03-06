/*function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());

  console.log({ value });
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
*/

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
    if (!accumulator.find((item) => item.displayName === current.displayName)) {
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

  currentAgentInfo();
}

// Show Agent Info
let selectAgent = document.querySelector("#agent-select");
let selectedAgent = document.querySelector("#agent-select");
let agentIndex,
  agentName,
  agentRole,
  agentBio,
  abilityOneName,
  abilityOne,
  abilityOneImg,
  abilityTwoName,
  abilityTwo,
  abilityThreeName,
  abilityThree,
  ultimate,
  ultimateName;
selectAgent.onchange = getNextAgent;

const agentProp = [
  ["displayName", "description", "fullPortrait", "role", "abilities"],
  ["agent-name", "agent-description", "agent-img", "agent-role"],
];
const agentPropAbilities = [
  ["displayName", "description", "displayIcon"],
  ["ability-name", "ability-description", "ability-img"],
];
let divId;
function getNextAgent() {
  if (divId === "slide-a") {
    divId = "slide-b";
  } else {
    divId = "slide-a";
  }

  selectedAgent = selectAgent.value;
  agentIndex = agentList.indexOf(selectedAgent);
  // get agent's role
  for (let i = 0; i < agentProp[0].length; i++) {
    if (agentProp[0][i] === "fullPortrait") {
      document.querySelector(
        `.agent-display.${divId} img.${agentProp[1][i]}`
      ).src = agentDataSorted[agentIndex][agentProp[0][i]];
    }
    if (agentProp[0][i] === "role") {
      document.querySelector(
        `.agent-display.${divId} .${agentProp[1][i]}`
      ).innerText = agentDataSorted[agentIndex][agentProp[0][i]].displayName;
    } else if (agentProp[0][i] === "abilities") {
      //agent abilities
      let abilityNum;
      for (let j = 0; j < 4; j++) {
        abilityNum = j + 1;
        for (let k = 0; k < 3; k++) {
          if (agentPropAbilities[0][k] === "displayIcon") {
            document.querySelector(
              `.agent-display.${divId} .ability-${j + 1} .${
                agentPropAbilities[1][k]
              }`
            ).src =
              agentDataSorted[agentIndex][agentProp[0][i]][j][
                agentPropAbilities[0][k]
              ];
          } else {
            document.querySelector(
              `.agent-display.${divId} .ability-${j + 1} .${
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
        ".agent-display." + divId + " ." + agentProp[1][i]
      ).innerText = agentDataSorted[agentIndex][agentProp[0][i]];
    }
  }
  //agentDataSorted[1][agentProp[4]][2][agentPropAbilities[3]]
}
let count = 0;
function currentAgentInfo() {
  if (localStorage.getItem("selectedAgent") && count === 0) {
    selectedAgent = localStorage.getItem("selectedAgent");
    count++;
  } else {
    selectedAgent = selectAgent.value;
    localStorage.setItem("selectedAgent", selectedAgent);
  }
  agentIndex = agentList.indexOf(selectedAgent);
  agentName = agentDataSorted[agentIndex].displayName;
  agentBio = agentDataSorted[agentIndex].description;
  abilityOneName = agentDataSorted[agentIndex].abilities[0].displayName;
  abilityOne = agentDataSorted[agentIndex].abilities[0].description;
  abilityOneImg = agentDataSorted[agentIndex].abilities[0].displayIcon;

  document.getElementById("agent-name").innerText = agentName;
  document.getElementById("agent-bio").innerText = agentBio;
  document.getElementById("agent-ability-one").innerText = abilityOneName;
  document.getElementById("agent-ability-one-info").innerText = abilityOne;
  document.getElementById("agent-ability-one-img").src = abilityOneImg;

  // document.querySelector("#agent-name").innerText = agentDataSorted;
}

// Sample I need to incorporate into my own project
var Data = [
  {
    id_list: 1,
    name: "Nick",
    token: "312312",
  },
  {
    id_list: 2,
    name: "John",
    token: "123123",
  },

  {
    id_list: 2,
    name: "Jake",
    token: "123123",
  },
  {
    id_list: 2,
    name: "Alan",
    token: "123123",
  },
];
var index = Data.map(function (e) {
  return e.name;
}).indexOf("Jake");
console.log(index);
