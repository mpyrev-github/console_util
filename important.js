const { showTODO } = require('./showing');

function showImportantTODO(arrayOfValues) {
    let arrayOfTodoValuesImp = [], k = 0;
    for (let i = 0; i < arrayOfValues.length; i++) {
        if (arrayOfValues[i][4] === '!') {
            arrayOfTodoValuesImp[k] = arrayOfValues[i];
            k++;
        }
    }
    showTODO(arrayOfTodoValuesImp);
}

module.exports = {
    showImportantTODO
};
