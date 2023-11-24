// Get the canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d", {
  willReadFrequently: true,
});
const tooltip = document.getElementById("tooltip");
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
  const highestImgValue = Math.max(img.width, img.height);
  const lowestImgValue = Math.min(img.width, img.height);
  aspectRatio = highestImgValue / lowestImgValue;

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
  const { canvasWidth, canvasHeight } = setCanvasSize(
    box,
    img,
    canvas,
    aspectRatio
  );

  // Get current canvas width and height
  const rect = canvas.getBoundingClientRect();
  // Get the mouse coordinates
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const imgWidth = img.width;
  const imgHeight = img.height;
  // Calculate the coordinates of the mouse relative to the image
  const xMultiplier = imgWidth / canvasWidth;
  const yMultiplier = imgHeight / canvasHeight;
  // Get the new coordinates relative to the img size
  const newX = x * xMultiplier;
  const newY = y * yMultiplier;
  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;

  // Get the color of the pixel at the mouse coordinates
  const pixel = context.getImageData(newX, newY, 1, 1).data;

  if (tooltip) {
    // Width of tooltip element.
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    // Calculate the luminance of the pixel.
    const luminance =
      (pixel[0] / 255) * 0.2126 +
      (pixel[1] / 255) * 0.7152 +
      (pixel[2] / 255) * 0.0722;

    tooltip.style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    tooltip.style.color = luminance > 0.5 ? "black" : "white";
    tooltip.innerHTML = `Image of trees. </br> Red:${pixel[0]}, Green: ${pixel[1]}, Blue: ${pixel[2]}`;

    const tooltipPosOffsetX = 20;
    const tooltipPosOffsetY = 24;

    tooltip.style.transform = `translate(${
      // If the tooltip would overflow the image element, it snaps to the right side of the image element.
      // We use 20px and 24 to prevent the tooltip from being too close to the mouse.
      x + tooltipPosOffsetX + tooltipWidth > boxWidth
        ? boxWidth - tooltipWidth - 1
        : x + tooltipPosOffsetX
      //
    }px,${
      y + tooltipPosOffsetY + tooltipHeight > boxHeight
        ? boxHeight - tooltipHeight - 1
        : y + tooltipPosOffsetY
    }px)`;
  }
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
