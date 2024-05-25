
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
let equals=document.querySelector('#equals');
let clearAll=()=>{
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
}
container.addEventListener('click',(event)=>{
   
   let target=event.target;
   // if actionflag is false  this means an action hasn't been done yet which means we are still inputting the first number 
        if(target.classList.contains('number')){
            console.log(total);
            if(total && target.id !=="dot" && actionCount===0){
                console.log("total in this is "+total);
                clearAll();
            }
            if(currentNumber){
                currentNumber.style.border="1px solid black"
               }
               target.style.border="2px solid black"
                currentNumber=target;
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
                
                if(target.classList.contains('reverse') && numTotal && !numTotal.includes('-')){
                    positive=false;
                    numTotal= positive  ? numTotal  : numTotal="-"+numTotal;
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
                else if(total && target.id==="dot"){
                    total=numTotal;  
                
                }  
                else selectedNum1=numTotal;
                resultDisplay.textContent=numTotal;
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
    if(!numTotal){
        resultDisplay.textContent=total;
    }
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
   if(actionCount===2 && (selectedNum1 || total)){
    console.log("action-count 2 activated");
        selectedNum2=selectedNum1;
        console.log(total+" - this is the total in action-count2");
        if(operated){
            console.log('has been operated');
            operate(action,total,total);
        } 
        else operate(action,selectedNum1,selectedNum2);
        actionCount=0;
    }
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

}

clear.addEventListener('click',clearAll);
  