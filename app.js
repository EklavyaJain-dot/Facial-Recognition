const uploadimage = document.getElementById("uploadimage")

// Calling and Producing the modules atr the same time using promise (Array)

Promise.all([
//Modules 
faceapi.nets.faceRecognitionNet.loadFromUri('models'),

//Detection of where the Faces are
faceapi.nets.faceLandmark68Net.loadFromUri('models'),

//Detection of Particular Face
faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
]).then(start)  // Returning the Promise 

 function start(){
    document.body.append('Loaded'); // As soon as our models are loaded it will show the text as Loaded
    uploadimage.addEventListener('change', async () => { // Whenever we change or select the image the aysncronus function should be called
    const image  = await faceapi.bufferToImage(uploadimage.files[0])  // Get Image
    const detections  = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()  /*Detect Faces, to locate faces, 
    Describe the image be showing a recatangle*/
    document.body.append(detections.length); // Show the number of Faces
    document.body.append(image)   // Upload the IMG on user's screen
    const container = document.createElement('div');
    container.style.position = 'absolute';
    document.body.append(container);
    const canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas);
    container.append(image);
    const displayimagesize = {width: image.width, height:image.height}
    faceapi.matchDimensions(canvas, displayimagesize);
    const resisedDetections = faceapi.resizeResults(detections, displayimagesize);
    resisedDetections.forEach(detection => {
        const box = detection.detection.box 
        const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
        drawBox.draw(canvas)
    })
    })
} 