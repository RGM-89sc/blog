---
[title]:MySQL插入中文报错：ERROR1366(HY000)
[time]:2018-05-03
[tags]: MySQL
---

MySQL安装完后默认是latin1编码，当我们在表中插入中文后就会出现ERROR 1366 (HY000)的报错，写入失败，某书上有这样的解决方法：

1、找到MYSQL安装目录中的一个名为my.ini的数据配置文件。
2、找到文件中两处“default-character-set=latinl”，将latinl换成GBK。
3、重新启动MySQL服务即可。如果在此之前创建过数据库，则可以先删除数据库，在服务重新启动后再重新创建。

但这个方法并没有帮我解决到ERROR 1366 (HY000)的问题，上网找过好几篇文章后找到了如下可行方法：

登录MySQL
输入：

```bash
show variables like '%char%';
```

就会显示当前的字符集设定

我们需要把所有字符集的项都设定成utf-8
如：设置character_set_database为utf-8：

```bash
set character_set_database=utf8;
```

剩下的设置项的设置方法如上，只需将character_set_database替换成要设置的项名即可

设置完成后：

![img](https://s3.ax1x.com/2020/12/13/rebKw6.png)

这时已经可以成功在Navicat Premium中插入中文了，但在命令行中还是会报ERROR 1366 (HY000)的错
解决方法：

输入：

```bash
set character_set_client=gbk;
set character_set_results=gbk;
```

这时在命名行中对表插入中文也没有报错了，但是这个方法只对当前本次修改起作用，一旦把MySQL的命令行窗口关掉以后又恢复了，只能在下一次又再输入两次上面两条命令