/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var city = document.getElementById("aqi-city-input");
var aqi = document.getElementById("aqi-value-input");
String.prototype.trim = function(){
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
}
function addAqiData() {
  city_value = city.value;
  aqi_value = aqi.value;

	city_value = city_value.trim();
	aqi_value = aqi_value.trim();

	if(!city_value.match(/^[a-zA-Z\u4E00-\u9FA5]+$/)){
    alert("请输入中英文字符！");
    return false;
  }

  if(!aqi_value.match(/^\d+$/)){
    alert("请输入整数！");
    return false;
  }

	aqiData[city_value] = aqi_value;
}

/**
 * 渲染aqi-table表格
 */
var aqi_table = document.getElementById("aqi-table"); 
function renderAqiList() {
  aqi_table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var city_value in aqiData){
   aqi_table.innerHTML+="<tr><td>"+city_value+"</td><td>"+aqiData[city_value]+"</td><td><button class='del'>删除</button></td></tr>";
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var tr = target.parentElement.parentElement;
  var del_city = tr.children[0].innerHTML;
  delete aqiData[del_city];
  renderAqiList();
}

var add_btn = document.getElementById("add-btn");
// var del = document.getElementsByClassName("del");
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  add_btn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  aqi_table.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName === "BUTTON") {   //注意nodeName 所包含的 XML 元素的标签名称永远是大写的
        delBtnHandle(event.target);
      }
  })
}

init();
