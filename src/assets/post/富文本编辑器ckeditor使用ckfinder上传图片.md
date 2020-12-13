---
[title]:富文本编辑器ckeditor使用ckfinder上传图片
[time]:2019-03-24
[tags]: JavaScript
---

我在使用vue+ckeditor+ckfinder做一个上传图片的功能时踩到了坑：图片已经上传到服务器了，但在前端会弹出alert提示图片上传失败，所以记录下来以防以后再踩一次。

首先先把ckeditor作为组件导入，然后根据[ckfinder的文档](https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/ckfinder.html)导入CKFinder：

```javascript
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
```

在vue的组件data中配置好ckfinder：

```javascript
export default {
  data() {
    return {
      editorConfig: {
        plugins: [
          CKFinder,
          ...
        ],

        toolbar: {
          items: [
            'imageUpload',
              ...
          ]
        },

        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: '上传图片的后台接口地址',
          options: {
            resourceType: '.jpg,.jpeg,.png'  // 允许上传的图片后缀名
          }
        }
      }
    };
  },
}
```

把editorConfig传给ckeditor组件（editor是导入的ckeditor，editorData是富文本字符串，相关文档：[Rich text editor component for Vue.js](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html)）：

```vue
<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
```

这样，前端方面就基本没有问题了，剩下的是后端，后端接口把上传的图片存起来后需要返回特定的数据格式：

```javascript
{
  uploaded: 1, // 写死，不需要改
  fileName: 'filename', // 图片名
  url: 'https://example.com/image/url'  //上传到后台后可访问的图片的url
}
```

否则，如果返回的数据格式不对，在前端就会alert提示图片上传失败。