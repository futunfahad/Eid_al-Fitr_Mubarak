var imagee = "arabiccard.jpeg";
var button_link="حمل الصورة";
function setLanguage(lang) {
    var pageTitle = document.getElementById('pageTitle');
    var nameLabel = document.getElementById('nameLabel');
    var backgroundSizeLabel = document.getElementById('backgroundSizeLabel');
    var nameInput = document.getElementById('nameInput');
    var generateBtn = document.getElementById('generateBtn');
  
    if (lang === 'ar') {
        pageTitle.textContent = 'عيدكم مبارك';
        nameLabel.textContent = 'ادخل اسمك';
        nameInput.placeholder = "اسمك";
        generateBtn.textContent = "افتح معايدتك";
        backgroundSizeLabel.textContent = 'حجم صورة الخلفية:';
        button_link = "حمل الصورة";
        imagee = "arabiccard.jpeg";
    } else if (lang === 'en') {
        pageTitle.textContent = 'Eid Mubarak';
        nameLabel.textContent = 'Enter your name';
        nameInput.placeholder = "your name";
        generateBtn.textContent = "Open your greeting";
        backgroundSizeLabel.textContent = 'Background Image Size:';
        imagee = "englishcard.jpeg";
        button_link="download image";
    }
   // This will log the image path based on the selected language
}
console.log(imagee); 
document.getElementById('generateBtn').addEventListener('click', function() {
    var name = document.getElementById('nameInput').value;

    if (name.trim() !== '') {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = ''; // Clear previous content

        // Load custom background image
        var backgroundImage = new Image();
        backgroundImage.onload = function() {
            var canvasWidth = backgroundImage.naturalWidth;
            var canvasHeight = backgroundImage.naturalHeight;

            // Set canvas size to match background image size
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Draw background image
            ctx.drawImage(backgroundImage, 0, 0);

            // Calculate font size relative to canvas height
            var fontSizePercentage = 0.05; // Adjust as needed (e.g., 0.1 = 10% of canvas height)
            var fontSize = Math.floor(canvasHeight * fontSizePercentage);

            // Draw name on the canvas
            ctx.font = fontSize + 'px Arial';
            var textWidth = ctx.measureText(name).width;
            var textX = (canvasWidth - textWidth) / 2; // X position for centering text horizontally
            var textY = (canvasHeight / 2)+(canvasHeight*0.351); // Y position for centering text vertically

            ctx.fillStyle = '#000';
            ctx.fillText(name, textX, textY); // Position the name in the middle

            // Create a new image element for display
            var image = new Image();
            image.src = canvas.toDataURL('image/png', 1); // Save as PNG with maximum quality
            image.style.width = '100%'; // Make the image fit the container width
            imageContainer.appendChild(image);

            // Create download link
            var downloadLink = document.createElement('a');
            downloadLink.classList.add('button-link');
            downloadLink.textContent = 'حمل الصورة';
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



