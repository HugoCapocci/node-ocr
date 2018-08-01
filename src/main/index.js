const path = require('path');
const Tesseract = require('tesseract.js');

const analyzeImage = (fileName) => {  
  Tesseract.recognize(fileName, {
    lang: 'fra'
  })
  .progress((p) => { console.log('progress', p); })
  .catch(err => console.error(err))
  .then((result) => {
    console.log(result.text);
    process.exit(0);
  });
}

analyzeImage(path.join(__dirname, '../../images/cantine_good_quality.jpg'));
