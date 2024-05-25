
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
let positive=true;
let keepGoing=false;
let previousAction='';
let equals=document.querySelector('#equals');
let clearAll=()=>{
    positive=true;
    actionFlag=false;
    bothInputted=false;
    numTotal="0";
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
    actionCount=0;
    keepGoing=false;
}
container.addEventListener('click',(event)=>{
   
   let target=event.target;
   // if actionflag is false  this means an action hasn't been done yet which means we are still inputting the first number 
        if(target.classList.contains('number')){
            console.log(total);
          
            if(currentNumber){
                currentNumber.style.border="1px solid black"
               }
               target.style.border="2px solid black"
                currentNumber=target;
                if((total && keepGoing) || target.id=="dot" || target.id=="reverse"){
                    console.log("total in clear is "+total);
                    clearAll();     
                }
               if(numTotal==="0"){
                numTotal="";
               }
           
                    switch(target.id){
                        case "num0":
                             numTotal+="0";
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
                          case "dot":
                            console.log(numTotal)
                            console.log("123456789".includes(numTotal));
                            if(!numTotal.includes(".")){
                             numTotal+=".";
                            }
                       break;
                            
                           
                    }
                
                if(target.classList.contains('reverse') && numTotal){
                    positive= !positive;
                    console.log(positive+" - this is the value");
                    numTotal= positive  ? numTotal.slice(1)  : numTotal="-"+numTotal;
                }
               
                if(!total){
                    if(actionFlag){
                        selectedNum2=numTotal;
                        bothInputted=true;
                    }
                    else {
                        selectedNum1=numTotal;
                       }
                } 
                else selectedNum1=numTotal;
                (numTotal==="" ||numTotal==="-")? resultDisplay.textContent="0": resultDisplay.textContent=numTotal;
              
                        }
            // if(actionFlag && !total){
            //     selectedNum2=numTotal;
            // }
            // else if(actionFlag){
            //     bothInputted=true;
            // }
            // else{
            //     selectedNum1=numTotal;
            // }
         
   if(target.classList.contains('action')){
    actionCount++;
  //this is done on second actionCount
  //idea is to save the previous action element's id in a variable
  //if current action-target.id is same as last action-target.id(from the variable)
  //then operate with lastAction variable and the two selected nums
  //check if there is a total - if there is operate with lastAction and total and selectedNum1

    positive=true;
    if(!numTotal){
        resultDisplay.textContent=total;
    }
    console.log("action count is - "+actionCount)
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
    if(actionFlag && actionCount===2 && selectedNum1){
        keepGoing=true;
        if(total){
            operate(previousAction,total,selectedNum1);
        }
        else operate(previousAction,selectedNum1,selectedNum2);
    }
   else if(previousAction===action && actionCount===2 && (selectedNum1 || total)){
        console.log("action-count 2 activated");
            selectedNum2=selectedNum1;
            console.log(total+" - this is the total in action-count2");
            if(operated){
                console.log('has been operated'); 
                operate(action,total,total);
            } 
            else operate(action,selectedNum1,selectedNum2);
        }
    if(currentAction){
        currentAction.style.outline="none"
       }
       target.style.outline="1px solid black"
        currentAction=target;
   if(actionFlag && bothInputted){ //an action has been already selected and secondnumber has been inputted - make equation without equals
    console.log("no this is");
    operate(action,selectedNum1,selectedNum2);
   
   }
   actionFlag=true;
   numTotal="0";
    previousAction=action;
   }

   if(target.id==="equals" && bothInputted || target.id==="equals" && total!==0){
    console.log("this is");
    equals.style.outline="1px solid black";
    if(total){
        console.log(selectedNum1+"- this is selectednum1");
        console.log("equals with total");
        operate(action,total,selectedNum1);
    }
    else operate(action,selectedNum1,selectedNum2)
   }
   else(equals.style.outline="none");

})


let operate = (action,num1,num2)=>{
    positive=true;
    if(total){
        num1=num1.toString();
        num2=num2.toString();
        operated=true;
    }
    selectedNum1='';
    selectedNum2='';
    console.log('this is num1 before parsing: '+num1);
    console.log('this is num2 before parsing: '+num2);
    num1 = num1.includes(".") ? parseFloat(num1) : parseInt(num1)
    num2 =num2.includes(".") ? parseFloat(num2) : parseInt(num2)
     console.log("num1 in operate is "+num1);
     console.log('num2 in operate is '+num2)
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
        numTotal=total;
        if(isNaN(numTotal)){
            numTotal=0;
        }
    resultDisplay.textContent=numTotal;
    numTotal="0";
    console.log('total is '+total);
    operated=true;
    actionFlag=false;
    bothInputted=false;
    actionCount=0;
    positive=false;
    if(keepGoing){
        actionCount=1;
    }
    keepGoing=false;
}

clear.addEventListener('click',clearAll);
  