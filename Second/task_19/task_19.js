/**
 * Created by xxx on 2016/4/17.
 */

var text_input = document.getElementById("text-input");
var text_table = document.getElementById("text-table");
var text_chart = document.getElementById("text-chart");
var sort_btn = document.getElementById("sort");
var numData=[];
function selectbtn(){

    if (text_table.children.length >60){
        alert(text_table.value);
        return;
    }

    document.getElementById("left-input").onclick = function (){
        if(/^[0-9]+/.test(text_input.value)) {
            if(text_input.value>=10 && text_input.value<=100) {
                var div_el = document.createElement('div');
                div_el.innerHTML = text_input.value;
                text_table.appendChild(div_el);
                text_table.insertBefore(div_el, text_table.firstChild);
                numData.unshift(text_input.value);
                renderdata();
            }
            else {
                alert("数字为10-100");
                return false;
            }
        }else {
            alert("数字不可为空和必须为整数");
            return false;
        }

    };
    document.getElementById("right-input").onclick = function (){
        if(/^[0-9]+/.test(text_input.value)) {
            if(text_input.value>=10 && text_input.value<=100) {
                var div_el = document.createElement('div');
                div_el.innerHTML = text_input.value;
                text_table.appendChild(div_el);
                text_table.insertBefore(div_el, text_table.lastChild);
                numData.push(text_input.value);
                renderdata();
            }
            else {
                alert("数字为10-100");
                return false;
            }
        }else {
            alert("数字不可为空和必须为整数");
            return false;
        }

    };
    document.getElementById("left-output").onclick = function () {
        if(text_table.children.length > 0) {
            text_table.removeChild(text_table.children[0]);
            numData.shift();
            renderdata();
        }
        else {
            alert("没有元素了请添加");
            return false;
        }
    };
    document.getElementById("right-output").onclick = function () {
        if(text_table.children.length > 0) {
            text_table.removeChild(text_table.children[0]);
            numData.pop();
            renderdata();

        }
        else {
            alert("没有元素了请添加");
            return false;
        }
    }

}
function innitdata(){
    for (var num=0;  num < 30; num++){
        numData[num] = Math.ceil(Math.random()*100);
    }
    console.log(numData);
}
function renderdata(){
    var color = ["#EE6775","#7866EE","#6BEE8B","#EEC561","#44EEE0","#DC66EE"];
    var tex = '';
    for (var num in numData){
        tex += '<div style="height:'+numData[num]*5+'px;background-color: '+color[num%6]+'"></div>';
    }
    text_chart.innerHTML = tex;
}
function inputevent(){
    text_input.onchange = function(){
        selectbtn();
    }
}
function numSort() {
    var j=0, i = 0;
    console.log(i);
    /* return function  selectNum(){
     var num = 11;
     console.log(num);
     }*/
    return function selectNum() {
        var num = true;
        if (numData[j] > numData[i + 1]) {
            var temp = numData[i + 1];
            numData[i + 1] = numData[j];
            numData[j] = temp;
            renderdata();
            num = false;
        }
        i++;
        if (i <= numData.length - 1) {
            if(num == false) {
                setTimeout(selectNum, 20);
            }
            else {
                selectNum();
            }
        }
        else {
            j++;
            i = j;
            if (j === numData.length - 1) {
                alert('排序已经完成');
                console.log(j);
                return false;
            }
            else
                setTimeout(selectNum, 20);
        }
    }

}



function init(){
    innitdata();
    renderdata();
    sort_btn.onclick =function(){
         numSort()();

    };
    inputevent();
   // console.log(numData);


}
init();
/*
函数嵌套 function a(){
    return function b(){
        var a =0;
        console.log(a);
    }
}
在函数调用的时候要a()();
在一个元素里面添加子元素
var tex = '<div style="height: '+nnumData[0]+'px;background-color: #1e1e14"></div>';
table_el.innerHTML = tex;
setTimeout 不像c中的delay函数可以延时几秒再执行后面的代码
*/
