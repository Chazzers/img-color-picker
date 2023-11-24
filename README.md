# Creating an image color picker
<img width="704" alt="image" src="https://github.com/Chazzers/img-color-picker/assets/33430669/b314db19-7ac9-46c3-94f8-fa4e67f73bfe">

## Assignment Context

During my internship, I was tasked with creating a tooltip on hover for the company's website, displaying the alt-text of the image. To make this tooltip unique, a designer proposed the idea of dynamically changing the tooltip's background color based on the pixel color where the mouse hovers. This seemed like a nice challenge, so I started exploring options.

## Technologies

The website was written in the JavaScript framework React.js combined with Next.js. The image source comes from the headless CMS Sanity.

## Challenges

### Challenge 1: Dynamic Changing of Background Color on Hover

The first challenge was to change the background color on hover position of the mouse over the image. This challenge can be broken down into two challenges:

1. Extract the color of the pixel the mouse hovers over.
2. Use this color to change the background color of the tooltip.

However, both these challenges were easily solved as the examples found online were easy to understand and seemed to do the trick.

### Challenge 2: Dynamic Sizing

One of the hurdles I encountered fairly quickly was that when sizing a canvas with CSS, the visual size of the canvas changed, but the actual canvas didn't. This caused issues with the hover color extraction, resulting in the extraction of the wrong color. To fix this, I had to devise some funky formulas to resize the canvas, ensuring it scaled correctly with CSS sizing.

#### How My Canvas Scaling Function Works

Imagine you have a webpage where you want to display an image within a designated box, and you also have a canvas that should surround this image. Now, this function helps you figure out the ideal size for that canvas.

First, it grabs the dimensions of the container (the box) and the image. Then, it calculates the aspect ratio of the container. The fun part begins when deciding how to adjust the canvas size based on the image and container dimensions.

Finally, the function sets the canvas size in pixels and returns the calculated width and height for reference. Essentially, it ensures the canvas fits nicely around the image within its designated container, taking into account the proportions of both.

Eventually ending up with the result on top: A scalable image color picker.
