const stringify = require('json-stringify');


// Hit GCV with an image to OCR and return the results
function performGCV(requests) {
//    console.log("in performGCV, requests: ", stringify(requests));
    const {ImageAnnotatorClient} = require('@google-cloud/vision').v1p4beta1;
//    const vision = require('@google-cloud/vision');
    console.log("vision loaded");


    if (!requests) return;

    // GCV Client
//    const client = new vision.ImageAnnotatorClient({
    const client = new ImageAnnotatorClient({
        keyFilename: './credentials.json'
    });
    // Performs label detection on the image file
    return client
        .batchAnnotateImages({requests: requests})
        .then(results => {
  //          console.log("results: ", stringify(results));
            return results[0];
        })
}

// Take an image path and output the data in a GCV compatible stream
function prepareGCV(images) {
    const fs = require('fs');

    return images.map(image => {
        return {
            fileName: image,
            image: {
                content: fs.readFileSync(image)
            }
        }
    })
    .map(d => {
        return {
            image: d.image,
            features: [{
                type: "DOCUMENT_TEXT_DETECTION",
                model: 'builtin/latest'
            }]
        }
    })
}

module.exports = {
    performGCV: performGCV,
    prepareGCV: prepareGCV
}
