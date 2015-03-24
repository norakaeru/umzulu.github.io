---
layout: post
title:  "CSS position之absolute,relative"
keywords: "position absolute relative"
description: "CSS的position:fixed和position:relative"
category: css
tags: [css布局]
---

position布局常用的有四种：absolute,relative,fixed,static。以下是w3school对position四个值的解释：

*`absolute`* 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。

*`fixed`* 生成绝对定位的元素，相对于浏览器窗口进行定位。

*`relative`* 生成相对定位的元素，相对于其正常位置进行定位。

*`static`* 默认值。没有定位，元素出现在正常的流中。

我们就最常用的absolute和relative分析一下：

***absolute（绝对定位）***

*1.绝对定位是脱离文档流的。*

*2.如果父元素是非static的（比如设置了`postion:absolute`，`postion:relative`），则按父元素进行TRBL定位。*

*3.如果父元素是static的（默认`position:static`），则按照浏览器进行TRBL定位。*

<style type="text/css">
@media (max-width:767px) {
.parent {width:75% !important;}
}
.parent {
    height:302px;
    width:50%;
    background-color:#ccc;
    color:#000;
    border:1px solid #000;
    margin-bottom:10px;
}
.sub-a {
    height:100px;
    width:100px;
    background-color:#8B3A3A;
}
.sub-b {
    height:100px;
    width:100px;
    background-color:#388E8E;
}
.sub-c {
    height:100px;
    width:100px;
    background-color:#8E8E38;
}
</style>

下面是三个block元素div1,div2,div3:

<div class="parent">
    <div class="sub-a"><span>div1</span></div>
    <div class="sub-b"><span>div2</span></div>
    <div class="sub-c"><span>div3</span></div>
</div>

下图是将div2设置为绝对定位后的效果，可以看出：首先div2是按照父div进行定位的（父div设置了`position:relative`），其次div2原先的位置被div3占据了

<div class="parent" style="position:relative;">
    <div class="sub-a"><span>div1</span></div>
    <div class="sub-b" style="position:absolute;top:50px;left:50px;"><span>div2</span></div>
    <div class="sub-c"><span>div3</span></div>
</div>

***relative（相对定位）***

*1.相对定位是相对于元素本身在文档中的位置进行TRBL定位。*

*2.相对定位不脱离文档流（相对定位的元素仍然占据着文档中原来的位置）。*

下图是将div1设置为相对定位后的效果，可以看出：首先div2是按照其原来的位置进行定位的，其次div2仍然保留其原来的位置

<div class="parent" style="position:relative;">
    <div class="sub-a"><span>div1</span></div>
    <div class="sub-b" style="position:relative;top:50px;left:50px;"><span>div2</span></div>
    <div class="sub-c"><span>div3</span></div>
</div> 








