let maxLength = [4,4,7,8]; // Минимальные размеры полей таблицы (без учета первой колонки), т.е. длина заголовков
let numbersOfRepeat = [];

function showTODO(arrayOfShow) {
    findMaxLength(arrayOfShow); // Узнаем максимальную ширину полей в колонках
    let headerVal = [['user','date','comment','fileName','!']];
    let contentOfTable, separateOfTable = [];
    let headerOfTable = makeContentToShow(headerVal); // Создаем заголовок отдельно
    contentOfTable=makeContentToShow(arrayOfShow); // Создаем контент для вывода в консоль
    separateOfTable [1] = '-'.repeat(maxLength.reduce((accumulator, currentValue)=> accumulator + currentValue)+25)+'\n'; // Завершающая линия
    if (arrayOfShow.length !== 0){ // В зависимости от наличия контента выбираем нужна ли нам разделительная полоса
        separateOfTable[0] = '-'.repeat(maxLength.reduce((accumulator, currentValue)=> accumulator + currentValue)+25)+"\n";
    }
    else{
        separateOfTable[0] = '';
    }
    console.log(headerOfTable+separateOfTable[0]+contentOfTable+separateOfTable[1]); // Выводим таблицу
    for (let i = 0; i < arrayOfShow.length; i++) { // Обрезаем ненужные пробелы для корректной обработки в дальнейшем
        for (let j = 0; j < maxLength.length; j++) {
            if (numbersOfRepeat[i][j] !== 0) {
            arrayOfShow[i][j] = arrayOfShow[i][j].slice(0, -numbersOfRepeat[i][j]);
            }
        }
    }
}

function findMaxLength(arr) {
    let edgeOfVal=[10,10,50,15]; // Максимальные размеры из ТЗ
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < maxLength.length; j++){
            if (arr[i][j].length > maxLength[j]){
                maxLength[j] = arr[i][j].length;
            }
            if (arr[i][j].length > edgeOfVal[j]){ // Обрезаем слишком длинные значения
                maxLength[j] = edgeOfVal[j];
                arr[i][j] = arr[i][j].slice(0,edgeOfVal[j]-3);
                arr[i][j] += '...';
            }
        }
    }
}

function makeContentToShow(arr){
    let contentOfTable = '';
    for (let i = 0; i < arr.length; i++){
        numbersOfRepeat[i] = [];
        for (let j = 0; j < maxLength.length; j++){ // "Добиваем" значения полей до максимального
            numbersOfRepeat[i][j] = maxLength[j]-arr[i][j].length;
            arr[i][j]=arr[i][j]+' '.repeat(numbersOfRepeat[i][j]);
        }
        contentOfTable+= '  ' + arr[i][4] + '  |  ' + arr[i][0] + '  |  ' + arr[i][1] + '  |  ' + arr[i][2] + '  |  ' + arr[i][3] + '  \n'; // Создаем образ вывода контента в консоль
    }
    return contentOfTable;
}

module.exports = {
    showTODO
};
