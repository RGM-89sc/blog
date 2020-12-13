---
[title]:Scrapy安装失败：MicrosoftVisualC++14.0isrequired
[time]:2019-02-08
[tags]: Python
---

执行命令

```bash
pip install scrapy
```

后出现报错：Microsoft Visual C++ 14.0 is required导致安装失败，按照 [https://www.scivision.co/python-windows-visual-c++-14-required](https://www.scivision.co/python-windows-visual-c++-14-required/) 中的解决方式没有得以解决，于是经过搜索发现是Scrapy的依赖twisted是需要编译的，那直接安装已编译的twisted就好了。

在 https://www.lfd.uci.edu/~gohlke/pythonlibs 中找到Twisted这个包，挑选python版本和系统版本都合适的进行下载（cp后面的数字即为python版本，如cp37即为python3.7）。

下载完成后使用pip安装这个whl文件

```bash
pip install <whl文件的路径>
```

安装完成后再安装scrapy

```bash
pip install scrapy
```