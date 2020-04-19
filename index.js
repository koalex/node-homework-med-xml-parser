const fs = require('fs');
const saxStream = require('sax').createStream(true, {
	lowercase: true,
    xmlns: true
});

const readStream = fs.createReadStream('./small.xml');
const writeStream = fs.createWriteStream('./result.json');

readStream.pipe(saxStream);

saxStream.on('opentag', node => {
	console.log('ТЭГ ОТКРЫЛСЯ', node);
});

saxStream.on('text', node => {
	console.log('ТЕКСТ ВНУТРИ ТЭГА', node);
});

saxStream.on('closetag', node => {
	console.log('ТЭГ ЗАКРЫЛСЯ', node);
});

writeStream.write('[\n');

writeStream.write(
	JSON.stringify({
		"name": "Пример",
		"inn": "7841378964"
	}) + '\n'
);

writeStream.end(']');
