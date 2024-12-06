//User Stats
var Stats = {
  money: 0,
  power: 1,
  autoclicker: 0
};

//chosen cursor
var cursor = 1;

//Rewards from clicking ad
function adclicked() {
  Stats.money += Stats.power;
  updatedisplay("money");
  updatedisplay("ad");
  updatedisplay("blocked");
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
      var ad_display = Math.floor(Math.random() * 3) + 1;
      
      switch (ad_display) {
        case 1:
          document.getElementById("Ad").src = "ad-1.png";
          break;
        case 2:
          document.getElementById("Ad").src = "ad-2.png";
          break;
        case 3:
          break;
      } break;
      
      //blocked display 
    case "blocked":
      document.getElementById("Blocked").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("Blocked").classList.add("hidden");
      }, 500);
      break;
      
      //cursor display
    case "cursor":
      
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
