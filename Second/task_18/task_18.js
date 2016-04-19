var input_value = document.getElementById("input-value");
var left_in = document.getElementById("left_in");
var right_in = document.getElementById("right_in");
var left_out = document.getElementById("left_out");
var right_out = document.getElementById("right_out");
var queue = document.getElementById("queue");

//左侧入函数
function leftIn(){
	var push_left = document.createElement("li");
	push_left.innerHTML = input_value.value;
	queue.insertBefore(push_left,queue.firstChild);
}
//左侧入按钮绑定函数
left_in.onclick = function(){
	if(input_value.value) {
		leftIn();
		input_value.value="";
	}
	else{
		alert("请输入您要添加的数值！");
	}
}

//右侧入函数
function rightIn(){
	var push_right = document.createElement("li");
	push_right.innerHTML = input_value.value;
	queue.appendChild(push_right);
}
//右侧入按钮绑定函数
right_in.onclick = function(){
	if(input_value.value) {
		rightIn();
		input_value.value="";
	}
	else{
		alert("请输入您要添加的数值！");
	}
}

//左侧出函数
function leftOut(){
	queue.removeChild(queue.firstChild);
}
//左侧出按钮绑定函数
left_out.onclick = function(){
	if(confirm("确定要删除左边的数值"+queue.firstChild.innerHTML+"？")){
		leftOut();
	}
}

//右侧出函数
function rightOut(){
	queue.removeChild(queue.lastChild);
}
//右侧出按钮绑定函数
right_out.onclick = function(){
	if(confirm("确定要删除右边的数值"+queue.lastChild.innerHTML+"？")){
		rightOut();
	}
}
//点击数字进行删除
queue.addEventListener("click",function(event){
	var queues = event.target.parentNode;
	if(confirm("确定要删除"+event.target.innerHTML+"这个数值?")){
		queues.removeChild(event.target);
	}
})
