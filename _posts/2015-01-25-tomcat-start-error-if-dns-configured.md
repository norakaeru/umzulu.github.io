---
layout: post
title:  "Aix配置DNS后Tomcat启动异常"
keywords: ""
description: "AIX配置DNS后Tomcat启动异常"
category: unix
tags: [unix]
---

unix服务器配置DNS上网：

{% highlight bash %}
vi /etc/resolv.conf
# add DNS
nameserver x.x.x.x
{% endhighlight %}

添加DNS地址，并重启网络服务以生效：

{% highlight bash %}
refresh inetd
{% endhighlight %}

修改之后能ping通外网了，似乎一切都非常顺利，但是当我启tomcat时却遇到了麻烦：shell里虽然显示`success started`，但是在访问8080时却长时间没有反应，查看tomcat日志后发现错误：`SEVERE: StandardServer.await: create[8005]: Throwable occurred: java.net.BindException: The socket name is not available on this system.`

并且！当我试图再一次telnet登陆服务器时，长时间处于等待状态。因为只修改了DNS配置，我断定是由DNS配置造成的。

最终在tomcat wiki中找到了解决办法：`Your networking configuration is not correct. If you attempt to ping localhost and don't see 127.0.0.1 you need to look into your /etc/host.conf (most Unixes/Linux) or /etc/netsvc.conf (AIX) file to ensure that something like "hosts = local, bind" is present.`

{% highlight bash %}
vi /etc/netsvc.conf
{% endhighlight %}

添加保存`hosts = local, bind`，搞定。别忘了重启网络服务，我在这也踩过坑。

原来unix主机上诸如`telnetd,ftpd,logind`这类服务，通常会在接受连接前先要取得客户机的ip地址，如果配置了DNS，就会通过DNS解析客户端的域名，糟糕的是telnetd需要等待域名解析结束或超时后才会做下一步的工作。而tomcat的错误也是由于默认启用了域名解析，可以查一下`tomcat enablelookups`，这里不再累赘。

在这也需要说明一下DNS的解析顺序，默认先`DNS`,然后`NIS`,最后才是`/etc/hosts`，我们可以通过修改`/etc/netsvc.conf`来修改解析顺序。这样在DNS解析之前，先检查`/etc/hosts`中是否有这个地址的映射关系，如果有则直接返回，而不用再请求网络上的DNS服务器了。

还有为什么DNS解析localhost失败呢？这里不再深入研究。
