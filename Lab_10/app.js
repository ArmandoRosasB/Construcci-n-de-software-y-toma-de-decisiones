const filesystem = require('fs');
const readline = require('readline-sync');
const http = require('http');
const httpStatus = require('http-status-codes');

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


function getViewUrl(url){ //Views Directory: html pages
    return `views${url}`;
};


function sendErrorResponse(res) { // Not found
    res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

function customReadFile(file_path, res){
    if (filesystem.existsSync(file_path)) {
        filesystem.readFile(file_path, (error, data) => {
            if (error) {
                console.error(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        sendErrorResponse(res);
    }
};


console.log("Inizializando Servidor");
const port = 3000;

const server = http.createServer((request, response) => {
    let url = request.url;
    if (url === '/'){
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(getViewUrl('/Index.html'), response);
    }
    else if (url.indexOf(".") == -1) {
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(getViewUrl(`${url}.html`), response);

    } else if (url.indexOf(".html") !== -1) {
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(getViewUrl(`${url}`), response);
    } else if (url.indexOf(".js") !== -1) {
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/javascript"
        });
        customReadFile(`./public${url}`, response);
    } else if (url.indexOf(".css") !== -1) {
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "text/css"
        });
        customReadFile(`./public${url}`, response);
    } else if (url.indexOf(".png") !== - 1) {
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/png"
        });
        customReadFile(`./public${url}`, response);
    } else if (url.indexOf(".svg") !== -1){
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/svg+xml"
        });
        customReadFile(`./public${url}`, response);
    } else if (url.indexOf(".jpeg") !== -1){
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/jpeg"
        });
        customReadFile(`./public${url}`, response);
    } else if (url.indexOf(".webp") !== -1){
        response.writeHead(httpStatus.StatusCodes.OK, {
            "Content-Type": "image/webp"
        });
        customReadFile(`./public${url}`, response);
    }
    else {
        sendErrorResponse(response);
    }
 
    if ( request.method == "POST"){
        const datos = []
        request.on('data', (dato) => {
            datos.push(dato);
        })

        return request.on("end", () => {
            const datos_completos = Buffer.concat(datos).toString();
            const user = datos_completos.split('&');
            const post = [];

            user.forEach(element => {
                if (element.indexOf("%40") !== -1){
                    element = `${element.slice(0, element.indexOf('%'))}@${element.slice(element.indexOf('%') + 3)}`;
                }
                post.push(element.slice(element.indexOf('=') + 1));
            })
            
            let text = `Name: ${post[0]}\nLastName: ${post[1]}\nEmail: ${post[2]}\nPreferred programming language: ${post[3]}\nMessage: ${post[4]}\n\n`;

            toTextFile(post[0] + post[1], text.replaceAll("+", " "));
            
        })


    }
    
})

server.listen(port);
console.log(`The server is listening on port: ${port}`);