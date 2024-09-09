const images = ['img/openhouse.jpg', 'img/udb1.jpg', 'img/udb2.jpg','img/udb3.jpg','img/udb4.jpg'];
let currentIndex = 0;
const instructions = document.getElementById('instructions');

function changeImage(index) {
  document.getElementById('current-image').src = images[index];
}

function handleKeydown(event) {
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % images.length;
  } else if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  changeImage(currentIndex);
}

document.addEventListener('keydown', handleKeydown);