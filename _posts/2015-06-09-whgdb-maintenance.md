---
layout: post
title:  "whg_memo"
keywords: ""
description: ""
category: oracle
tags: []
---

***配置***

版本: `ORACLE 11.2.0.1.0` 64位

实例名：`ORCL`

安装目录：`/orainst/oracle/app/oracle/product/11.2.0/dbhome_1`

数据目录：`/oradata`

归档目录：`/archive`

Oracle用户口令：`oracle`

***数据库、监听启停***

使用cisco vpn连接whg局域网，使用`securecrt`以`telnet`协议连入主机:

```sql
$ sqlplus /nolog
Sql>conn / as sysdba
Sql>startup
Sql>shutdown
```

```sql   
$ lsnrctl
Lsnrctl> start
Lsnrctl> stop
```	

***数据库备份***

```PowerShell
# backup.sh

rq=`date +20%y%m%d`
export ORACLE_HOME=/orainst/oracle/app/oracle/product/11.2.0/dbhome_1
export NLS_LANG=AMERICAN_AMERICA.ZHS16GBK
export BACKUP=/orainst/whgdbbak
$ORACLE_HOME/bin/exp system/oracle file=$BACKUP/whg_backup_$rq.dmp log=$BACKUP/whg_backup_$rq.log owner=whg rows=y
```	

***数据库还原***

```sql  
imp system/whgcs@whgcs file=whg_backup.dmp full=y ignore=y
```	

注意：

*1.`imp whgcs/whgcs@whgcs file=whg_backup.dmp full=y ignore=y`，提示错误，原因是以`system`导出的备份不能以`whgcs`导入。*

*2.`system`导出时设置了`owner=whg`，导出的备份文件包含用户`whg`的全部`obejcts`，要还原到的测试库必须要建立相应的`whg`用户，如果不想建立`whg`用户，而导入到`whgcs`用户，则 `imp system/whgcs@whgcs file=whg_backup.dmp fromuser=whg touser=whgcs ignore=y`。*

*3.部署测试数据库的156的那台server，用户登陆时必须用oracle用户，而不能root，否则导入文件的时候会提示不让读文件。*

***测试***

```sql   
export ORACLE_SID =whgcs;
```	


