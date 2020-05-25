///// data
//save data in localStorage  
// data format： todo:{"li":theme,"time":time,"urgent":importance,"detail":detail,"status":false};
// todolist:[todo1, todo2, .....]

///// action
// once open the browser, load data from localstorage and show them
// click submit buttom, activate postaction:
// 1. read todolist from storage and copy input to todo.
// 2. compare todo's time and time of items from todolist, make sure the position where todo can insert in
// 3. insert to do in todlist and showlist on the screen
// click - buttom, activate remove: read data from localstorage and delete them, refresh screen
// click + buttom, activate showDetail: read data from localstorage and show detail in textarea
//todo>>>>done: read data, set status false and save data. then, refresh screen.
//done>>>>todo: read data, set status true and save data. then, refresh screen.


//clear all todos
function clear(){
    localStorage.clear();
    showList();
}

// show todolist on the screen by add li dynamically
function showList(){
    var todoList = document.getElementById("todoList");
    var doneList = document.getElementById("doneList");
    var todoCount = document.getElementById("todoCount");
    var doneCount = document.getElementById("doneCount");
    var data = localStorage.getItem("todoList");
    var todoList1 = "";
    var doneList1 = "";
    var count1 = 0;
    var count2 = 0;
    if(data!=null){
        data=JSON.parse(data);
        for(var i=data.length-1; i>=0; i--){
            if(data[i].status){
                // console.log(data[i].li);
                doneList1 += "<li id='li-" + i +"'><input class='checkBox' type='checkbox' style='float:left;' checked='checked' onchange='change(" + i + ",true)'>" + 
                "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li + " onchange='update(" + i + ")'>" +
                 "<span class='listSpan' style='float:right;' onclick=remove(" +i + ")>" + "-</span></li>";
                count2++;
                
            }else{
                // console.log(data);
                todoList1 += "<li id='li-" + i +"'><input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + i + ",false)'>" + 
            "<input class='content' type='text' style='float:left;' id='" + i 
                    + "' value='" + data[i].li + ' before [' + data[i].time + '],  importance is ['+ data[i].urgent + ']'
                    + "' onchange='update(" + i + ")'>" +
             "<span class='listSpan' style='float:right;' onclick=remove(" +i + ")>" + "-</span>" +
             "<span class='listSpanDetail' style='float:right;' onclick=showDetail(" +i + ")>" + "+</span></li>";
            count1++;
            }
        }
        todoList.innerHTML = todoList1;
        doneList.innerHTML = doneList1;
        doneCount.innerText = count2;
        todoCount.innerText = count1;
    }else{
        todoList.innerHTML = "";
        doneList.innerHTML = "";
        todoCount.innerText = 0;
        doneCount.innerText = 0;
    }
}

//change todolist and donelist
function change(id,val){
    var data = loadData();
    if(val){
        var li = document.getElementById("li-"+id);
        var checkbox = li.children[0];
        checkbox.innerHTML = "<input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + id + ",false)'>";
        var doneCount = new Number(document.getElementById("doneCount").innerText);
        doneCount.innerText = doneCount-1;
        data[id].status = false;
        saveData(data);
        showList();
    }else{
        var li = document.getElementById("li-"+id);
        var checkbox = li.children[0];
        checkbox.innerHTML = "<input class='checkBox' type='checkbox' checked='checked' style='float:left;' onchange='change(" + id + ",true)'>";
        var todoCount = new Number(document.getElementById("todoCount").innerText);
        todoCount.innerText = todoCount-1;
        data[id].status = true;
        saveData(data);
        showList();
    }
}

// edit todo on the screen directly
function update(id){
    var data = loadData();
    var newItem = document.getElementById(new String(id));  //被修改的数据
    console.log(data[id]);
    console.log(newItem);
    data[id].li = newItem.value;
    saveData(data);
}

// delete todo
function remove(n){
    var data = loadData();
    data.splice(n,1);
    saveData(data);
    showList();
}

// show details
function showDetail(n){
    //getSystemTime();
    //var data = localStorage.getItem("todoList");
    var detail = loadData();
    //alert(detail[n].detail);
    var textDetail = document.getElementById("inputStuffDetail");
    if (detail[n].detail){
        textDetail.innerText = detail[n].detail;
    }else{
        textDetail.innerText = 'No details';
    }
}

/**  
//  获取系统时间
function getSystemTime(){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    alert(day);
}
**/


// save data to localstorage
function saveData(data){
    data = JSON.stringify(data);
    localStorage.setItem("todoList", data);
    // console.log("sava",JSON.parse(localStorage.getItem("todoList")));
}
// read data from localstorage
function loadData(){    
    var data = localStorage.getItem("todoList");
    var emptyArray = [];
    // console.log(data);
    if(data==null){
        // console.log(2);
        return emptyArray;
    }else {
        // console.log(1);
        return JSON.parse(data);
    }
}

// compare time
function compareTime(time1, time2){
    if((time1-time2)>0){
        return false
    }else{
        return true
    }

}


// submit form
function postaction(){
    var importanceTable = ['error','♥','♥♥','♥♥♥','♥♥♥♥','♥♥♥♥♥'];
    //var importanceTable = ['1','2','3','4','5'];
    // localStorage.clear();
    var inputStuffDetail = document.getElementById("inputStuffDetail");
    //alert(inputStuffDetail.value);
    //document.getElementById("inputStuffDetail").value = "";
    var inputTodo = document.getElementById("inputTodo");
    var inputTime = document.getElementById("inputTime");
    var inputUrgent = document.getElementById("inputUrgent");
    if(inputTodo.value == "" || inputTime.value == ""||inputUrgent.value == "") {
        alert("内容不能为空");
    }
    else{
        // load todolist from localstorage
        var data=loadData();
        // console.log(data);
        // console.log(typeof data);
        
        // change importance([1-5]) to ♥
        inputUrgent.value = importanceTable[parseInt(inputUrgent.value)];
        //alert(inputUrgent.value);
        var todo={"li":inputTodo.value,"time":inputTime.value,"urgent":inputUrgent.value,"detail":inputStuffDetail.value,"status":false};
        
        // make sure position where new todo could insert in
        var time1 = inputTime.value;
        var timestring1 = time1.replace(/\./g, ""); 
        var timeInt1 = parseInt(timestring1);
        //alert(timeInt1);

        for(var position=0;position < data.length;position++){
            var time2 = data[position].time;
            var timestring2 = time2.replace(/\./g, ""); 
            var timeInt2 = parseInt(timestring2);
            if(compareTime(timeInt1, timeInt2)){
                //alert(position);
            }else{
                break;
            }
        }
        // xx represent this todo has no time limitation
        //if (inputTime.value == "xx"){
        //    position = 0;
        //}
        data.splice(position, 0, todo);

        // save todolist
        saveData(data);
        var form=document.getElementById("form");
        form.reset();
        // refresh screen
        showList();
    }
}
window.onload = function(){
    showList();
}