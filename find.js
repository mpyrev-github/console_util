const { showTODO } = require('./showing');

function findTODObyUserName(arrayOfValues,name) {
    let arrayOfTodoValuesName = [], k = 0, regExpByName;
    regExpByName = new RegExp('\\b('+name+')', 'i');
    for (let i = 0; i < arrayOfValues.length; i++) {
        if (arrayOfValues[i][7].search(regExpByName) !== -1) {
            arrayOfTodoValuesName[k] = arrayOfValues[i];
            k++;
        }
    }
    showTODO(arrayOfTodoValuesName);
}

module.exports = {
    findTODObyUserName
};