// Valid Parenthesis
class stack {
    constructor(){
        this.arr = [];
        this.index = 0;
        this.size = 0;
    }

    push(element){
        this.arr[this.index] = element;
        this.size++;
        this.index++;

    }

    top(){
        if(this.size == 0){
            return;
        }
        return this.arr[this.index - 1]
    }

    pop(){
        if (this.size === 0){
            return;
        }

        this.index--;
        this.size--;

    }

    empty(){
        return this.size == 0;
    }
}



// Funcions
function isValid(s) {
    parentheses = new stack();

    if (s[0] == ')' || s[0] == ']' || s[0] == '}'){
        return false;
    }

    for(let i = 0; i < s.length; i++){
        if(s[i] == '(' || s[i] == '[' || s[i] == '{'){
            parentheses.push(s[i]);
        }

        else if (parentheses.empty()){
            return false;
        }
        
        else if(parentheses.top() == '(' && s[i] == ')'){
            parentheses.pop();
        }
        

        else if(parentheses.top() == '[' && s[i] == ']'){
            parentheses.pop();
        }

        else if(parentheses.top() == '{' && s[i] == '}'){
            parentheses.pop();
        }
        
        else{
            return false;
        }
               
    }

    return parentheses.empty();
}  


const test1 = "(]";
const ans1 = false;
console.assert(ans1 == isValid(test1));

const test2 = "()";
const ans2 = true;
console.assert(ans2 == isValid(test2));

const test3 = "()[]{}";
const ans3 = true;
console.assert(ans3 == isValid(test3));




let validButton = document.getElementById("submit");

validButton.onclick = () => {
    let contenido = document.getElementById("parentheses").value;

    if (isValid(contenido)) {
        document.getElementById("validacion").innerHTML = "Es valido!";
    }
    else {
        document.getElementById("validacion").innerHTML = "No es valido!"
    }
}
