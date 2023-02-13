function Activities(name, src, clicks, views) {
  this.name = name;
  this.src = src;
  this.clicks = clicks;
  this.views = views;
  Activity.allActivities.push(this);
}

Activity.allActivities = [];

let totalClicks = 0;
const maxClicks = 6;

const activityNames = [
  "music",
  "mind-game",
  "reading",
  "board-game",
  "scrabble",
  "writting",
  "art",
  "basket-ball",
  "typing",
  "geography",
  "sport",
  "science",
  "piano",
  "play",
  "map",
  "build",
];

if (localStorage.getItem("activityData") == null) {
  for (let i = 0; i < productNames.length; i++) {
    new Activity(activityNames[i], `images/${activityNames[i]}.jpg`, 0, 0);
  }
} else {
  const activityData = JSON.parse(localStorage.getItem("activityData"));

  for (let i = 0; i < activityData.length; i++) {
    new Activity(activityData[i].name, activityData[i].src, activityData[i].clicks, activityData[i].views);
  }
}

// Function to generate random number
function randomActivityIdx() {
  return Math.floor(Math.random() * Activity.allActivities.length);
}

function renderImages() {
  // get three random activity indexes
  let Idx1 = randomActivityIdx();
  let Idx2 = randomActivityIdx();
  let Idx3 = randomActivityIdx();

  while (Idx1 === Idx2 || Idx1 === Idx3 || Idx2 === Idx3) {
    Idx2 = randomActivityIdx();
    Idx3 = randomActivityIdx();
  }

  // get three random product indexes
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  // change the source attribute of img1, img2 &img3 to be the src from our random products
  img1.src = Activity.allActivities[Idx1].src;
  img2.src = Activity.allActivities[Idx2].src;
  img3.src = Activity.allActivities[Idx3].src;

  img1.alt = Activity.allActivities[Idx1].name;
  img2.alt = Activity.allActivities[Idx2].name;
  img3.alt = Activity.allActivities[Idx3].name;

  // increase the views for the three activities we are looking at

  Activity.allActivities[Idx1].views++;
  Activity.allActivities[Idx2].views++;
  Activity.allActivities[Idx3].views++;
}

// listen for clicks on the images. check if the thing we clicked on is the container (as opposed to an image)
function handleClick(event) {
  if (event.target === imgContainer) {
    alert("You've got to click on the image");
  } else {
    totalClicks++;
  }

  // To increase clicks, check every single products "name" against the alt tag of the target and increase the clicks
  for (let i = 0; i < Activity.allActivities.length; i++) {
    if (event.target.alt === Activity.allActivities[i].name) {
      Activity.allActivities[i].clicks++;
      break;
    }
  }

  if (totalClicks === maxClicks) {
    alert("Thanks for voting");
    // remove the event listener so the game ends
    imgContainer.removeEventListener("click", handleClick);

    // To save the customer interractions in the localstorage
    const activitiesStr = JSON.stringify(Activity.allActivities);
    localStorage.setItem("activityData", activitiesStr);

    renderChart();
    return;
  } // get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

// function for renderChart
function renderChart() {
  let labelArray = [];
  let clicksArray = [];
  let viewsArray = [];

  for (let i = 0; i < Activity.allActivities.length; i++) {
    let activity = Activity.allActivities[i];
    labelArray.push(activity.name);
    clicksArray.push(activity.clicks);
    viewsArray.push(activity.views);
  }
  const data = {
    labels: labelArray,
    datasets: [
      {
        label: "views",
        data: viewsArray,
        backgroundColour: ["yellow", "pink"],
        borderColor: ["pink", "yellow"],
        borderWidth: 1,
      },
      {
        label: "Clicks",
        data: clicksArray,
        backgroundColor: ["blue", "#99e600"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            color: "blue",
          },
        },
        y: {
          ticks: {
            color: "blue",
          },
          beginAtZero: true,
        },
      },
    },
  };

  let canvasChart = document.getElementById("myChart");
  const myChart = new Chart(canvasChart, config);
}

// render the initial images
renderImages();

// function to set the theme of our website
function setIheme() {
  if (localStorage.getItem("theme") === "light" || localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark");
  }
}

const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", setIheme);

// function to get the current of our website
function getTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}
getTheme();
