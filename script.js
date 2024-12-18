//Warning:
//my code suck
//so gl


//User Stats
var Stats = {
  money: 0,
  power: 1,
  autoclicker: 0,
  multiplier: 1
};

var rare_ad_chance = 20;
var capybarabonus_percent = 10;
var ad_display_number = 6;

//on load stuff for saving VVV
setInterval(() => {
  localStorage.setItem("Stats", JSON.stringify(Stats));
}, 1000);

window.onload = function () {
  const savedstats = JSON.parse(localStorage.getItem("Stats"));
  Stats.money = savedstats.money;
  Stats.power = savedstats.power;
  Stats.autoclicker = savedstats.autoclicker;
  Stats.multiplier = savedstats.multiplier;
  updatedisplay("money");
  updatedisplay("power");
  updatedisplay("autoclicker");
  updatedisplay("multiplier");
  popupwindowdisplay(1);
  autoclick();
};

//to add upgrades follow the instructions below
//1. add another upgrade div in HTML
//2. create another ID array below
var Upgrades = [
  {ID: 1, Name: "Upgrade1", Price: 25, Effect: 1, Type: "power"},
  {ID: 2, Name: "Upgrade2", Price: 50, Effect: 1, Type: "auto"},
  {ID: 3, Name: "Upgrade3", Price: 125, Effect: 10, Type: "power"},
  {ID: 4, Name: "Upgrade4", Price: 250, Effect: 10, Type: "auto"},
  {ID: 5, Name: "Upgrade5", Price: 625, Effect: 75, Type: "power"},
  {ID: 6, Name: "Upgrade6", Price: 1250, Effect: 50, Type: "auto"},
  {ID: 7, Name: "Upgrade7", Price: 3125, Effect: 150, Type: "power"},
  {ID: 8, Name: "Upgrade8", Price: 6250, Effect: 150, Type: "auto"},
  {ID: 9, Name: "Prestige1", Price: 1000000, Effect: 0, Type: "prestige"}
]

//Rewards from clicking ad
function adclicked() {
  Stats.money += Stats.power * Stats.multiplier;
  updatedisplay("money");
  updatedisplay("ad");
  updatedisplay("blocked");
}

function autoclick() {
  setInterval(() => {
    Stats.money += Stats.autoclicker;
    updatedisplay("money");
  }, 1000);
}

//Upgrade purchases
function purchaseupgrade(upgradenumber) {

  const upgrade = Upgrades.find(u => u.ID === upgradenumber);

  if (upgrade) {
    if (Stats.money >= upgrade.Price) {
      Stats.money -= upgrade.Price;
      if (upgrade.Type == "power") {
        Stats.power += upgrade.Effect * Stats.multiplier;
      } else if (upgrade.Type == "auto") {
        Stats.autoclicker += upgrade.Effect * Stats.multiplier;
      } else if (upgrade.Type == "prestige") {
        switch(upgrade.Name) {
          case "Prestige1":
              Stats.money = 0;
              Stats.autoclicker = 0;
              Stats.power = 1;
              Stats.multiplier += 1;
            break;
        }
      }
    }
  }

  updatedisplay("money");
  updatedisplay("power");
  updatedisplay("autoclicker");
  updatedisplay("multiplier");
}

