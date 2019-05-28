### 用法
按照如下结构写入HTML
```html
<div id="tab1">
        <ul>
            <li>第一个页面名字</li>
            <li>第二个页面名字</li>
            <li>...</li>
            <li>...</li>
            <li>...</li>
            ...
        </ul>
        <div>
            <div>第一个页面内容</div>
            <div>...</div>
            <div>...</div>
            <div>...</div>
            <div>...</div>
            ...
        </div>
    </div>
```

引用`Tab.js`

在页面的js文件中调用Tan构造函数，传入tab根结点id和opt对象，即可按照默认样式创建tab组件。

### todo
-支持多种样式
-异常情况处理及容错
