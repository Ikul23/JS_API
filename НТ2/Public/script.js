document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const dots = document.querySelectorAll(".dot");

  const images = slider.children;
  const totalImages = images.length;

  let currentIndex = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
  }

  function goToImage(index) {
    currentIndex = index;
    updateSlider();
  }

  prevButton.addEventListener("click", showPrevImage);
  nextButton.addEventListener("click", showNextImage);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToImage(index));
  });

  updateSlider(); // Initialize the slider
});
