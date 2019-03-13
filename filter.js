const { showTODO } = require('./showing');

function filterTODObyDate(arrayOfValues,date) {
    let filtredByDateArr;
    if (date.search(/\d||-/g)!==-1){
        this.date = new Date(date);
        filtredByDateArr = arrayOfValues.filter(function(val){ if (val[6]>this.date) {
            return true;
        }
        else { return false}});
        showTODO(filtredByDateArr);
    }
    else {
        console.log('wrong command');
    }
}

module.exports = {
    filterTODObyDate,
};