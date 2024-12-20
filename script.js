// * ---------VVV-ON LOAD ETC-VVV--------------
setInterval(() => {
  localStorage.setItem("Stats", JSON.stringify(Stats));
}, 1000);

window.onload = function () {
  
  //Load stats
  const savedstats = JSON.parse(localStorage.getItem("Stats"));
  Stats.money = savedstats.money;
  Stats.power = savedstats.power;
  Stats.autoclicker = savedstats.autoclicker;
  Stats.multiplier = savedstats.multiplier;

  //Display stats
  updatedisplay("money");
  updatedisplay("power");
  updatedisplay("autoclicker");
  updatedisplay("multiplier");

  //Run functions
  popupwindowdisplay(1);
  autoclick();

  //if more upgrades change the number in i < #
  for(i = 1; i < 13; i++) {
  upgradesettext(i);
  }
};

document.addEventListener("keydown", function(event) {
  if(event.key === "`") {
    if (prompt("Debug mode password:") === "yippiehax") {
      popupwindowdisplay(3);
    }
  }
});

// * ---------^^^-ON LOAD ETC-^^^--------------

//===========================================

// * ---------VVV-VARIBLES-VVV--------------

var Stats = {
  money: 0,
  power: 1,
  autoclicker: 0,
  multiplier: 1,
  currentversion: "1.2.3" //Version-Major.Minor.Patches
};

var rare_ad_chance = 20;
var capybarabonus_percent = 10;
var ad_display_number = 7;

var Popupwindowtext = [
  {ID: 1,
  Text1: "V1.2.3",
  Text2: "Ad Block Clicker",
  Text3: "Bugs, progress loss, etc. are possible. Close the this window with the X. Current start to 1,000,000: 2 minutes",
  Text4: "Changelog: Moved changelog to readme"},
  {ID: 2, 
    Text1: "V1.2.3",
    Text2: "Settings",
    Text3: "Settings stuff",
    Text4: { label: "Reset", onclick: "resetprogress()" },
  },
  {ID: 3,
    Text1: "V1.2.3",
    Text2: "Debug Hacks",
    Text3: { label: "+$1,000,000", onclick: "debug(1)" },
    Text4: { label: "Capabara 0.83% -> 100% chance, Capabara bonus 10% -> 110%", onclick: "debug(2)"},
    Text5: { label: "Multiplier +20x", onclick: "debug(3)"}
  }
]

var Upgrades = [
  //to add upgrades follow the instructions below
  //1. add another upgrade div in HTML
  //2. create another ID array below
  {ID: 1, Name: "Better Cursor", Price: 25, Effect: 1, Type: "power"},
  {ID: 2, Name: "Cheap Ad Blocker", Price: 50, Effect: 1, Type: "auto"},
  {ID: 3, Name: "Advanced Clicking", Price: 145, Effect: 5, Type: "power"},
  {ID: 4, Name: "Cheapish Ad Blocker", Price: 290, Effect: 5, Type: "auto"},
  {ID: 5, Name: "Better Mouse", Price: 835, Effect: 30, Type: "power"},
  {ID: 6, Name: "Pretty Good Blocker", Price: 1650, Effect: 30, Type: "auto"},
  {ID: 7, Name: "Click+++", Price: 4750, Effect: 180, Type: "power"},
  {ID: 8, Name: "Best Auto Blocker", Price: 9500, Effect: 180, Type: "auto"},
  {ID: 9, Name: "Evolved Clicking", Price: 27500, Effect: 1035, Type: "power"},
  {ID: 10, Name: "EVEN BETTER? Auto Blocker", Price: 54500, Effect: 1035, Type: "auto"},
  {ID: 11, Name: "Godly Power", Price: 150000, Effect: 6000, Type: "power"},
  {ID: 12, Name: "Good(?) Virus", Price: 2500000, Effect: "???", Type: "prestige"}
]

// * ---------^^^-VARIBLES-^^^--------------

//===========================================

// * ---------VVV-MONEY THINGS-VVV--------------

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

// * ---------^^^-MONEY THINGS-^^^--------------

//===========================================

// * ---------VVV-UPGRADE THINGS-VVV--------------

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

// * ---------^^^-UPGRADE THINGS-^^^--------------

//===========================================

// * ---------VVV-DISPLAY THINGS-VVV--------------

function upgradesettext(upgradenumber) {
  const upgrade = Upgrades.find(u => u.ID === upgradenumber);
  if (upgrade) {

    const upgradeContainer = document.querySelector(`.Upgrade:nth-of-type(${upgradenumber})`);

    if (upgradeContainer) {
      upgradeContainer.querySelector(".UpgradeName").innerText = upgrade.Name;
      upgradeContainer.querySelector(".UpgradePrice").innerText = `Price: ${upgrade.Price.toLocaleString()}`;
      upgradeContainer.querySelector(".UpgradeDiscription").innerText = `+${upgrade.Effect}`;

      const purchaseButton = upgradeContainer.querySelector(".UpgradePurchaseButton");
      purchaseButton.setAttribute("onclick", `purchaseupgrade(${upgrade.ID})`);
    }
  }
}

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
          Ad.src = "./Custom/Images/Capybara.png";
          capybarabonus = Math.round(Stats.money / capybarabonus_percent);
          Stats.money += capybarabonus;
          }
          break;
        case 2:
          Ad.src = "./Custom/Images/ad-1.png";
          break;
        case 3:
          Ad.src = "./Custom/Images/ad-2.png";
          break;
        case 4:
          Ad.src = "./Custom/Images/ad-3.png";
          break;
        case 5:
          Ad.src = "./Custom/Images/ad-4.png";
          break;
        case 6:
          Ad.src = "./Custom/Images/ad-5.png";
          break;
        case 7:
          Ad.src = ".Custom/Images/ad-6.png";
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

// * ---------^^^-DISPLAY THINGS-^^^--------------

//===========================================

// * ---------VVV-DEBUG THINGS-VVV--------------

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

// * ---------^^^-DEBUG THINGS-^^^--------------