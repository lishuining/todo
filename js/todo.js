var todoList=localStorage.todoList?JSON.parse(localStorage.todoList):[];

var inputDom=document.querySelector("#input");
var todoDom=document.querySelector(".todo .list");
var doneDom=document.querySelector(".done .list");
var mainDom=document.querySelector(".main");
    render();
	
	inputDom.onkeypress=function(event){
		if(event.key=="Enter"&&inputDom.value!=""){
			var temp={
				content:inputDom.value,
				isDone:false
			}
			todoList.push(temp);
			render();
			inputDom.value="";
			console.log(todoList);
		}
	}
	
	function render(){
		todoDom.innerHTML="";
		doneDom.innerHTML="";
		var todoNum=0;
		var doneNum=0;
		todoList.forEach(function(item,index){
			var itemDiv=document.createElement("div");
			itemDiv.className="item";
			if(item.isDone==false){
				itemDiv.innerHTML=`
				<div class="choose"><input id="" type="checkbox" data-index="${index}" name="" value=""></div>
				<p>${item.content}</p>
				<div class="delete" data-index="${index}">删除</div>
				`
				todoDom.appendChild(itemDiv);
				todoNum++
			}else{
				itemDiv.innerHTML=`
				<div class="choose"><input id="" type="checkbox" checked="checked" data-index="${index}" checked="checked" name="" value=""></div>
				<p>${item.content}</p>
				<div class="delete" data-index="${index}">删除</div>
				`
				doneDom.appendChild(itemDiv);
				doneNum++;
			}
			var todoSpan=document.querySelector(".todo .num");
			var doneSpan=document.querySelector(".done .num");
			todoSpan.innerHTML=todoNum;
			doneSpan.innerHTML=doneNum;
			
			localStorage.todoList=JSON.stringify(todoList);
		})
	}
	
	mainDom.onchange=function(e){
		var index=e.target.dataset.index;
		var isDone=e.target.checked;
		todoList[index].isDone=isDone;
		render();
	}
	mainDom.onclick=function(e){
		if(e.target.className=="delete"){
			var index=e.target.dataset.index;
			todoList.splice(index,1);
			render();
		}
	}