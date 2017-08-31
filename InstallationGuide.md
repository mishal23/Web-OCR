# Installation Guide for Ubuntu Linux 16.04 LTS
- This guides you through installation of Leptonica, Tesseract-OCR, and finally test if everything is properly installed.
### Dependencies
- Following libraries are needed
```shell
sudo apt-get install autoconf automake libtool
sudo apt-get install autoconf-archive
sudo apt-get install pkg-config
sudo apt-get install libpng12-dev
sudo apt-get install libjpeg8-dev
sudo apt-get install libtiff5-dev
sudo apt-get install zlib1g-dev
sudo apt-get install libicu-dev
sudo apt-get install libpango1.0-dev
sudo apt-get install libcairo2-dev
sudo apt-get install xzgv
```
### Leptonica
- Leptonica is needed to run Tessearct, so steps to build from source
```shell
git clone https://github.com/DanBloomberg/leptonica.git

cd leptonica
autoreconf -i  #-i for 1st time, else -vi is also fine
./autobuild
./configure
./make-for-auto

sudo make   #takes around 10 mins depending on your system
sudo make install   

LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
sudo ldconfig
```
### Tesseract
- Building Tesseract from source
```shell
git clone https://github.com/tesseract-ocr/tesseract.git
cd tesseract/
autoreconf -i  #-i for the 1st time, else -vi is also fine
./autogen.sh
./configure --enable-debug
LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" make
sudo make install
sudo ldconfig
make training
sudo make training-install
export LD_LIBRARY_PATH=/usr/local/lib
```

To test Tesseract and Leptonica are installed type: 
```tesseract --version```

Output:
```shell
tesseract 4.00.00dev-622-g27d25e9
 leptonica-1.74.4
  libjpeg 8d (libjpeg-turbo 1.4.2) : libpng 1.2.54 : libtiff 4.0.6 : zlib 1.2.8

 Found AVX2
 Found AVX
 Found SSE
```
-------------------------------------------------------------------------------------------------

Download the languages/datafiles from [here](https://github.com/tesseract-ocr/tesseract/wiki/Data-Files)

Save the file in <b>tessdata</b> folder of tesseract and type
```
export TESSDATA_PREFIX=~/tesseract/tessdata/
```

### Testing
- To test if the everything is properly installed
```shell
cd tesseract/testing
display eurotext.tif    #displays/opens the testing image
tesseract eurotext.tif out -l eng     #This will generate out.txt file,only for English Language
cat out.txt         #shows output of the text in English in image eurotext.tif
```

### FootNotes
I did not get any error while running the commands though if you get here are a few links which may help you out.

Leptonica
- [Build Leptonica from source video](https://www.youtube.com/watch?v=vOdnt2h1U8U)
- [Build Leptonica from source WebPage](http://www.leptonica.org/source/README.html)

Tesseract
- [Build Tesseract-OCR from source video](https://www.youtube.com/watch?v=WZLJucXZy-g)
- [StackOverflow for help](https://stackoverflow.com/questions/4743233/is-usr-local-lib-searched-for-shared-libraries)
