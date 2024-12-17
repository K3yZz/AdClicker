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
  autoclick();
};

//to add upgrades follow the instructions below
//1. add another upgrade div in HTML
//2. create another ID array below
var Upgrades = [
  {ID: 1, Name: "Upgrade1", Price: 25, Effect: 1, Type: "power"},
  {ID: 2, Name: "Upgrade2", Price: 150, Effect: 1, Type: "auto"},
  {ID: 3, Name: "Upgrade3", Price: 250, Effect: 10, Type: "power"},
  {ID: 4, Name: "Upgrade4", Price: 2000, Effect: 10, Type: "auto"},
  {ID: 5, Name: "Upgrade5", Price: 2500, Effect: 75, Type: "power"},
  {ID: 6, Name: "Upgrade6", Price: 25000, Effect: 50, Type: "auto"},
  {ID: 7, Name: "Upgrade7", Price: 100000, Effect: 150, Type: "power"},
  {ID: 8, Name: "Prestige1", Price: 1000000, Effect: 0, Type: "prestige"}
]

//Rewards from clicking ad
function adclicked() {
  Stats.money += Stats.power;
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
      var ad_display = Math.floor(Math.random() * 6) + 1; //change the # in "Math.random() * #" for how many possible ads
      var Ad = document.getElementById("Ad");
      switch (ad_display) {
        case 1:
          Ad.src = "./Images/ad-1.png";
          break;
        case 2:
          Ad.src = "./Images/ad-2.png";
          break;
        case 3:
          Ad.src = "./Images/ad-3.png";
          break;
        case 4:
          Ad.src = "./Images/ad-4.png";
          break;
        case 5:
          Ad.src = "./Images/ad-5.png";
          break;
        case 6:
          var rare_ad = Math.floor(Math.random() * 20) + 1; //if you get this image then you beat the odds
          if (rare_ad == 7) { //there is a 1.67% chance to get this ad lol
          Ad.src = "./Images/Capybara.png";
          Stats.money += Math.round(Stats.money / 10);
          }
          break;
      } break;
      
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
    case "popupwindow":
      document.getElementById("PopupWindow").classList.add("hidden");
      break;
  }
}

var Popupwindowtext = [
  {ID: 1, 
  Text1: "V1.0.0",
  Text2: "Ad Block Clicker",
  Text3: "Welcome to my game its in beta rn so expect bugs, progress loss, etc. Close the this window with the X have fun!",
  Text4: "Decreased capybara chance; 1.67% -> 0.83%<br>Increased prestige multiplier; +0.5 - > +1<br>Capybara gives 10% of player money<br>Added settings"},
  {ID: 2, 
    Text1: "V1.0.0",
    Text2: "Settings",
    Text3: "Settings stuff",
    Text4: { label: "Reset", onclick: "resetprogress()" },
  },
]

function popupwindowdisplay(selectedpopup) { //yes i took this from chatgpt shhhh it was to complex
  document.getElementById("PopupWindow").classList.remove("hidden");
  const popupData = Popupwindowtext.find((popup) => popup.ID === selectedpopup);
  if (popupData) {
    document.getElementById("PopupWindow-innertext-1").textContent = popupData.Text1;
    document.getElementById("PopupWindow-innertext-2").textContent = popupData.Text2;
    document.getElementById("PopupWindow-innertext-3").textContent = popupData.Text3;
    
    const text4Container = document.getElementById("PopupWindow-innertext-4");

    if (typeof popupData.Text4 === "string") {
      text4Container.innerHTML = popupData.Text4;
    } else if (typeof popupData.Text4 === "object" && popupData.Text4.label && popupData.Text4.onclick) {
      text4Container.innerHTML = ""; 
      const button = document.createElement("button");
      button.textContent = popupData.Text4.label;
      button.setAttribute("onclick", popupData.Text4.onclick);
      text4Container.appendChild(button);
    }
  } 
} 

function resetprogress() {
    if(confirm("Are you sure?")) {
      Stats.money = 0;
      Stats.autoclicker = 0;
      Stats.power = 1;
      Stats.multiplier = 1;
    } else alert("ok!");
  }