const galleryImages = [
    'src/Richard.png'
];

let currentIndex = 0; // Start with the first image

// Function to update the gallery image
function updateGalleryImage(index) {
    const imageElement = document.getElementById('galleryImage');
    imageElement.src = galleryImages[index];
}

// Event listeners for buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        updateGalleryImage(currentIndex);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex += 1;
        updateGalleryImage(currentIndex);
    }
});
