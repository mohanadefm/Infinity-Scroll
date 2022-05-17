const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "cgLL8vXvCXEyPnab8wU6WvgxFwWqKixwT_jHBPA4bZ4"; // const apiKey = "gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Create Elements For Links And Photos, Add To DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a/> to link to unsplash
    const a = document.createElement("a");
    a.setAttribute("href", photo.links.html);
    a.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.description);
    img.setAttribute("title", photo.description);
    // Event Listner, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <image> inside <a>, then put both inside imageContainer Element
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
}

// Get Photo From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

// Check to see if scrolling near bottom of page, to load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load Page
getPhotos();
