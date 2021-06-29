var state = {
	balance:0,
	income:0,
	expense:0,
	transactions:[
       
	]
}

var balanceElement = document.querySelector("#balance");
var incomeElement = document.querySelector("#income");
var expenseElement = document.querySelector("#expense");
var transactionEl= document.querySelector("#transaction");
var incomebtnEl= document.querySelector("#incomebtn");
var expensebtnEl=document.querySelector("#expensebtn");
var nameInputEl=document.querySelector("#name");
var amountInputEl= document.querySelector("#amount");

function init(){
	var localState =JSON.parse(localStorage.getItem("expenseTracker"));
	if(localStorage!==null){
		state=localState;
	}
    updateStates();
    initListeners();


}

function initListeners(){
	incomebtnEl.addEventListener("click",onAddIncomeClick);
	expensebtnEl.addEventListener("click",onAddExpenseClick);
}

function onAddIncomeClick(){

	addTransaction(nameInputEl.value,amountInputEl.value,"income");
	}

function addTransaction(name,amount,type){
	if(name!=="" && amount!==""){
		id:uniqueId()
		var transaction={
		     id:uniqueId(),
		     name:nameInputEl.value,
		     amount:parseInt(amountInputEl.value),  
                     type
	};

state.transactions.push(transaction);
 
     updateStates();
	}else {
		alert("please enter some date");
	}
	nameInputEl.value=""
	amountInputEl.value="";
}


function onAddExpenseClick(){
	addTransaction(nameInputEl.value,amountInputEl.value,"expense");

}


function updateStates(){
	var balance=0,
	    income=0,
	    expense=0,
	    item;
	for(var i=0; i<state.transactions.length;i++){
		item=state.transactions[i];
		if(item.type==="income"){
			income+=item.amount;
		}else if(item.type==="expense"){
			expense+=item.amount;
		}
	}
	balance=income - expense
	state.balance=balance;
	state.income= income;
	state.expense=expense;
	localStorage.setItem("expenseTracker",JSON.stringify(state));
	render();
}


function render(){
	balanceElement.innerHTML=`$${state.balance}`;
	incomeElement.innerHTML = `$${state.income}`;
	expenseElement.innerHTML = `$${state.expense}`;

        var transaction,containerEl,amountEl,item,btnEl;

        transactionEl.innerHTML=" ";
        for(var i=0;i<state.transactions.length;i++){
     	transaction=document.createElement("li");
		item=state.transactions[i]
		transaction.append(item.name);
		transactionEl.appendChild(transaction);
     	
     	containerEl=document.createElement("div");
        amountEl=document.createElement("span");

        if(item.type==="income"){
        	amountEl.classList.add("income-amt");
        }else if(item.type==="expense"){
        	amountEl.classList.add("expense-amt");
        }
		
        amountEl.innerHTML=`$${item.amount}`;
        containerEl.appendChild(amountEl);
		btnEl=document.createElement("button");
		btnEl.setAttribute("data-id", item.id);
		
        btnEl.innerHTML="x";
		
        btnEl.addEventListener("click",onDeleteClick);
        containerEl.appendChild(btnEl);

        transaction.appendChild(containerEl);	
     }
     
}

function onDeleteClick(event){
	var id= parseInt(event.target.getAttribute("data-id"));
	var deleteIndex;
	
	for(var i=0; i<state.transactions.length;i++){
		if(state.transactions[i].id===id){

			deleteIndex=i;
			break;
		}
	}
	state.transactions.splice(deleteIndex,1);
	updateStates();

}
function uniqueId(){
	return Math.round(Math.random()*1000000);
}

init();


