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
  };
}
var arr=JSON.parse(localStorage.getItem('arr'));
var kill=JSON.parse(localStorage.getItem('kill'));
function add(){
  for(var i=0;i<arr.length;i++){
    creat(arr[i],i);
  }
  for(var i=0;i<kill.length;i++){
      for(var j=0;j<kill[i].length;j++){
        document.getElementById(kill[i][j]).style.backgroundColor="rgb(131,176,151)";
      }
    }
}
function creat(m,n){
  var wrap=document.getElementById("wrap");
  var divBox=document.createElement("div");
  var divBan=document.createElement("div");
  var spanName=document.createElement("span");
  var spanNum=document.createElement("span");
  divBox.setAttribute("id","no"+n);
  divBox.setAttribute("class","box");
  divBan.setAttribute("class","grey");
  spanNum.setAttribute("class","text");
  spanName.innerHTML=m;
  spanNum.innerHTML=(n+1)+"号";
  divBan.appendChild(spanNum);
  divBox.appendChild(spanName);
  divBox.appendChild(divBan);
  wrap.appendChild(divBox);
}
function start(){
 add();
 document.getElementById("btn").addEventListener("click",function(){
  location.href="http://javasprite.com/Task/task-2/task-2-5.html"; 
 },false);
}
addonloadEvent(start);