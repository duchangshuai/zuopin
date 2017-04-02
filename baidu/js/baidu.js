$(function () {
    var clienth=$(window).height();
    var num=0;
    var falg=true;
    $("#full").mousedown(function (e) {
        e.preventDefault()
    })
    $("#full").mousemove(function (e) {
        e.preventDefault()
    })
    touch.on("body","swipeup","#full",mouseup)
    touch.on("body","swipedown","#full",mousedown)
    $("#full")[0].addEventListener("webkitTransitionEnd",function () {
        falg=true;
        $("section").each(function(index,obj){
            nub=$(this).index()
            if(nub==-1){
                return;
            }
            if(num!==-1){
                if(nub==num-1){
                    $(".mar").eq(nub).css({
                        transform: "translate(0px,0)",opacity: 1
                    })
                    $(".right-img").eq(index).css({
                        transform: "translate(0px,0)",opacity: 1
                    })

                }else{
                    $(".mar").eq(index).css({
                        transform: "translate(-100px,0)",opacity:0
                    })
                    $(".right-img").eq(index).css({
                        transform: "translate(100px,0)",opacity:0
                    })
                }
            }
        })

    })
    function mouseup() {
        if(!falg){
            return;
        }
        num++;
        if(num==$("section").length){
            num=$("section").length-1;
            return;
        }
        falg=false;
        $(".lunbo div").removeClass("active").eq(num).addClass("active");
        $("#full").css({marginTop:-num*clienth})
    }
    function mousedown() {
        if(!falg){
            return;
        }
        num--;
        if(num==-1){
            num=0;
            return;
        }
        falg=false;
        $(".lunbo div").removeClass("active").eq(num).addClass("active");
        $("#full").css({marginTop:-num*clienth})
    }
    // 操作菜单
    var flag2=true;
    $(".cai").click(function () {
       if(flag2){
           $(".menubox").css({
               display:"block"
           })
         $(this).find(".cait").css({
             transform:"translate(0,6px) rotate(45deg)"
         })
           $(this).find(".caib").css({
               transform:"translate(0,-6px) rotate(-45deg)"
           })
           $(".menubox a").each(function(index,obj){
               $(obj).css({
                   opacity:"0",
                   transform:"rotateX(90deg)",
                   animation:"menu 0.3s linear forwards "+0.2*index+"s"
               })
           })
           flag2=false;
       }else{
           $(this).find(".cait").css({
               transform:"translate(0,0) rotate(0deg)"
           })
           $(this).find(".caib").css({
               transform:"translate(0,0) rotate(0deg)"
           })
           $(".menubox a").each(function(index,obj){
               $(obj).css({
                   opacity:"1",
                   transform:"rotateX(0deg)",
                   animation:"menu1 0.3s linear forwards "+(1.2-0.2*index)+"s"
               })
           })

           // 清楚浏览器的默认行为
           setTimeout(function () {
               $(".menubox").css({
                   display:"none"
               })
           },1200)
           flag2=true;
       }
    })
// 检测窗口变化
    $(window).resize(function () {
        clienth=$(window).height();
        var clientw=$(window).width();
        $("#full").css({
            marginTop:-num*clienth
        })
        if(clientw>1000){
            $(".menubox a").each(function(index,obj){
                $(obj).css({
                    animation:"none"
                })
            })
          $(".cait").css({
                transform:"translate(0,0) rotate(0deg)"
            })
          $(".caib").css({
                transform:"translate(0,0) rotate(0deg)"
            })
            flag2=true;
        }
    })
// 轮播点击
        $(".lunbo div").click(function () {
            num=$(this).index();
            $(".lunbo div").removeClass("active").eq(num).addClass("active");
            $("#full").css({"marginTop":-num*clienth})
        })

    $(".xiahua").click(function(){
        num=$(this).index(".xiahua")+1;
        $(".lunbo div").removeClass("active").eq(num).addClass("active");
        $("#full").css({"marginTop":-num*clienth})
    })
    // 滚轮滚动事件
    $("#full").mousewheel(mouseup,mousedown)
    
})