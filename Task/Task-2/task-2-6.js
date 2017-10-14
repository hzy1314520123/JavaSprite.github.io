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
var killId,voteId;


/*******动态写入页面**********/
function Creat(){
  for(var i=0;i<arr.length;i++){
    var box=$(".box").clone().first();
    box.attr("id","no"+i);
    box.css("display","block");
    box.find(".text").html((i+1)+"号");
    box.find(".IDN").html(arr[i]);
    $("#wrap").append(box);
  }
}
/*******页面重置**********/
function reset(){
  if(state=="killed"){
    $(".work+span").html("凶手杀人");
    $(".second-text").html("杀手请睁眼杀人");
    $(".prove").html("点击玩家头像，对被杀的玩家进行标记");
    Creat();

        for(var i=0;i<kill.length;i++){
      for(var j=0;j<kill[i].length;j++){
        document.getElementById(kill[i][j]).style.backgroundColor="rgb(131,176,151)";
      }
    }

  }
  else if(state=="voting"){
    $(".work+span").html("投票");
    $(".second-text").html("发言讨论结束，大家请投票");
    $(".prove").html("点击得票数最多人的头像");
    Creat();

        for(var i=0;i<kill.length;i++){
      for(var j=0;j<kill[i].length;j++){
        document.getElementById(kill[i][j]).style.backgroundColor="rgb(131,176,151)";
      }
    }

  }
}
/*******点击选择要杀/投的人**********/
function selection(){
  if(state=="killed"){
    $(".box").click(function(){
      if($(this).css("background-color")!="rgb(131, 176, 151)"){
        if($(this).children("span").html()=="平民"){
          $(".box .bouse").css("display","none");
          killId=$(this).attr("id");
          $(this).find(".bouse").css("display","block");
        }
        else{
          bootbox.alert("你不能杀自己人!");
        }
      }
      else{
        bootbox.alert("已经死了!");
      }
    });
  }
  else if(state=="voting"){
    $(".box").click(function(){
      if($(this).css("background-color")!="rgb(131, 176, 151)"){
        $(".box .bouse").css("display","none");
        voteId=$(this).attr("id");

        $(this).find(".bouse").css("display","block");
      }
      else{
        bootbox.alert("已经死了!");
      }
    });
  }
  
}
/*******判断确认函数**********/
function confirm(){
  document.getElementById("yes").onclick=function(){
    if(killId||voteId){
        if(state=="killed"){
          kill[0].push(killId);
          good.pop();
      }
      else if(state=="voting"){
          kill[1].push(voteId);
          day=day+1;
          if($("#"+voteId).children("span").html()=="平民"){
              good.pop();
          }
          else{
              bad.pop();
          }
      }
      if(bad.length>good.length||bad.length==0){
          day=JSON.stringify(day);
          good=JSON.stringify(good);
          bad=JSON.stringify(bad);
          kill=JSON.stringify(kill);
          localStorage.setItem("day",day);
          localStorage.setItem("good",good);
          localStorage.setItem("bad",bad);
          localStorage.setItem('kill',kill);
          window.location.href="http://javasprite.com/Task/Task-2/task-2-7.html";
      }
      else{
          day=JSON.stringify(day);
          good=JSON.stringify(good);
          bad=JSON.stringify(bad);
          kill=JSON.stringify(kill);
          localStorage.setItem("day",day);
          localStorage.setItem("good",good);
          localStorage.setItem("bad",bad);
          localStorage.setItem('kill',kill);
          window.location.href="http://javasprite.com/Task/Task-2/task-2-5.html";
      }
    }
    else{
      bootbox.alert("请选择要杀的人!");
    } 
  }
  
}
addonloadEvent(confirm);
addonloadEvent(reset);
addonloadEvent(selection);