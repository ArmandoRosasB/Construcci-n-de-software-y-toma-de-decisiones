function isSafeEnough(password){
    let valid_number = 0;
    if (password.match(/^([^A-Za-z0-9_]{1,3}[A-Za-z0-9_]{1,3})|([A-Za-z0-9_]{1,3}[^A-Za-z0-9_]{1,3}){2,}$/) != null){
        console.log("pwd super validada")

        valid_number++;
    }
    

    return valid_number;
}

function moveBar(level) {
    if (level == 1) {
        if (clientWidth = document.getElementById('progress-bar').clientWidth < 1){
            let elem = document.getElementById("progress-bar");
            let width = 1;
            let id = setInterval(frame, 10);
            function frame() {
                if (width < 100) {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    }
    else {
        if (clientWidth = document.getElementById('progress-bar').clientWidth >299){
            let elem = document.getElementById("progress-bar");
            let width = 100;
            let id = setInterval(frame, 10);
            function frame() {
                if (width > 0) {
                    width--;
                    elem.style.width = width + "%";
                }
            }
        }
    }
}


let pwd = document.getElementById("pwd");
let cpwd = document.getElementById("c-pwd");

pwd.onkeyup = () => {
    if (isSafeEnough(pwd.value) === 1) {
        moveBar(1);
        pwd.style.background = "rgb(23, 228, 239)";
    }
    else{
        moveBar(0);
        pwd.style.background = "#ff6347";      
    }
}


cpwd.onkeyup = () => {

    if (cpwd.value === document.getElementById("pwd").value && isSafeEnough(cpwd.value)){
        document.getElementById("Go").innerHTML =
        "<input type=\"button\" value=\"Nice Password\"/>"; 

        const colors = document.querySelectorAll(".not-color");

        colors.forEach( (container) => {
            container.classList.replace("not-color", "p-color");
        })

        cpwd.style.background = "rgb(23, 228, 239)";
    }  
    else{
        document.getElementById("Go").innerHTML =""; 
        const colors = document.querySelectorAll(".p-color");

        colors.forEach( (container) => {
            container.classList.replace("p-color", "not-color");
        })

        cpwd.style.background = "#ff6347";
    }
}

let requisitos = document.getElementById("advice");

requisitos.onmouseover = () => {
    alert("Requirements password");
    alert("Have at least 1 sequence of alphanumeric characters and 1 sequence of non-alphanumeric characters. This at least 2 times");
    alert("Warning: Sequences must be between 1 and 3 characters");
}
