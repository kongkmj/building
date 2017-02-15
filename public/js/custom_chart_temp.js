
  var temp_01 =  {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
      label: "온도",
      backgroundColor: "rgba(38, 185, 154, 0.31)",
      borderColor: "rgba(38, 185, 154, 0.7)",
      pointBorderColor: "rgba(38, 185, 154, 0.7)",
      pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointBorderWidth: 1,
      data: []
    }]
  },
  options:{
    responsive:true,
    scales:{
      yAxes:[{
        ticks:{
          suggestedMax:30,
          suggestedMin:-10
        },
        display:true
      }]
    }
  }
 };

 var temp_02 =  {
   type: 'line',
   data: {
   labels: [],
   datasets: [{
     label: "온도",
     backgroundColor: "rgba(38, 185, 154, 0.31)",
     borderColor: "rgba(38, 185, 154, 0.7)",
     pointBorderColor: "rgba(38, 185, 154, 0.7)",
     pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
     pointHoverBackgroundColor: "#fff",
     pointHoverBorderColor: "rgba(220,220,220,1)",
     pointBorderWidth: 1,
     data: []
   }]
 },
 options:{
   responsive:true,
   scales:{
     yAxes:[{
       ticks:{
         suggestedMax:30,
         suggestedMin:-10
       },
       display:true
     }]
   }
 }
};

var temp_03 =  {
  type: 'line',
  data: {
  labels: [],
  datasets: [{
    label: "온도",
    backgroundColor: "rgba(38, 185, 154, 0.31)",
    borderColor: "rgba(38, 185, 154, 0.7)",
    pointBorderColor: "rgba(38, 185, 154, 0.7)",
    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointBorderWidth: 1,
    data: []
  }]
},
options:{
  responsive:true,
  scales:{
    yAxes:[{
      ticks:{
        suggestedMax:30,
        suggestedMin:-10
      },
      display:true
    }]
  }
}
};

function init_charts_temp() {

    console.log('run_charts  typeof [' + typeof (Chart) + ']');

    if( typeof (Chart) === 'undefined'){ return; }

    console.log('init_charts');


    Chart.defaults.global.legend = {
      enabled: false

    };

  var temp1 = document.getElementById("temp01");
  var temp2 = document.getElementById("temp02");
  var temp3 = document.getElementById("temp03");
  window.tempLine1 = new Chart(temp1,temp_01);
  window.tempLine2 = new Chart(temp2,temp_02);
  window.tempLine3 = new Chart(temp3,temp_03);

}
$(document).ready(function() {

 init_charts_temp();

});


const socket01 = io.connect("http://192.168.0.9:3000");
/**
 * v1 = temp_01 , b1 = temp_01-battery ,
 * v2 = temp_02 , b2 = temp_02-battery ,
 * v3 = temp_03 , b3 = temp_03-battery
**/
socket01.on('temp',function (v1,b1,v2,b2,v3,b3) {
  var wtMax= 12; // 그래프 점 갯수
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  // temp_01
  if(temp_01.data.datasets.length>0){
    temp_01.data.labels.push(hour+":"+min+":"+second);

    if(temp_01.data.labels.length==wtMax){
      $.each(temp_01.data.datasets,function (i,datasets) {
        temp_01.data.labels.shift(0,wtMax);
        temp_01.data.datasets[0].data.shift(0,wtMax-1);
        temp_01.data.datasets[0].data.push(v1);
      })
    }
    else{
      $.each(temp_01.data.datasets,function (i,datasets) {
        temp_01.data.datasets[0].data.push(v1);
      })
    }

    window.tempLine1.update();
  }

  // temp_02
  if(temp_02.data.datasets.length>0){
    temp_02.data.labels.push(hour+":"+min+":"+second);

    if(temp_02.data.labels.length==wtMax){
      $.each(temp_02.data.datasets,function (i,datasets) {
        temp_02.data.labels.shift(0,wtMax);
        temp_02.data.datasets[0].data.shift(0,wtMax-1);
        temp_02.data.datasets[0].data.push(v2);
      })
    }
    else{
      $.each(temp_02.data.datasets,function (i,datasets) {
        temp_02.data.datasets[0].data.push(v2);
      })
    }

    window.tempLine2.update();
  }

  //temp_03
  if(temp_03.data.datasets.length>0){
    temp_03.data.labels.push(hour+":"+min+":"+second);

    if(temp_03.data.labels.length==wtMax){
      $.each(temp_03.data.datasets,function (i,datasets) {
        temp_03.data.labels.shift(0,wtMax);
        temp_03.data.datasets[0].data.shift(0,wtMax-1);
        temp_03.data.datasets[0].data.push(v3);
      })
    }
    else{
      $.each(temp_03.data.datasets,function (i,datasets) {
        temp_03.data.datasets[0].data.push(v3);
      })
    }

    window.tempLine3.update();
  }
});
