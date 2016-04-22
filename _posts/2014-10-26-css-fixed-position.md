---
layout: post
title:  "CSS position之fixed"
keywords: "position:fixed"
description: "CSS的position:fixed"
category: css
tags: [css布局]
---

position布局中的fixed布局相对于absolute,relative比较容易，它是相对于浏览器的窗口定位。下面是我用fixed布局来实现的div居中和div右下角的小样，效果可以自行验证。

{% highlight html %}

<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
<title>position:fixed</title>  
  
<style type="text/css">  
    html,body{height:100%;margin:0;padding:0;font-size:12px;}  
      
    #container{
    	width: 1200px;
        height: auto;
    	background-color: #ccc;
        margin: 0 auto;  
    }
      
    .center-fixed{
       position: fixed;
       top: 50%;
       left: 50%; 
       width: 240px;
       height: 160px;
       margin-top: -80px;
       margin-left: -120px;
       _position: absolute; /*IE6 hack*/
       _top: expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight/2));
       _left: expression(eval(document.documentElement.scrollLeft+document.documentElement.clientWidth/2));
    }  
      
    .bottom-fixed{
       position: fixed;
       right: 10px;  
       bottom: 10px;
       width: 240px;
       height: 160px;
       _position: absolute; /*IE6 hack*/
       _top: expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-10));
       _left: expression(eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth-10));
    }

    .box{
       width: 100%;
       height: 100%;
       border: 1px solid #aaa;  
       background-color: #eee;  
     }

</style>  
  
</head>  
  
<body>
  
  <div id="container">
     <div style="height:500px;background-color:#ababab"><p>一段内容</p></div>
     <div style="height:500px;background-color:#cdcdcd"><p>一段内容</p></div>
     <div style="height:500px;background-color:#ababab"><p>一段内容</p></div>
     <div style="height:500px;background-color:#cdcdcd"><p>一段内容</p></div>
  </div>     
      
  <div class="center-fixed">
     <div class="box">
         <div style="padding:5px;">
            <span>"要让DIV水平和垂直居中，要先知道该DIV的宽度和高度，然后设置位置为绝对位置，
            距离页面窗口左边框和上边框的距离设置为50%，这个50%就是指页面窗口的宽度和高度的50%，
            最后将该DIV分别左移和上移，左移和上移的大小就是该DIV宽度和高度的一半"</span>
         </div>
     </div>
  </div>  
      
  <div class="bottom-fixed">
     <div class="box">
         <div style="padding:5px;">
            <span>"IE7以上支持position:fixed，IE6可用绝对定位模拟固定定位"</span>
         </div>
     </div>
  </div>
  
</body>  
</html>  

{% endhighlight %}



