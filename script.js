//Warning:
//my code suck
//so gl


//User Stats
var Stats = {
  money: 0,
  power: 1,
  autoclicker: 0,
};

//to add upgrades follow the instructions below
//1. add another upgrade div in HTML
//2. create another ID array below
var Upgrades = [
  {ID: 1, Name: "Upgrade1", Price: 25, Effect: 1, Type: "power"},
  {ID: 2, Name: "Upgrade2", Price: 150, Effect: 1, Type: "auto"},
  {ID: 3, Name: "Upgrade3", Price: 250, Effect: 10, Type: "power"},
  {ID: 4, Name: "Upgrade4", Price: 600, Effect: 10, Type: "auto"},
  {ID: 5, Name: "Upgrade5", Price: 1000, Effect: 75, Type: "power"},
  {ID: 6, Name: "Upgrade6", Price: 10000, Effect: 50, Type: "auto"},
  {ID: 7, Name: "Upgrade7", Price: 100000, Effect: 150, Type: "power"}
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
        Stats.power += upgrade.Effect;
      } else if (upgrade.Type == "auto") {
        autoclick();
        Stats.autoclicker += upgrade.Effect;
      }
    }
  }

  updatedisplay("money");
  updatedisplay("power");
  updatedisplay("autoclicker");
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
      
      //ad display
    case "ad":
      var ad_display = Math.floor(Math.random() * 4) + 1; //change the # in "Math.random() * #" for how many possible ads
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
      var cursor = 1; 

      switch (cursor) {
        case 1:
          document.documentElement.style.cursor = "var(--cursor-1)";
          break;
        case 2:
          document.documentElement.style.cursor = "var(--cursor-2)";
          break;
          
      }break;
  }
}
