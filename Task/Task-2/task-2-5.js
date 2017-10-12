/*******加载函数**********/

function addonloadEvent(func){
  var oldonload=window.onload;
  if(typeof window.onload !='function'){
    window.onload=func;
  }
  else{
    window.onload=function(){
      oldonload();
      func();
    }
  }
}

var arr=JSON.parse(localStorage.getItem('arr'));
var state=JSON.parse(localStorage.getItem('state'));
var kill=JSON.parse(localStorage.getItem('kill'));
var bad=JSON.parse(localStorage.getItem('bad'));
var good=JSON.parse(localStorage.getItem('good'));
var day=JSON.parse(localStorage.getItem('day'));

function Dear(state){
  var fsm=new StateMachine({
    init:state,
    transitions:[
        {name:'kill', from:'none', to:'killed'},
        {name:'tosay',from:'killed',to:'testament'},
        {name:'todiscuss',from:'testament',to:'discussing'},
        {name:'tovote',from:'discussing',to:'voting'},
        {name:'toclear',from:'voting',to:'none'}
    ]
  });

  $(".kill").click(function () {
        fsm.kill();
        state=JSON.stringify(fsm.state);
        localStorage.setItem("state",state);
        window.location.href="http://javasprite.com/Task/task-2/task-2-6.html";
    });
    $(".complain").click(function () {
        if(fsm.state=="killed"){
            fsm.tosay();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            $(".complain").css("background-color","#83b09a");
            $(".complain+span").css("color","#83b09a");
            alert("为什么要杀我");
        }else{
            alert("请先杀人");
        }

    });
    $(".speak").click(function () {
        if(fsm.state=="testament"){
            fsm.todiscuss();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            $(".speak").css("background-color","#83b09a");
            $(".speak+span").css("color","#83b09a");
            alert("who tama cares!");
        }else if(fsm.state=="killed"){
            alert("请先发表遗言")
        }else{
            alert("请先杀人")
        }

    });
    $(".vote").click(function () {
        if(fsm.state=="discussing"){
            fsm.tovote();
            state=JSON.stringify(fsm.state);
          localStorage.setItem("state",state);
          window.location.href="http://javasprite.com/Task/task-2/task-2-6.html";
        }else if(fsm.state=="killed"){
            alert("请先发表遗言")
        }else if(fsm.state=="testament"){
            alert("请玩家先发言讨论")
        }else{
            alert("请先杀人")
        }

    });
    switch(state){
        case 'voting':
            fsm.toclear();
            state=JSON.stringify(fsm.state);
            localStorage.setItem("state",state);
            return fsm;
            break;
    }
}
function start(){
  $("#diary").click(function(){
    window.location.href="http://javasprite.com/Task/task-2/task-2-4.html";
  })
  Dear(state);
}
function reset(){

if(day>=2){
    for(var i=day-2;i>=0;i--){
      var m=parseInt(kill[0][i].slice(2));
      var n=parseInt(kill[1][i].slice(2));
      var lastDay=$(".section").clone(false);
      lastDay[0].setAttribute("class","not");
      lastDay.insertAfter($("header"));
      lastDay.find(".day").html("第"+(i+1)+"天");
      lastDay.find(".kill-text").html((m+1)+"号被杀死,"+"身份是"+arr[m]);
      lastDay.find(".vote-text").html((n+1)+"号被投死,"+"身份是"+arr[n]);
      lastDay.find(".Process").css("display","none");
    }
    var last=$(".section").last();
    last.find(".day").html("第"+day+"天");
    $(".not").click(function(){
      $(".not").find(".Process").css("display","none");
      $(this).find(".Process").css("display","block");
    });
  }
  if(kill[0][day-1]){
    var last=$(".section").last();
    var m=parseInt(kill[0][day-1].slice(2));
    last.find(".kill-text").html((m+1)+"号被杀死,"+"身份是"+arr[m]);
    }
  if(state=="killed"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
  }
  else if(state=="testament"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
    $(".complain").css("background-color","#83b09a");
    $(".complain+span").css("color","#83b09a");
  }
  else if(state=="discussing"){
    $(".kill").css("background-color","#83b09a");
    $(".kill+span").css("color","#83b09a");
    $(".complain").css("background-color","#83b09a");
    $(".complain+span").css("color","#83b09a");
    $(".speak").css("background-color","#83b09a");
    $(".speak+span").css("color","#83b09a");
  }
}
addonloadEvent(reset);
addonloadEvent(start);