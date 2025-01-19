const API_KEY = "FDFlqir_ah3FpusR1RCL4oCsQTHfhCJ7w5UdrnmEyUo"; 
const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeButton = document.getElementById("like-button");
const likeCounter = document.getElementById("like-counter");
const photoHistory = document.getElementById("photo-history");

let likeCount = 0;
let photoHistoryList = [];


const fetchRandomPhoto = async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayPhoto(data);
        saveToHistory(data);
    } catch (error) {
        console.error("Error fetching photo:", error);
        alert("Failed to fetch photo. Please try again later.");
    }
};


const displayPhoto = (data) => {
    photoElement.src = data.urls.regular;
    photographerElement.innerHTML = `Photo by <a href="${data.user.links.html}" target="_blank">${data.user.name}</a>`;
};


const saveToHistory = (data) => {
    photoHistoryList.push(data);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <img src="${data.urls.thumb}" alt="Thumbnail" class="me-2 rounded" style="width: 50px;">
        <a href="${data.links.html}" target="_blank">${data.user.name}</a>
    `;
    photoHistory.prepend(listItem);
};


likeButton.addEventListener("click", () => {
    likeCount++;
    likeCounter.textContent = likeCount;
});


fetchRandomPhoto();
