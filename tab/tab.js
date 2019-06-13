function Tab(id, opt) {
    this.tabNode = document.getElementById(id);
    this.liList = this.tabNode.firstElementChild.children;
    this.pageList = this.tabNode.lastElementChild.children;
    this.pageCount = this.pageList.length;
    this.currentPage = -1;
    this.init(opt);
    this.tabNode.addEventListener('click',(e) => {
        if (typeof e.target.dataset.tabIndex !=='string') {
            return;
        }
        const index = Number(e.target.dataset.tabIndex);
        this.changePage(index);
    })
}
// 初始化
Tab.prototype.init = function (opt) {
    const tabClass = this.tabNode.classList;
    // 是否覆盖样式
    if (!tabClass.contains('cover-tab-style')) {
        if (opt && opt.style) {
            // 支持多种样式
            tabClass.add(opt.style + '-tab');
        } else {
            tabClass.add('normal-tab');
        }
    }
    Array.from(this.pageList).forEach((item) => {
        item.classList.add('tab-page');
    });
    Array.from(this.liList).forEach((item,index) => {
        item.dataset.tabIndex = index;
    });
    const n = opt ? (opt.startPage || 0) : 0;
    this.changePage(n);
}
// 切换页面
Tab.prototype.changePage = function (n) {
    if (this.currentPage === n) {
        return;
    }
    if (this.currentPage > -1) {
        this.liList[this.currentPage].classList.remove('clicked-li');
        this.pageList[this.currentPage].classList.remove('clicked-page');
    }

    this.liList[n].classList.add('clicked-li');
    this.pageList[n].classList.add('clicked-page');
    this.currentPage = n;
}

// opt 选项
// opt = {
//     startPage: Number,
//     style: String,
// }
