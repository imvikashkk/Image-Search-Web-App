const accessKey = "ZCFFHL15H_tjksKDUzPmwMiXT8ild1bvEnRqfcsDxyk"; // From API


const formE = document.querySelector("form");
const searchInputE = document.getElementById("searchInput");
const searchResults = document.getElementsByClassName("searchResultContainer")[0];
const showMoreButton = document.getElementById("showMoreButton");
const navSearch = document.getElementsByClassName("nav-search");
const navList = document.getElementById("nav-list");


let inputData = "";
let page = 1;

// Main Function For Fetching Results From API
async function searchImages(searchItems) {
    inputData = searchItems;
    let url = `https://api.unsplash.com/search/photos?page=${page}
              &query=${inputData}&client_id=${accessKey} `;

    
    // (async () => {
        let response = await fetch(url);
        let data = await response.json();
    // })();

    const results = data.results;


    if (page == 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("searchResult");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');

        links = result.links;
        imageLink.href = links.download;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++;
    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

// Searching By Input Values
formE.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages(searchInputE.value);
})

// Searcing By Navbar Values
for (let i = 0; i < navSearch.length; i++) {
    navSearch[i].addEventListener("click", (event) => {
        event.preventDefault();
        page = 1;
        searchImages(navSearch[i].textContent);
        searchInputE.value = navSearch[i].textContent;
    })
}

// Show More Button
showMoreButton.addEventListener("click", (event) => {
    searchImages(searchInputE.value);
})



