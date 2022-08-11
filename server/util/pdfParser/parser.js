const pdf2base64 = require('pdf-to-base64');

module.exports = {
    parser: (filePath) => {
        pdf2base64(filePath)
            .then(data => {
                console.log('Data Parsed');
                return data;
            })
            .catch(e => { if (e) console.log(e) });
    }
}
