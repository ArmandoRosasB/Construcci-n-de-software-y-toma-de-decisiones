const express = require('express');
const path = require('path');
const filesystem = require('fs');

function fileExists(path) {
    try {
        let stats = filesystem.statSync(path);
        return true;
      }
      catch(err) {
        if (err.code == 'ENOEF'){
            return false;
        }
      }
}


function toTextFile(title, string){
    let name;

    if (title.match(/^([A-Za-z0-9_])+\.txt$/)){
        name = title;
    }
    else {
        name = `${title}.txt`;
    }

    if (!fileExists(name)){
        filesystem.writeFileSync(name, string);
    } else {
        filesystem.appendFileSync(name, `\n${string}`);
    }

}

const router = express.Router();

router.get('/Portfolio', (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'AboutMe.html'));
});

router.post('/Portfolio', (request, response, next) => {
    const body = Object.values(request.body);
    let text = `Name: ${body[0]}\nLastName: ${body[1]}\n$Email: ${body[2]}\nPreferred programming language: ${body[3]}\nMessage: ${body[4]}\n\n`;
    toTextFile(body[0] + body[1], text);
    response.sendFile(path.join(__dirname, '..', 'views', 'AboutMe.html'));

});

module.exports = router;