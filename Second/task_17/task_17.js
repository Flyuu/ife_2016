/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

// 随机颜色生成函数
function RandomColor(){
  return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}

/*
* 渲染图表
*/
var chart_layer = document.getElementsByClassName("aqi-chart-wrap")[0];
// 图表背景图层
function chartwrap() {
  chart_layer.style.cssText = "width: 100%;height: 520px;background-color: white;display: flex;flex-flow: row nowrap;align-items: flex-end;";
}
function renderChart() {
  chartwrap();
  var chart = "";
  for(var i in chartData){
    chart+="<div  title='aqi:"+chartData[i]+"&#13Time:"+i+"' style='height:"+chartData[i]+"px;width:33%;background-color:"+RandomColor()+
    ";margin:3px'></div>";
  }
  chart_layer.innerHTML = chart;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
var radios = document.getElementsByName("gra-time");
function graTimeChange() {
  // 确定是否选项发生了变化 
  for(var i in radios){
    if(radios[i].checked){
      nowGraTime = radios[i].value;
      // alert(radios[i].value);测试功能
    }
  }

  //设置对应数据
  chartData = aqiSourceData[citys[nowSelectCity].innerHTML]; //将对应城市的数据放入ChartData
  switch (nowGraTime) {
    case "week":
      var sum=0,avg=0,day_count=0,week_count=0,temp={};
      for(var i in chartData){
        sum+=chartData[i];
        day_count++;
        if(new Date(i).getDay()==0){ 
        //getDay()返回的是0-6；
        //碰到一星期中的第一天时，将一周的平均值放入temp中存放，
        //同时将之前的sum和累计天数清理掉，以备下一周的累计平均值计算
          avg = Math.round(sum/day_count);
          var key = "第"+(week_count+1)+"周";
          temp[key]=avg;
          week_count++;
          sum=0;
          day_count=0;
        }
      }
      temp["第"+(week_count+1)+"周"]=Math.round(sum/day_count);
      chartData = temp;
      break;
    case "month":
      var sum=0,avg=0,day_count=0,temp={};
      var month_count = new Date(0).getMonth();//将第一个date数据的月份赋给month_count做初始化
      for(var i in chartData){
        sum+=chartData[i];
        day_count++;
        if(new Date(i).getMonth()!=month_count){
          //getMonth()返回的是0-11；
          //当碰到月份不一样时，将前一个月的平均值放入temp中存放，
          //同时将之前一个月的sum和累计天数清理掉，以备下一个月重新计算平均值
          avg = Math.round(sum/day_count);
          temp[(month_count+1)+"月"]=avg;
          month_count++;
          sum=0;
          day_count=0;
        }
      }
      temp[(month_count+1)+"月"]=Math.round(sum/day_count);
      chartData = temp;
      break;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
var city_select = document.getElementById("city-select");
var citys = city_select.getElementsByTagName("option");
function citySelectChange(target) {
  // 确定是否选项发生了变化
  for(var i in citys){
    if(citys[i].selected){
      nowSelectCity = i;
      // alert(citys[i].value);//测试功能
    }
  }

  // 设置对应数据
  chartData = aqiSourceData[citys[nowSelectCity].innerHTML];

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  for(var i in radios){
    radios[i].onclick=graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
  function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var city in aqiSourceData){
    city_select.innerHTML+="<option>"+city+"</option>";
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.addEventListener("change",citySelectChange);
  city_select.addEventListener("change",graTimeChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData[citys[nowSelectCity].innerHTML];
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
