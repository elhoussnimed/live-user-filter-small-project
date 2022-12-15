const usersContainer = document.querySelector(".users");
const searchInput = document.querySelector(".search-input");
const searchByNameOption = document.querySelector(".search-by-name span");
const searchByLocationOption = document.querySelector(
  ".search-by-location span"
);
const APIurl = "https://randomuser.me/api?results=50";
let usersData;

// get users data
axios
  .get(APIurl)
  .then((res) => {
    usersData = res.data.results;
    addUsersToContainer(usersData);
  })
  .catch((error) => {
    console.log(error.message);
  });

// add and remove check mark when click on the square
const checkmarks = document.querySelectorAll(".checkmark");
checkmarks.forEach((checkmark) => {
  checkmark.addEventListener("click", () => {
    checkmark.classList.toggle("active");
  });
});

// add and remove check mark when click on the label
const labels = document.querySelectorAll("label");
labels.forEach((label) => {
  label.addEventListener("click", () => {
    label.previousElementSibling.classList.toggle("active");
  });
});

// add users to the dom
function addUsersToContainer(users) {
  users.forEach((user) => {
    createUser(user);
  });
}

// create users
function createUser(userData) {
  const { name, location, picture } = userData;
  const fullName = `${name.first} ${name.last}`;
  const fullAdresse = `${location.city},${location.country}`;
  const user = `
        <div class="user">
            <img src="${picture.large}" alt="">
            <div class="user-infos">
                <p class="user-name">${fullName}</p>
                <p class="user-location">${fullAdresse}</p>
            </div>
        </div>
    `;
  usersContainer.innerHTML += user;
}

// search user by name
async function searchByName(searchValue) {
  const users = document.querySelectorAll(".user");
  users.forEach((user) => {
    const userName = user.querySelector(".user-name");
    if (!userName.innerHTML.toLowerCase().includes(searchValue)) {
      userName.closest(".user").style.display = "none";
    }
  });
}

// search user by location
async function searchByLocation(searchValue) {
  const users = document.querySelectorAll(".user");
  users.forEach((user) => {
    const userLocation = user.querySelector(".user-location");
    if (!userLocation.innerHTML.toLowerCase().includes(searchValue)) {
      userLocation.closest(".user").style.display = "none";
    }
  });
}

let isSearchByNameActive;
let isSearchByLocationActive;

function chooseSearchType() {
  if (searchByNameOption.classList.contains("active")) {
    isSearchByNameActive = true;
  } else {
    isSearchByNameActive = false;
  }

  if (searchByLocationOption.classList.contains("active")) {
    isSearchByLocationActive = true;
  } else {
    isSearchByLocationActive = false;
  }
}

// search user by name or by location
searchInput.addEventListener("input", () => {
  const errorMsg = document.querySelector(".errorMsg");
  chooseSearchType();

  if (isSearchByNameActive) {
    searchByName(searchInput.value);
    errorMsg.style.display = "none";
  } else if (isSearchByLocationActive) {
    searchByLocation(searchInput.value);
    errorMsg.style.display = "none";
  } else if (isSearchByNameActive && isSearchByLocationActive) {
    searchByName(searchInput.value);
    errorMsg.style.display = "none";
  } else if (!isSearchByNameActive && !isSearchByLocationActive) {
    errorMsg.style.display = "block";
  }

  if (searchInput.value.length === 0) {
    usersContainer.innerHTML = "";
    addUsersToContainer(usersData);
  }
});
