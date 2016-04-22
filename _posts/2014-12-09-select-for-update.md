---
layout: post
title:  "SELECT FOR UPDATE"
keywords: "select for update"
description: "数据库锁"
category: oracle
tags: [for update]
---

***select ... for update***

`SELECT...FOR UPDATE`是数据库的加锁语句，该语句用来锁定`SELECT`的行，当这些行被锁定后，其他会话可以`SELECT`这些行，但不能`UPDATE(DELETE)`这些行，直到该语句的事务被`COMMIT`或`ROLLBACK`为止。

ID_    |VALUE_          
----   |----           
1      |1       
2      |2    
3      |3        

我们用测试表TEST一下:

{% highlight sql %}
--会话1
SQL> select * from TEST where id_= 1 for update;
{% endhighlight %}

第一行被`FOR UPDATE`加锁，然后我们再新建一个会话：

{% highlight sql %}
--会话2
SQL> select * from TEST where id_= 1;
SQL> update TEST set value_ = 100 where id_= 1;
{% endhighlight %}

会话2能`SELECT`到记录，但是在`UPDATE`时一直`BLOCK`，直至会话1执行`COMMIT`或者`ROLLBACK`为止：

{% highlight sql %}
--会话1
SQL> commit;
{% endhighlight %}

我们继续对会话1`FOR UPDATE`加锁，然后再对会话2`FOR UPDATE`加锁，发现会话2也会一直`BLOCK`：

{% highlight sql %}
--会话2
SQL> select * from TEST where id_= 1 for update;
{% endhighlight %}

那么怎么才能跳出`BLOCK`呢？

***nowait skip locked***

{% highlight sql %}
--会话2
SQL> select * from TEST where id_= 1 for update nowait;
SQL> select * from TEST where id_= 1 for update wait 3;
{% endhighlight %}

两条语句都能跳出`BLOCK`，且会抛出资源被占用异常。1会立即抛出，2会在等待3秒后抛出。

{% highlight sql %}
--会话2
SQL> select * from TEST where id_= 1 for update skip locked;
{% endhighlight %}

啥意思呢？会话2在`FOR UPDATE`时，先判断是否被其他会话加锁了，是则跳过，否则加锁。

`SELECT ... FOR UPDATE SKIP LOCKED`在并发访问数据库中还是用得比较多的。




