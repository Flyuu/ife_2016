var text_input = document.getElementById("text_input");//文本域的引用
var text_sub = document.getElementById("text_sub");//文本域的添加，确认按钮
var src_input = document.getElementById("src_input");//查询内容的输入
var search_sub = document.getElementById("search_sub");//查询确认按钮
var queue = document.getElementById("queue");//ul的引用
var lists = queue.getElementsByTagName("li");//ul下的li元素们
var arrData = [];

String.prototype.trim = function() {  
    //return this.replace(/[(^\s+)(\s+$)]/g,"");//會把字符串中間的空白符也去掉  
    //return this.replace(/^\s+|\s+$/g,""); //  
    return this.replace(/^\s+/g,"").replace(/\s+$/g,"");  
}

//将文本输入值放入变量t1中
function fn () {
    t1=text_input.value;
}
//文本监听事件
if (window.addEventListener) {
	text_input.addEventListener("input", fn);
} else {
	text_input.attachEvent("onpropertychange", fn);
}
if (!!window.attachEvent && navigator.userAgent.match(/msie (\d)/i)[1] > 8) {
	text_input.attachEvent("onkeydown", function () {
	var key = window.event.keyCode;
	(key == 8 || key == 46) && fn();//backspace、delete 两个按键的 keyCode 分别为 8、46
	});
	input.attachEvent("oncut", fn);//oncut 事件在粘贴（ctrl + v）、鼠标粘贴时触发
}

//对文本域内容的限制
text_sub.onclick = function textTest(){
	// alert(t1+"111");
	var str = text_input.value.trim();
	var pattern = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;//匹配了非数字非中英文的字符
	//以分隔符用split分割内容，并返回数组
	var arrWord = str.split(pattern).filter(function(e){
			return e.length!==0;
	});
	arrData = arrData.concat(arrWord);//concat方法用于连接两个或多个数组	
	render();
}

//将添加的文本域显示出来
function render(str){
	var txt="",i;
	for(var i in arrData){
		if(str){
			arrData[i]=arrData[i].replace(new RegExp(str,"g"),"<span>"+str+"</span>");
	    }
		txt+="<li>"+arrData[i]+"</li>";

	}
    queue.innerHTML = txt;
}

search_sub.onclick=function searchData(){
	var str=src_input.value.trim();
	render(str);
}




