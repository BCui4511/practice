function tabPage(id, content) {
    this.id = id;
    this.content = content;
    this.pageHTML = `<div id="${id}" class="tab-page">${content}</div>`;
}


function Tab(id, className, buttonTextArray, pageArray, parentElement) {
    // 内部方法
    const _getTabHTML = function(n, pageArray) {
        let buttonString = '<div class="button-container">';
        let pageString = '<div class="page-container">';
        for(let i = 0; i < n; i++) {
            buttonString += `<button id="button${i}" class="tab-button">${buttonTextArray[i]}</button>`;
            pageString += pageArray[i].pageHTML;
        }
        buttonString += '</div>';
        pageString += '</div>';
        return `${buttonString}${pageString}`;
    };
    // 参数合法性判断

    // 基本属性
    this.pageCount = pageArray.length;
    this.tabHTML = _getTabHTML(this.pageCount, pageArray);
    const tabElement = document.createElement('div');
    tabElement.id = `${id}`;
    tabElement.className = `tab ${className}`;
    tabElement.innerHTML = this.tabHTML;
    this.tabElement = tabElement;
    this.curPage = 0;
    this.changeState(0, true);

    // 监听点击事件
    this.tabElement.addEventListener('click', (event) => {
        const buttonId = event.target.id;
        if (buttonId.indexOf('button')<0) { return; }
        const curNum = +buttonId.slice(6);
        if (curNum === this.curPage) { return; }
        this.changeState(this.curPage, false);
        this.changeState(curNum, true);
        this.curPage = curNum;
    });
    // 加入父元素
    parentElement.appendChild(this.tabElement);
}
// 公共方法
// 改变按钮和页面的选中状态
Tab.prototype.changeState = function(n, stateBool) {
    const curButton = this.tabElement.childNodes[0].childNodes[n];
    const curPage = this.tabElement.childNodes[1].childNodes[n];
    if (curButton && curPage) {
        if (stateBool) {
            curButton.classList.add('clicked-button');
            curPage.classList.add('clicked-page');
        } else {
            curButton.classList.remove('clicked-button');
            curPage.classList.remove('clicked-page');
        }
    } else {
        console.error('索引错误');
    }
};
// 添加页面
Tab.prototype.addPage = function(buttonTextArray, pageArray) {
    const length = pageArray.length;
    let buttonString = '',
        pageString = '';
    const lastPageCount = this.pageCount;
    for (let i = 0; i < length; i++) {
        buttonString += `<button id="button${lastPageCount + i}" class="tab-button">${buttonTextArray[i]}</button>`;
        pageString += pageArray[i].pageHTML;
    }
    const newButton = document.createElement('div');
    const newPage = document.createElement('div');
    this.tabElement.childNodes[0].appendChild(newButton);
    this.tabElement.childNodes[1].appendChild(newPage);
    newButton.outerHTML = buttonString;
    newPage.outerHTML = pageString;
    this.pageCount += length;
}

const page1 = new tabPage('page1', '这是第一个页面');
const page2 = new tabPage('page2', '这是第二个页面');
const page3 = new tabPage('page3', '这是第三个页面');
const page4 = new tabPage('page4', '这是第四个页面');
const page5 = new tabPage('page5', '这是第五个页面');

const tab1 = new Tab('tab1', 'tab1', ['button1','button2','button3'], [page1, page2, page3], document.body);
const tab2 = new Tab('tab2', 'clearfix', ['button1','button2','button3'], [page1, page2, page3], document.body);
tab2.addPage(['button4','button5'],[page4,page5]);