//Change user stat displays
function updatedisplay(display) {
  switch(display) {
      //money display
    case "money":
      document.getElementById("Money_Display").innerText = Stats.money.toLocaleString();
      break;
      
      //power display
    case "power":
      document.getElementById("Power_Display").innerText = Stats.power.toLocaleString();
      break;
      
      //autoblocks display
    case "autoclicker":
      document.getElementById("Autoblocks_Display").innerText = Stats.autoclicker.toLocaleString();
      break;

      //multiplier display
    case "multiplier":
        document.getElementById("Multiplier_Display").innerText = Stats.multiplier.toLocaleString();
      break;

      //ad display
    case "ad":
      var ad_display = Math.floor(Math.random() * ad_display_number) + 1; //change the # in "Math.random() * #" for how many possible ads
      var Ad = document.getElementById("Ad");
      switch (ad_display) {
        case 1:
          var rare_ad = Math.floor(Math.random() * rare_ad_chance) + 1;
          if (rare_ad == 1) { //there is a 0.83% chance to get this ad lol
          Ad.src = "./Images/Capybara.png";
          capybarabonus = Math.round(Stats.money / capybarabonus_percent);
          Stats.money += capybarabonus;
          }
          break;
        case 2:
          Ad.src = "./Images/ad-1.png";
          break;
        case 3:
          Ad.src = "./Images/ad-2.png";
          break;
        case 4:
          Ad.src = "./Images/ad-3.png";
          break;
        case 5:
          Ad.src = "./Images/ad-4.png";
          break;
        case 6:
          Ad.src = "./Images/ad-5.png";
          break;
      }
      
      //blocked display 
    case "blocked":
      document.getElementById("Blocked").classList.remove("hidden");
      document.getElementById("Ad").style.opacity = 0.5;
      setTimeout(() => {
        document.getElementById("Blocked").classList.add("hidden");
        document.getElementById("Ad").style.opacity = 1;
      }, 500);
      break;
      
      //cursor display
    case "cursor":


      //chosen cursor
      var selectedcursor = 1; 

      switch (selectedcursor) {
        case 1:
          document.documentElement.style.cursor = "var(--cursor-1)";
          break;
        case 2:
          document.documentElement.style.cursor = "var(--cursor-2)";
          break;
          
      }break;
    
      //Popupwindow display
    case "popupwindow":
      document.getElementById("PopupWindow").classList.add("hidden");
      break;
  }
}

var Popupwindowtext = [
  {ID: 1, 
  Text1: "V1.1.2",
  Text2: "Ad Block Clicker",
  Text3: "Bugs, progress loss, etc. are possible. Close the this window with the X. Current start to 1,000,000: 2 minutes",
  Text4: "Changelog: Patched Multiplier bug, new upgrade, changed upgrade prices."},
  {ID: 2, 
    Text1: "V1.1.2",
    Text2: "Settings",
    Text3: "Settings stuff",
    Text4: { label: "Reset", onclick: "resetprogress()" },
  },
  {ID: 3,
    Text1: "V1.1.2",
    Text2: "Debug Hacks",
    Text3: { label: "+$1,000,000", onclick: "debug(1)" },
    Text4: { label: "Capabara 0.83% -> 100% chance, Capabara bonus 10% -> 110%", onclick: "debug(2)"},
    Text5: { label: "Multiplier +20x", onclick: "debug(3)"}
  }
]

function popupwindowdisplay(selectedpopup) {
  document.getElementById("PopupWindow").classList.remove("hidden");
  const popupData = Popupwindowtext.find((popup) => popup.ID === selectedpopup);
  //yes i took this from gpt shhh
  if (popupData) {
    const updateContent = (containerId, content) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (typeof content === "string") {
      container.textContent = content;
    } else if (content?.label && content?.onclick) {
      const button = document.createElement("button");
      button.textContent = content.label;
      button.setAttribute("onclick", content.onclick);
      container.appendChild(button);
    }
  };
  updateContent("PopupWindow-innertext-1", popupData.Text1);
  updateContent("PopupWindow-innertext-2", popupData.Text2);
  updateContent("PopupWindow-innertext-3", popupData.Text3);
  updateContent("PopupWindow-innertext-4", popupData.Text4);
  updateContent("PopupWindow-innertext-5", popupData.Text5);
  }
} 

function resetprogress() {
    if(confirm("Are you sure?")) {
      Stats.money = 0;
      Stats.autoclicker = 0;
      Stats.power = 1;
      Stats.multiplier = 1;
      rare_ad_chance = 20;
      capybarabonus_percent = 10;
      ad_display_number = 6;
      updatedisplay("multiplier");
      updatedisplay("money");
      updatedisplay("power");
      updatedisplay("autoclicker");
    } else alert("ok!");
}

function debug(debugtype) {
  switch(debugtype) {
    case 1:
      Stats.money += 1000000;
      break;
    case 2:
      rare_ad_chance = 1;
      ad_display_number = 1;
      capybarabonus_percent = 2.10;
      break;
    case 3:
      Stats.multiplier += 20;
      updatedisplay("multiplier");
  }
}

document.addEventListener("keydown", function(event) {
  if(event.key === "`") {
    if (prompt("Debug mode password:") === "yippiehax") {
      popupwindowdisplay(3);
    }
  }
});