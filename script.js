document.getElementById('generateBtn').addEventListener('click', function() {
    var name = document.getElementById('nameInput').value;
    var backgroundSize = document.getElementById('backgroundSizeInput').value || 'cover';

    if (name.trim() !== '') {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // Clear previous content

        // Load custom background image
        var backgroundImage = new Image();
        backgroundImage.onload = function() {
            var aspectRatio = backgroundImage.naturalWidth / backgroundImage.naturalHeight;

            // Calculate canvas dimensions to fit the image container
            var maxWidth = imageContainer.clientWidth;
            var maxHeight = imageContainer.clientHeight;
            var canvasWidth = Math.floor(maxWidth * window.devicePixelRatio);
            var canvasHeight = Math.floor(canvasWidth / aspectRatio);

            // Scale canvas for high-resolution displays
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            // Resize canvas and draw background image
            ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

            // Calculate font size relative to image height
            var fontSizePercentage = 0.1; // Adjust as needed (e.g., 0.1 = 10% of image height)
            var fontSize = Math.floor(canvasHeight * fontSizePercentage);

            // Draw name on the canvas
            ctx.font = fontSize + 'px Arial';
            var textWidth = ctx.measureText(name).width;
            var textX = (canvasWidth - textWidth) / 2; // X position for centering text horizontally
            var textY = canvasHeight / 2; // Y position for centering text vertically

            ctx.fillStyle = '#000';
            ctx.fillText(name, textX, textY); // Position the name in the middle

            // Create a new image element for display
            var image = new Image();
            image.src = canvas.toDataURL();
            image.style.width = '100%'; // Make the image fit the container width
            imageContainer.appendChild(image);

            // Create download link
            var downloadLink = document.createElement('a');
            downloadLink.classList.add('button-link');
            downloadLink.textContent = 'Download Image';
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = 'custom_image.png';
            imageContainer.appendChild(downloadLink);
        };

        backgroundImage.src = 'image.jpg'; // Specify the path to your custom background image
        backgroundImage.style.backgroundSize = backgroundSize; // Set background size for the image
    } else {
        alert('Please enter a name.');
    }
});


