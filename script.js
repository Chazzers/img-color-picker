// Get the canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const nice = document.getElementById("nice");
const img = document.getElementById("img");
const box = document.getElementById("box");

// Load the image
// var img = new window.Image();
img.crossOrigin = "anonymous";
let aspectRatio;
img.src = "environment.jpg";
img.style.display = "none";

// Wait for the image to load before drawing it on the canvas
img.onload = function () {
  // Set the canvas size to match the image size
  canvas.width = img.width;
  canvas.height = img.height;
  aspectRatio =
    img.width > img.height ? img.width / img.height : img.height / img.width;

  // Draw the image on the canvas
  context.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  setCanvasSize(box, img, canvas, aspectRatio);
};

window.addEventListener("resize", () => {
  setCanvasSize(box, img, canvas, aspectRatio);
});

// Add a mousemove event listener to the canvas
canvas.addEventListener("mousemove", function (event) {
  const { canvasWidth, canvasHeight } = setCanvasSize(box, img, canvas);

  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  const xMultiplier = img.width / canvasWidth;
  const yMultiplier = img.height / canvasHeight;
  const newX = x * xMultiplier;
  const newY = y * yMultiplier;

  // Get the color of the pixel at the mouse coordinates
  var pixel = context.getImageData(newX, newY, 1, 1).data;

  const captionPosX = x + 10;
  const captionPosY = y + 10;
  nice.style.transform = `translate(${captionPosX}px, ${captionPosY}px)`;
  nice.textContent = `R: ${pixel[0]}, G: ${pixel[1]}, B: ${pixel[2]}`;
  nice.style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
});

function setCanvasSize(box, img, canvas, aspectRatio) {
  // Get the coordinates of the mouse relative to the canvas
  const boxRect = box.getBoundingClientRect();
  const boxHeight = boxRect.height;
  const boxWidth = boxRect.width;
  const highestBoxValue = boxHeight >= boxWidth ? boxHeight : boxWidth;
  const lowestBoxValue = boxHeight <= boxWidth ? boxHeight : boxWidth;
  const boxAspectRatio = highestBoxValue / lowestBoxValue;
  let canvasWidth;
  let canvasHeight;

  if (img.width === img.height) {
    canvasWidth = boxWidth >= boxHeight ? boxWidth : boxWidth * boxAspectRatio;
    canvasHeight =
      boxHeight >= boxWidth ? boxHeight : boxHeight * boxAspectRatio;
  } else if (img.width > img.height) {
    canvasWidth =
      boxWidth >= boxHeight ? boxWidth * aspectRatio : boxHeight * aspectRatio;
    canvasHeight = boxWidth >= boxHeight ? boxWidth : boxHeight;
  } else if (img.width < img.height) {
    canvasWidth = boxWidth >= boxHeight ? boxWidth : boxHeight;
    canvasHeight =
      boxWidth >= boxHeight ? boxWidth * aspectRatio : boxHeight * aspectRatio;
  }

  const pixelWidth = `${canvasWidth}px`;
  const pixelHeight = `${canvasHeight}px`;

  canvas.style.width = pixelWidth;
  canvas.style.height = pixelHeight;
  return { canvasWidth, canvasHeight };
}
