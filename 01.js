//将数据存储在浏览器localStorage  
// 数据格式： todoList:[{"li":inputContent,"status":true/false}]
// 打开浏览器时，从浏览器中读取数据、显示数据
//触发post时：1、从浏览器读取数据，新增数据，将数据写回浏览器  2、在页面上新增一条内容
//修改数据：1、从浏览器读取数据，修改数据，将数据写回浏览器  页面显示
//删除数据:1、从浏览器读取数据，删除数据，将数据写回浏览器  页面显示
//todo>>>>done:读取数据，修改状态为true，写回浏览器，
//done>>>>todo：读取数据，修改状态为true，写回浏览器，  在todo里面增加一条内容


//清除所有
function clear(){
    localStorage.clear();
    showList();
}
//浏览器页面显示列表
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
            "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li +" onchange='update(" + i + ")'>" +
             "<span class='listSpan' style='float:right;' onclick=remove(" +i + ")>" + "-</span></li>";
            count1++;
            // todoCount= Number(todoCount.innerText);
            
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

//编辑
function update(id){
    var data = loadData();
    var newItem = document.getElementById(new String(id));  //被修改的数据
    console.log(data[id]);
    console.log(newItem);
    data[id].li = newItem.value;
    saveData(data);
}

//删除
function remove(n){
    var data = loadData();
    data.splice(n,1);
    saveData(data);
    showList();
}

//保存数据
function saveData(data){
    data = JSON.stringify(data);
    localStorage.setItem("todoList", data);
    // console.log("sava",JSON.parse(localStorage.getItem("todoList")));
}
//读取数据
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

//提交表单
function postaction(){
    // localStorage.clear();
    var inputStuffDetail = document.getElementById("inputStuffDetail");
    document.getElementById("inputStuffDetail").value = "";
    var inputTodo = document.getElementById("inputTodo");
    var inputTime = document.getElementById("inputTime");
    var inputUrgent = document.getElementById("inputUrgent");
    if(inputTodo.value == "" || inputTime.value == "") {
        alert("内容不能为空");
    }else if(inputUregnt.value == ""){
        alert("内容不能为空");    
    }
    // 这边怎么简化判断呢？
    else{
        //读取数据
        var data=loadData();
        // console.log(data);
        // console.log(typeof data);
        var todo={"li":inputTodo.value,"time":inputTime.value,"urgent":inputUregnt,"detail":inputStuffDetail,"status":false};
        //新增
        data.push(todo);
        // console.log("push", data);
        // 保存
        saveData(data);
        var form=document.getElementById("form");
        form.reset();
        //页面新增数据
        showList();
    }
}
window.onload = function(){
    showList();
}