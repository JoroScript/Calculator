
let clear=document.querySelector('#clear');
let container=document.querySelector('#container');
let resultDisplay=document.querySelector('#result');
let operator;
let selectedNum1='0';
let selectedNum2='0';
let total=0;
let actionFlag=false;
resultDisplay.textContent=selectedNum1;
let action='';
let bothInputted=false;
let selected=false;
let operated=false;
let currentNumber=''
let currentAction='';
let operands=document.querySelectorAll('.operand');
let numTotal="0";
let actionCount=0;

container.addEventListener('click',(event)=>{

   let target=event.target;
   // if actionflag is false  this means an action hasn't been done yet which means we are still inputting the first number 
        if(target.classList.contains('number')){
            if(resultDisplay.textContent==total && total && !actionFlag){
                console.log("total in this is "+total);
                clearAll();
            }
            if(currentNumber){
                currentNumber.style.border="1px solid black"
               }
               target.style.border="2px solid black"
                currentNumber=target;
            if(numTotal==="0"){
                numTotal='';
             }
                switch(target.id){
                    case "num0":
                            numTotal+='0';
                       break;
                    case "num1":
                        numTotal+='1';
                       break;
                    case "num2":
                        numTotal+='2';
                       break;
                    case "num3":
                        numTotal+='3';
                       break
                    case "num4":
                        numTotal+='4';        
                       break;
                    case "num5":
                        numTotal+='5';
                       break;
                    case "num6":
                        numTotal+='6';
                       break;
                    case "num7":
                        numTotal+='7';
                       break;
                    case "num8":
                        numTotal+='8';
                       break;
                    case "num9":
                        numTotal+='9';
                      break;
                        
                       
                }
            if(actionFlag){
                bothInputted=true;
                selectedNum2=numTotal;
            }
            else{
                selectedNum1=numTotal;
                console.log(selectedNum1);
            }
           }
    
//    // this means that action flag is true - which means we are typing the second number now  
   if(target.classList.contains('action')){
    
    actionCount++;
    switch(target.id){
        case "multiply":
            action="multiply";
            break;
        case "subtract":
            action="subtract";
            break;
        case "divide":
            action="divide";
            break;
        case "add":
            action="add";
            break;
    }
    if(actionCount===2){
        selectedNum2=selectedNum1;
        if(operated){
            operate(action,total,total);
        } 
        else operate(action,selectedNum1,selectedNum2);
        actionCount=0;
    }
    if(currentAction){
        currentAction.style.outline="none"
       }
       target.style.outline="1px solid black"
        currentAction=target;
   if(actionFlag && bothInputted){ //an action has been already selected and secondnumber has been inputted - make equation without equals
    operate(action,selectedNum1,selectedNum2)
   }
  
    
 
   actionFlag=true;
   numTotal="0";
   console.log("actionflag is now "+actionFlag);

   }
   else if(actionFlag){ // if actionFlag - meaning we have a firstNumber (either total or selectedNum1)
    resultDisplay.textContent=selectedNum2;
   }
   else if(selectedNum1){ // if(selectedNum1) - meaning all above are false - we don't have a total we are not after an operation and also selected num is not 0;
    resultDisplay.textContent=selectedNum1;
   }
   else {
    resultDisplay.textContent="0";
   }

   


   if(event.target.id==="equals" && bothInputted || event.target==="equals" && total!==0){
    operate(action,selectedNum1,selectedNum2)
   }
})
let operate = (action,num1,num2)=>{
    if(total){
        operated=true;
    }
    selectedNum1='';
    selectedNum2='';
    num1=parseInt(num1);
     num2=parseInt(num2);
     console.log("num1 in operate is "+num1);
     console.log('num2 in operate is '+num2)
    if(operated){
        console.log("total is "+total);
        console.log("num2 is equal to "+num2);
        console.log(total/num2);
        switch(action){
            case "multiply":
                total=total*num2;
                break;
            case "divide":
                total=total/num2;
                break;
            case "subtract":
                total=total-num2;
                break;
            case "add":
                total=total+num2;
                break;        
        }
    }
    else {
        switch(action){
            case "multiply":
                total=num1*num2;
                break;
            case "divide":
                total=num1/num2;
                break;
            case "subtract":
                total=num1-num2;
                break;
            case "add":
                total=num1+num2;
                break;        
        }
    } 
    resultDisplay.textContent=total;
    console.log('total is '+total);
    operated=true;
    actionFlag=false;
    console.log('action flag is now '+actionFlag);
    bothInputted=false;
}
let clearAll=()=>{
    actionFlag=false;
    bothInputted=false;
    numTotal="";
    total=0
    selectedNum1='';
    selectedNum2='';
    resultDisplay.textContent='0';
    operated=false;
    if(currentAction){
        currentAction.style.outline="none";
        currentAction="";
    }
    if(currentNumber){
        currentNumber.style.border="1px solid black";
        currentNumber='';
    }
}

clear.addEventListener('click',clearAll);
  