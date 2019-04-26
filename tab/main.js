function changePage(tag) {
    const pageContainer = document.getElementsByClassName('page-container')[0];
    pageContainer.childNodes[tag].style.display = 'block';
    pageContainer.childNodes[4 - tag].style.display = 'none';
}

let tabObj = {
    showTab: 0,
};
Object.defineProperty(tabObj, 'showTab', {
    set: function (value) {
        changePage(1 + value * 2);
    }
});

const tabContainer = document.getElementsByClassName('tab-container')[0];
tabContainer.firstElementChild.addEventListener('click', function () {
    tabObj.showTab = 0;
});
tabContainer.lastElementChild.addEventListener('click', function () {
    tabObj.showTab = 1;
});