const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const resultElement = document.getElementById('result');
const switchCameraButton = document.getElementById('switchCamera');
const context = canvas.getContext('2d');
let useFrontCamera = false;
let currentStream;

function startVideo() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    const constraints = {
        video: {
            facingMode: useFrontCamera ? 'user' : 'environment'
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        })
        .catch(err => {
            console.error('Error accessing the camera: ', err);
            resultElement.innerText = 'Error accessing the camera: ' + err.message;
        });
}

function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            drawLine(context, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(context, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            resultElement.innerText = 'QR Code Data: ' + code.data;
        } else {
            resultElement.innerText = "No QR code detected.";
        }
    }
    requestAnimationFrame(tick);
}

function drawLine(context, begin, end, color) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.lineWidth = 4;
    context.strokeStyle = color;
    context.stroke();
}

switchCameraButton.addEventListener('click', () => {
    useFrontCamera = !useFrontCamera;
    startVideo();
});

startVideo();
