const display1 = document.querySelector(".display-1");
const display2 = document.querySelector(".display-2");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");
const buttons = document.querySelectorAll(".button");
const replacex = "*";
clearLast.addEventListener("click",clearlast);
clearAll.addEventListener("click",clearall);
equal.addEventListener("click",evaluate);

let display1_num = "";
let display2_num = "";
let temp="";
let result = null;
let lastOperation = "";
let haveDot = false;
let operations=["+","-","/","%","x"];
let inputs=[];

buttons.forEach((button)=>{
    button.addEventListener("click", (e) => {
        if (e.target.innerText === "=") {
            return;
        }
        if(e.target.innerText ==="AC" || e.target.innerText ==="C"){
            return;
        }
        if(operations.includes(e.target.innerText) && (operations.includes(inputs[inputs.length-1]))){
            return;
        }
        if(e.target.innerText ==="." && (operations.includes(inputs[inputs.length-1]))){
            return;
        }
        if((operations.includes(e.target.innerText)) && inputs[inputs.length-1]=="."){
            return;
        }
        if((inputs.length==0) && (operations.includes(e.target.innerText))){
            return;
        }
        inputs.push(e.target.innerText);
        display2_num += e.target.innerText;
        display2.innerText = display2_num;
    });
});
function clearall(){
    display2_num="";
    display2.innerHTML="";
    inputs.length=0;
    display1.innerHTML=inputs;
}
function clearlast(){
    inputs.pop();
    temp=display2_num.slice(0,-1);
    display2_num=temp;
    display2.innerText = temp;
}
function evaluate(){
    let counter = 0;
    let counter2 = 0;
    if(operations.includes(inputs[inputs.length-1])){
        display2_num=display2_num.slice(0,-1);
        display2.innerHTML=eval(display2_num);
    }
    for(let i=0;i<inputs.length;i++){
        if(operations.includes(inputs[i])){
            counter++;
        }
    }
    for(let i=0;i<inputs.length;i++){
        if(inputs[i] == "."){
            counter2++;
        }
    }
    if(counter2>counter){
        display2.innerHTML="Invalid input";
    }
    result = eval(display2_num.replaceAll("x",replacex));
    display1.innerHTML=display2_num;
    display2.innerHTML=result;
    display2_num=result;
    while(inputs.length!=0){
        inputs.pop();
    }
    inputs.push(result);
}
