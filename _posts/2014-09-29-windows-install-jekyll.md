---
layout: post
title:  "在Windows上安装Jekyll"
keywords: "Windows上安装jekyll"
description: "在Windows上安装jekyll"
category: jekyll
tags: [jekyll]
---

Jekyll是一个由ruby开发的静态站点生成器，我们可以使用GitHub和Jekyll来搭建自己的博客。下面讲一下在Windows下安装Jekyll的过程。

 ***安装Ruby***

 1.下载`rubyinstaller` [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
 
 2.安装
  
  1)最好保持默认的路径`C:\Ruby2`， 因为安装包明确提出 “请不要使用带有空格的文件夹 (如：`Program Files`)”。

  2)勾选 “`Add Ruby executables to your PATH`”，这样执行程序会被自动添加至系统环境变量PATH。
  
  ![ruby-setup]({{site.cdn}}/ruby-setup.png)
  
 3.查看`Ruby`是否成功安装
 
 ```PowerShell
 > ruby -v
 ```
 
 ***安装DevKit***
 
 `DevKit`是一个在Windows上帮助简化安装及使用`Ruby C/C++`扩展如`RDiscount`和`RedCloth`的工具包。

 1.下载同`Ruby`版本相对应的`DevKit`安装包 [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
 
 2.运行安装包并解压至某文件夹，如`C:\DevKit`
 
 3.安装
 
 ```PowerShell
 > cd "C:\DevKit"
 > ruby dk.rb init
 > notepad config.yml
 ```
 
 在末尾添加新行 “`- C:\Ruby2`”，（ruby安装目录），保存文件并退出。
 
 ```PowerShell
 > ruby dk.rb review
 > ruby dk.rb install
 ```
 
 ***安装Jekyll***
 
 可以将`RubyGems`的源地址改为国内的镜像，以提高安装的速度。
 
 ```ruby
 > gem sources --remove https://rubygems.org/
 > gem sources --add http://ruby.taobao.org/
 ```
 
 ```PowerShell
 > gem install jekyll
 ```
 
 Jekyll默认的语法高亮插件是Python开发的Pygments，所以我们首先要安装Python。
 
 ***安装Python***
 
 1.下载`Python`安装文件  [http://www.python.org/download/](http://www.python.org/download/)
 
 2.安装并添加安装路径（如`C:\Python27`）至PATH
 
 3.查看`Python`是否成功安装
 
 ```PowerShell
 > python -v
 ```
 
 ***安装Easy_Install***
 
 1.查看 [http://pypi.python.org/pypi/setuptools](http://pypi.python.org/pypi/setuptools) 如何安装`setuptools`
 
 2.对于Windows7的机器，下载 [ez_setup.py](https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py) 并保存到`C:\ez_setup.py`， 然后从命令行使用`Python`运行此文件：
 
 ```Ruby
 > python C:\ez_setup.py
 ```
 
 3.添加Python的Scripts路径 (如：`C:\Python27\Scripts`) 至PATH
 
 4.查看`easy_install`是否正确安装
 
 ```Python
 > easy_install --version
 ```
 
 ***用Easy_Install安装Pygments***
 
 ```Python
 > easy_install pygments
 ```
 
 至此Jekyll安装完毕。
 