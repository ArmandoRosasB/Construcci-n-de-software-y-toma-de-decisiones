const filesystem = require('fs');
const readline = require('readline-sync');
const http = require('http');
const httpStatus = require('http-status-codes');

function promedio(list){
    let sum = 0;
    list.forEach(element => {
        sum += element;
    });

    return (sum/list.length).toFixed(2);
}

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


function rotateImage(image){
    let left = 0;
    let right = image.length - 1;

    while (left < right){
        i = 0;
        while (i < right - left){
            let top = left;
            let bottom = right;

            let aux = image[top][left + i];

            image[top][left + i] = image[bottom - i][left];
            image[bottom - i][left] = image[bottom ][right - i];
            image[bottom ][right - i] = image[top + i][right];
            image[top + i][right] = aux;

            i++;
        }

        left++;
        right--;
    }

    
}

function showMatrix(matrix){
    matrix.forEach(row => {
        row.forEach(column => {
            process.stdout.write(`${column} `);
        })
        console.log("\n");
    })
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




let again;

do {
    console.log("Bienvenido a mi laboratorio 8");
    console.log("\tMenu\n1. Escribir en un archivo de texto\n2. Calcular el promedio de varios datos\n3. Rotar una matriz aleatoria\n4. Crear un servidor y acceder a mis labos\n\n");
    
    let option = Number.parseInt(readline.question("Ingresa la opcion deseada: "));

    switch (option){
        case 1:
            let titulo = readline.question("Ingresa el titulo del archivo de texto: ");
            let string = readline.question("Ingresa el texto a agregar: ");
            toTextFile(titulo, string);
            break;

        case 2:
            let numbers = [];
            let more = 'Y';
            while (more === 'Y' || more === 'y'){
                numbers.push(Number.parseFloat(readline.question("Ingresa un numero: ")));
                more = readline.question("Desea agregar otro numero (Y/N): ");
            }
            console.log(`El promedio es ${promedio(numbers)}`);
            break;
        
        case 3:
            let matrix = [];
            let size = Math.floor(Math.random() * 6);

            for(let i = 0; i < size; i++){
                let aux = [];
                for(let j = 0; j < size; j++){
                    aux.push(Math.floor(Math.random() * 10));
                }
                matrix.push(aux);
            }

            showMatrix(matrix);
            rotateImage(matrix);
            console.log();
            showMatrix(matrix);
            
            break;
        
            case 4:
            break;
        default:
            console.log("Opcion invalida");
            break;
    }
    console.log();
    again = readline.question("Terminar proceso (Y/N): ");

    console.clear();
} while(again === 'N' || again == 'n');

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
    } else {
        sendErrorResponse(response);
    }
})

server.listen(port);
console.log(`The server is listening on port: ${port}`);