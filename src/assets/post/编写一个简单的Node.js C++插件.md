---
[title]:编写一个简单的Node.jsC++插件
[time]:2018-06-15
[tags]: JavaScript;Node.js
---

# 准备工作

安装Python2: https://www.python.org/downloads/

安装node-gyp:

```bash
npm install node-gyp -g
```

在工程目录下创建package.json文件：

```bash
npm init
```

一路选择默认即可，也可根据提示填写相关内容，确认生成package.json文件后对其进行修改，增加以下内容：

```json
"dependencies": {
    "bindings": "",
    "nan": ""
 }
```

使用npm install命令来安装依赖包bindings和nan

```bash
npm install
```

# 开始编写

创建hello.cc文件，示例内容：

```cpp
#include <node.h>

namespace demo {

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void Method(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "hello", Method);
    }

    NODE_MODULE(addon, init)  // 导出初始化函数init，插件名为addon

}
```

# 构建

在项目根目录下创建binding.gyp文件，内容为：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

使用命令

```bash
node-gyp configure
```

为当前平台生成相应的项目构建文件，在 build/ 目录下会生成一个 Makefile 文件（在 Unix 平台上）或 vcxproj 文件（在 Windows 上）

由于node-gyp不支持Python3，只支持Python2，所以在使用这个命令前要先安装好Python2，否则就会出现gyp ERR! stack Error: Can’t find Python executable ‘python’报错，如果Python2已经安装好了，但node-gyp找不到Python2的路径，则需要设置：

```bash
node-gyp --python /path/to/python2.7
```

接下来是对插件源代码进行编译：
使用命令：

```bash
node-gyp build
```

生成编译后的 addon.node 的文件，它会被放进 build/Release/ 目录

当需要再次生成编译后的文件时可以使用命令：

```bash
node-gyp rebuild
```

这个命令可以一次性执行clean、configure和build命令

更多有关node-gyp的内容可参见：https://github.com/nodejs/node-gyp

# 加载模块

构建完成后就可以使用require()来加载我们写好的插件模块了

```javascript
const addon = require('./build/Release/addon');

console.log(addon.hello());
```

运行后就会在控制台中输出”world”

------

以上内容参考自Node.js v10.3.0 文档：http://nodejs.cn/api/addons.html