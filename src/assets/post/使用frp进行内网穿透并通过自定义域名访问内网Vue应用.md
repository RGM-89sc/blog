---
[title]:使用frp进行内网穿透并通过自定义域名访问内网Vue应用
[time]:2018-10-18
[tags]: 内网穿透
---

摘自：[frp中文文档](https://github.com/fatedier/frp/blob/master/README_zh.md)：

> frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp, http, https 协议。
>
> frp可以利用处于内网或防火墙后的机器，对外网环境提供 http 或 https 服务。
>
> 对于 http, https 服务支持基于域名的虚拟主机，支持自定义域名绑定，使多个域名可以共用一个80端口。
>
> 利用处于内网或防火墙后的机器，对外网环境提供 tcp 和 udp 服务，例如在家里通过 ssh 访问处于公司内网环境内的主机。

有了frp，我们就可以使用自定义域名访问内网的web应用，下面这个例子是使用frp进行内网穿透，外网访问内网的Vue应用：

# 下载frp

进入frp的releases页面：https://github.com/fatedier/frp/releases

挑选合适的版本进行下载，比如客户机的操作系统是win 10 64位则下载windows_amd64版本，拥有公网ip的服务器是Ubuntu，CPU架构是X86_64则下载linux_amd64版本

然后将 **frps** 及 **frps.ini** 放到具有公网 IP 的机器上， **frpc** 及 **frpc.ini** 放到处于内网环境的机器上。

# 在拥有公网ip的机器上配置frps.ini:

解压tar.gz文件：

```bash
tar -xvf ./frp_0.21.0_linux_amd64.tar.gz
```

配置frps.ini：

```ini
; frps.ini
[common]
bind_port = 9000
; bind_port是frp在拥有公网ip的机器上运行的端口，默认为7000
vhost_http_port = 8082
; vhost_http_port是http访问端口，默认为8080
; 如果想使用https则把vhost_http_port改成vhost_https_port即可
```

配置完成后启动frps：

```bash
./frps -c ./frps.ini
```

如果出现报错：-bash: ./frps: cannot execute binary file: Exec format error则是表明版本下载错了

然后开放这些端口的访问（比如阿里云的服务器可以在安全组配置中开放端口），将 `www.yourdomain.com` 的域名 A 记录解析到 IP `x.x.x.x`，如果服务器已经有对应的域名，也可以将 CNAME 记录解析到服务器原先的域名

# 在内网环境机器上配置frpc.ini

```ini
; frpc.ini
[common]
server_addr = x.x.x.x
; 服务器的公网ip
server_port = 9000
; server_port于你在拥有公网ip的机器上的frps.ini中的bind_port相同

[web]
type = http
; 如果使用https则写成https
local_port = 8082
; 本地开放http访问的端口
custom_domains = www.yourdomain.com
; 访问域名
```

配置完成后启动frpc：

```bash
./frpc -c ./frpc.ini
```

在windows下还可以在cmd中运行frpc.exe

# 从外网访问内网web服务

打开浏览器，通过 协议://域名:端口号 访问内网web服务就OK了

但是如果访问的是Vue应用，那还需要多配置一些东西

dev模式下启动Vue应用之后再外网访问内网会返回**invalid host header**，这是因为webpack会检查hostname，如果hostname不在配置内，就会拒绝这个访问

解决办法：在vue.config.js中加上devServer配置：

```javascript
module.exports = {
  devServer: {
    disableHostCheck: true
  },
}
```

关于devServer的详细，可以查看Vue-cli的配置参考文档：https://cli.vuejs.org/zh/config/#devserver

