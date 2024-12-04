renderDates();
let data = [];
let keydate = 0;
function loadData(){
    keydate = document.querySelector('.chooseDate').value;
    data = JSON.parse(localStorage.getItem(keydate));
    if (data === null){
        data = [];
    }
    renderTodo();
}

renderTodo();

const alerts = document.querySelector('.alerts');
function addItem(){
    inpValue = document.querySelector('.inp').value;
    if (inpValue == ""){
        alerts.innerHTML = "Your input value is empty"
        alerts.style.color = 'red';
        return "empty";
    }
    data.push(inpValue);

    renderTodo();
    alerts.innerHTML = "Successfully added"
    alerts.style.color = 'green';
    document.querySelector('.inp').value = "";
}

function renderTodo(){
    let addElement = '';
    for(let i = 0; i < data.length; i++){
        const html = 
        `<div class = "list-item item-${i+1}">
            <div class="itemText">
                 ${i+1}. ${data[i]}
            </div>
            <div class="del-icon-wrap">
                <button onclick="deleteItem(${i})"> <img src="images/delete.png" alt="" class="delIcon"></button>
            </div>
        </div>`
        addElement += html; 
    }
    document.querySelector('.list').innerHTML = addElement;
}

function deleteItem(num){
    data.splice(num,1);
    renderTodo();
    alerts.innerHTML = "Removed";
    alerts.style.color = 'grey';
    localStorage.removeItem(keydate);
    localStorage.setItem(keydate, JSON.stringify(data));
    if (data.length == 0){
        clearAlert();
    }
}

var input = document.querySelector('.inp');
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addItem();
  }
});

function saveList(){
    if (keydate == 0){
        alerts.innerHTML = "Choose date first";
        alerts.style.color = 'red';
        return
    }
    localStorage.setItem(keydate, JSON.stringify(data)) ;
    console.log(localStorage);
    
    alerts.innerHTML = `Successfully saved on <span class = "currentDate">${keydate}</span> `
    alerts.style.color = 'green';
    renderDates();
    clearAlert();
}

function renderDates(){
    let savedDateHtml = '';
    let savedDates = [];
    let storageKey = '';
    for (let j = 0; j < localStorage.length; j++){
        storageKey = localStorage.key(j);
        if (localStorage.getItem(storageKey) == '[]'){
            continue;
        }
        savedDates[j]= `${localStorage.key(j)}`;
    }
    savedDates.sort();

    for (let j = 0; j < savedDates.length; j++){
        savedDateHtml += `<div class='saved-dates-items'>${savedDates[j]}</div>`;
    }
    document.querySelector('.saved-dates').innerHTML = savedDateHtml;
}

function clearStorage(){
    localStorage.clear();
    document.querySelector('.saved-dates').innerHTML = '';
}

function clearAlert(){
    setTimeout(() => {
        alerts.innerHTML = "";
    }, 3000);
}