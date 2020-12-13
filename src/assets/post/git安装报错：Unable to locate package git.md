---
[title]:git安装报错：Unabletolocatepackagegit
[time]:2018-03-25
[tags]: Linux
---

我在Ubuntu 16.04上使用

```bash
sudo apt-get install git
```

安装git的时候出现了Unable to locate package git的错误

![img](https://s3.ax1x.com/2020/12/13/reb1YD.png)

解决办法：
使用

```bash
sudo apt-get update
```

update完成后再安装git就不会报错了