---
layout: post
title:  "ORACLE LEAD函数"
keywords: "lead over"
description: "ORACLE的LEAD函数"
category: oracle
tags: [lead over]
---

***lead() over()***

`LAG/LEAD`函数是`ORACLE`特有的分析函数，它允许我们`SELECT`某字段的前N行的数据（`Lag`）和后N行的数据（`Lead`）作为独立的列。

我举一个业务中遇到的实例，在做船票售票系统时，用户要求出N张连续铺位的票，因为多家代售点同时出票，中间的铺位可能被选走（锁定或售出），这在实时售票系统中是会经常遇到的，
我们肯定不能按铺位号顺序出票了。

ID_    |BERTH\_CODE_ |IS\_LOCKED_        
----   |----         |---- 
1      |001          |'N'
2      |002          |'N'
3      |003          |'Y'
4      |004          |'N'
5      |005          |'N'
6      |006          |'N'

测试表TEST中003的铺位已经被锁定，如果乘客要买3张连续铺位的船票，此时该如何选择铺位?

我用到了`ORACLE`的分析函数`LEAD`:

{% highlight sql %}
 select id_, to_number(berth_code_), to_number(berth_code_) + ?1 as expect_code_, 
 lead(to_number(berth_code_), ?1) over (order by to_number(berth_code_)) as actual_code_ 
 from TEST
 where is_locked_ = 'N';
{% endhighlight %}

`?1`的传值是N-1（N为售票数），此时应该是3-1=2。

查询结果：

ID_    |BERTH\_CODE_ |EXPECT\_CODE_ |ACTUAL\_CODE_
----   |----         |----          |----
1      |1            |3             |4
2      |2            |4             |5
4      |4            |6             |6
5      |5            |7             |NULL
6      |6            |8             |NULL

我选3张票，比如此时铺位号是`to_number('001')`=1，我期望2个铺位号后是3，但实际`OFFSET 2`后是4，不符合PASS...

直到`expect_code_` = `actual_code_`，才找到符合条件的。

{% highlight sql %}
select * from
( select id_, berth_code_, to_number(berth_code_) + ?1 as expect_code_, 
  lead(to_number(berth_code_), ?1) over (order by to_number(berth_code_)) as actual_code_ 
  from TEST
  where is_locked_ = 'N' ) t
 where t.expect_code_ = t.actual_code_ and ROWNUM < 2;
{% endhighlight %}

然后再用`BETWEEN berth_code_ AND expect_code_`即可查询出所需铺位。