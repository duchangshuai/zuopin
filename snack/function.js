// 2016.08.29   周一下午
// 1.解决通过类名获取元素 的兼容问题 

// 1.判断浏览器
// 2.ff:现有的方法
// 3.IE：
// （1）获取所有的标签
// （2）遍历，判断
//      标签.className==classname;
//  (3) 条件满足，保留标签
// （4）返回新数组   


function getClass(classname,father){
	father=father || document;      //不传参数时的默认值
	if(father.getElementsByClassName){    //判断浏览器
		return father.getElementsByClassName(classname);    //返回获取的classname
	}
	else{
		var newarr=[];                                    //创建新数组
		var all=father.getElementsByTagName("*");          //获取所有的标签名保存在all中
		for (var i = 0; i < all.length; i++) {
			if(checkRep(classname,all[i].className)){      // 判断参数和获取的标签名
                  newarr.push(all[i]);                      //相同的话保存在新数组中
			}
		};
        return newarr;
	}
}

function checkRep(val,string){                              
	var arr=string.split(" ");                  //把传递的字符串分隔成数组
      for(var i in arr){                         //遍历数组
      	if(val==arr[i]){                         //比较
      		return true;
      	}
      }
      return false;
}

/***************************************/
// 2016.08.30    周二下午

// 2.获取样式的值得兼容函数

function getStyle(obj,arrt){
	if(obj.currentStyle){
		return obj.currentStyle[arrt];
	}else{
		return getComputedStyle(obj,null)[arrt];
	}
}



/***************************************/
//2016.08.31  周三下午
//3.获取元素的兼容函数（可以支持标签、id、class）
//"div"   "#box"     ".box"

function $(selector,father){
     father=father || document;

	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")           //去空格
		if(selector.charAt(0)==".") {
			return getClass(selector.substring(1),father);
		}
		else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.substring(1));
		}
		else if(/^[a-z][1-6a-z]*/g.test(selector)){
			return father.getElementsByTagName(selector);
		}

	}

		else if(typeof selector=="function"){
					// window.onload=function(){
					// 	selector();
		    addEvent(window,"load",function(){
		    	selector();
		    })
					}
		}







/***************************************/
// 2016.09.02    周五早上
//4.获取所有的子节点兼容函数
//father：指定父节点
// type："a" 只有元素节点
//       "b" 元素节点+文本节点    

function getChild(father,type){
	type=type || "a";     //给他一个默认值"a"
	var newarr=[];             //声明一个新数组

	var all=father.childNodes;       //获取子元素集合
	for (var i = 0; i < all.length; i++) {             //遍历集合
		if(type=="a"){                      //判断类型
			if(all[i].nodeType==1 ){        //判读节点的类型
		    newarr.push(all[i]);            //符合条件添加到新数组中
	        }
		}
		else if(type=="b"){
			if(all[i].nodeType==1 || (all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
				//判断元素节点和文本节点，文本节点要去空格
				newarr.push(all[i]);
			}
		}
	     
	};
	return newarr;
}





/***************************************/
// 5.获取第一个子节点


function getFirst(father){
  
      return getChild(father)[0];

}


/**********************************/
// 6.获取最后一个子节点

function getLast(father){
  
      return getChild(father)[getChild(father).length-1];

}


/******************************************/
// 7.获取指定的子节点

function getNum(father,xiabiao){
  
      return getChild(father)[xiabiao];

}



/**********************************************/
// 8.获取下一个兄弟节点

function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==3 || next.nodeType==8){
		next=next.nextSibling;
		if(!next){
		return false;
	    }
		
	}
    return next;
}


/**********************************************/
// 9.获取上一个兄弟节点

function getTops(obj){
	var tops=obj.previousSibling;
	if(!tops){
		return false;
	}
	while(tops.nodeType==3 || tops.nodeType==8){
		top=tops.previousSibling;
		if(!tops){
		return false;
	    }
		
	}
    return tops;
}




/**********************************************/
// 10.事件绑定的兼容函数

function addEvent(obj,event,fun){
	obj[fun]=function(){
		fun.call(obj);
	}
     if(obj.attachEvent){
     	obj.attachEvent("on"+event,obj[fun]);
     }else{
     	obj.addEventListener(event,obj[fun],false )
     }
} 
 



/**********************************************/
// 11.移除事件的兼容函数

function removeEvent(obj,event,fun){
     if(obj.detachEvent){
     	obj.detachEvent("on"+event,obj[fun]); 
     }else{
     	obj.removeEventListener(event,obj[fun],false )
     }
}




/**********************************************/
// 12.鼠标的滚轮事件
// up向上    down向下


function mouseWheel(obj,up,down){
   if(obj.attachEvent){
   	if(e.preventDefault){
		    	// w3c阻止浏览器的默认行为
		    	e.preventDefault();
		    }else{e.returnValue=false;//IE
		         }
   	obj.attachEvent("onmousewheel",scrollFn);
   	//IE   opera
   }else if(obj.addEventListener){
   	if(e.preventDefault){
		    	// w3c阻止浏览器的默认行为
		    	e.preventDefault();
		    }else{e.returnValue=false;//IE
		         }
   	obj.addEventListener("mousewheel",scrollFn,false);
   	//chrome,safari   =webkit=
   	obj.addEventListener("DOMMouseScroll",scrollFn,false);
   	//firefox  -moz-
   }

   function scrollFn(e){
	e=e||window.event;
	var f=e.detail || e.wheelDelta;
	if(f==-3 || f==120){
		if(up){
			up();
		}
		
	}
	if(f==3 || f==-120){
		if(down){
			down();
		}
		
	}
   }

}



//hover     9.8日   周四下午
//13.判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/















