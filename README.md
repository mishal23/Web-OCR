# Web-OCR
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Displays the text in English on an image, using Tesseract-OCR API to process the image to text
- Users can upload the image from the local system and the text on the image will be displayed in a panel box in the same format as in the image.

Video presentation of the application running [here](https://www.youtube.com/watch?v=OwzJh12qPWs)

### Assumptions and Limitations
- Reading the [Improve Quality](https://github.com/tesseract-ocr/tesseract/wiki/ImproveQuality) Wiki page for stated to work on ```Rescaling```,
```Binarisation```,```Noise Removal```,```Rotation/Deskewing```,```Border Removal```
- It fails if the text in the image is rotated upto certain extent and also when there are borders, i.e fails for border removal
- The accuracy of the text displayed becomes less if the font-size is less, and also if some new font-family is used.

### Accuracy and Adaptability
- Jimp image processing library is used to Rescale the image,converting to black and white, noise in image, rotation upto certain extent.
- The accuracy isn't 100%, but works fine with clear text on an image.

### Running the Project
- Go through the [InstallationGuide.md](https://github.com/mishal23/Web-OCR/blob/master/InstallationGuide.md) to install ```Leptonica``` and ```Tesseract-OCR```, also install ```node```
- Head to the directory of the application using Terminal and type ```npm install```  to download the packages
- Type ```npm start```
- Head to a Browser and type ```http://localhost:3000/```

### Contribution
- The repository is open to contribution from all interested developers.
- You may go through [CONTRIBUTING.md](https://github.com/mishal23/Web-OCR/blob/master/CONTRIBUTING.md) to get detailed instructions on how and where you can contribute.
- Also, you can write by opening an [Issue](https://github.com/mishal23/Web-OCR/issues) and also solve a current issue if possible.
- Fork this project to your Github acoount.
- After forking, clone the repository to local system and make the necessary changes.
- Kindly send Pull Requests with explanation as to what changes you have done.

### License
- The project is under [MIT License](https://github.com/mishal23/Web-OCR/blob/master/LICENSE)
