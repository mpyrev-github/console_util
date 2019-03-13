const { showTODO } = require('./showing');

function sortTodo(arr, param) {
    let sortedArr;
    sortedArr = arr.slice(0);
    let func;
    switch (param) {
        case 'importance':
            func = sortByImp;
            break;
        case 'user':
            func = sortByUser;
            break;
        case 'date':
            func = sortByDate;
            break;
        default:
            console.log('wrong command');
            break;
    }
    sortedArr.sort(func);
    sortedArr.sort(func); // В связи с особенностями метода sort необходима повторная сортировка
    showTODO(sortedArr);
}

function sortByImp(a, b) {
    return b[5]-a[5];
}

function sortByUser(a, b) {
    if(a[0]===""){
        return 1;
    } else if (b[0]===""){
        return 0;
    }
    if (a[0].toUpperCase()>b[0].toUpperCase()){
        return 1;
    }
    if (a[0].toUpperCase()<b[0].toUpperCase()) {
        return -1;
    }
    return 0;
}

function sortByDate(a, b) {
    return (b[6].getTime()||0)-(a[6].getTime()||0);
}

module.exports = {
    sortTodo
};