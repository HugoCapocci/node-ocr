const path = require('path');
const Tesseract = require('tesseract.js');

const parser = require('./parser');

const analyzeImage = (fileName) => {
  return new Promise((resolve, reject) => {

    Tesseract.recognize(fileName, {
      lang: 'fra'
    })
    // .progress((p) => { console.log('progress', p); })
    .catch(err => reject(err))
    .then((result) => {
      const text = result.text;
      console.log(text);
      
      console.log('========================================\n');
      
      console.log('Nom ', parser.getName(text));
      console.log('Date ', parser.getDate(text));
      console.log('Devise ', parser.getCurrency(text));
      console.log('Total à payer ', parser.getTotalAmount(text));
      console.log('TVA ', parser.getTva(text));

      console.log('========================================\n');
      
      resolve();
    });
  });
};

const images = [
  'ndf_resto2.jpeg',
  'cantine_good_quality.jpg',
  'ndf_resto.jpeg',
  'cantine_sg_bad_quality.JPG'
];

images.reduce((acc, image) =>
  acc.then(() => 
    analyzeImage(path.join(__dirname, `../../images/${image}`))
  )
, Promise.resolve());

// analyzeImage(path.join(__dirname, `../../images/${images[3]}`));
