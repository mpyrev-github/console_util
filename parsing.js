const { getAllFilePathsWithExtension, readFile, getFileName } = require('./fileSystem');
const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');

function getFiles () {
    return filePaths.map(path => readFile(path));
}

function parsingFiles() {
    const content = getFiles();
    let splittedContent = content.map(content => content.split('\n'));// Разделяем всю полученную информацию на строки (looks like a code)
    let splittedTodoContent = [];
    for (let i = 0; i < splittedContent.length; i++) {
        splittedTodoContent[i] = [];
        let a = 0;
        for (let j = 0; j < splittedContent[i].length; j++) {
            if (splittedContent[i][j].search(/\/\/(()|\s+)todo/i) !== -1) { // Находим строки только с T O D O
                splittedTodoContent[i][a] = sliceIt(splittedContent[i][j], /\/\//); // Оставляем только комментарии с T O D O
                if (splittedTodoContent[i][a].search(/\/\/(()|[ \t]+)todo\s+\S/i)===-1){ // Проверяем на T O D O без значений
                    splittedTodoContent[i][a]+=';';
                }
                a++;
            }
        }
    }
    return splittedTodoContent;
}
// todo
function makeTODOarr() {
    const filenames = getFileName(filePaths);
    let splittedTodoContent = parsingFiles(), arrayOfTodoValues = [];
    let x = 0;
    for (let i = 0; i < splittedTodoContent.length; i++){
        for (let j = 0; j < splittedTodoContent[i].length; j++) {   // Убираем слово T O D O, пробелы до слов, символы {}:, разделяем строку на имя, дату и комментарий
            arrayOfTodoValues[x] = sliceIt(splittedTodoContent[i][j],/todo/i,4).match(/[^\s":"].*/)[0].replace(/[{}]/g,'').split(';');
            if (arrayOfTodoValues[x][0] === undefined){ // Обработка пустых T O D O
                arrayOfTodoValues[x][0] = '';
                arrayOfTodoValues[x][1] = '';
                arrayOfTodoValues[x][2] = '';
            }
            else {
                if (arrayOfTodoValues[x][1] === undefined){ // Обработка комментариев с одим полем
                    arrayOfTodoValues[x][2] = arrayOfTodoValues[x][0];
                    arrayOfTodoValues[x][1] = '';
                    arrayOfTodoValues[x][0] = '';
                }
                else {
                    if (arrayOfTodoValues[x][1].search(/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/)===-1){ // Проверка даты на валидность
                        if (arrayOfTodoValues[x][2] === undefined){ // Обработка пустых комментариев
                            arrayOfTodoValues[x][2]='';
                            arrayOfTodoValues[x][2] = arrayOfTodoValues[x][1];
                        }
                        else{
                            if (arrayOfTodoValues[x][1].search(/()||(\s+)/)===-1){ // Обработка пустых дат
                                arrayOfTodoValues[x][2] = arrayOfTodoValues[x][1]+';'+arrayOfTodoValues[x][2];
                            }
                        }
                    }
                }
            }
            arrayOfTodoValues[x][1] = sliceIt(arrayOfTodoValues[x][1],/[\d-]+/, 0, 11); // Обрезаем дату от лишних пробелов (и/или символов)
            arrayOfTodoValues[x][6] = new Date(arrayOfTodoValues[x][1]); // Добавляем поле для сортировки и фильтрации по дате
            arrayOfTodoValues[x][2] = sliceIt(arrayOfTodoValues[x][2],/\S/); // Убираем начальные пробелы перед комментариями
            arrayOfTodoValues[x][3] = filenames[i]; // Добавляем поле для отображения имени файла в котором был найден комментарий
            if (arrayOfTodoValues[x][2].search(/\!/)!==-1){ // Обработка важности коммантария
                arrayOfTodoValues[x][5] = (arrayOfTodoValues[x][2].match(/\!/g)).length;
                arrayOfTodoValues[x][4] = '!';
            }
            else{
                arrayOfTodoValues[x][4] = ' ';
                arrayOfTodoValues[x][5] = 0;
            }
            arrayOfTodoValues[x][7] = arrayOfTodoValues[x][0]; // Данное поле является альтернативным именем для поиска (если имя длинное и обрезалось)
            x++;
        }
    }
    return arrayOfTodoValues;
}

function sliceIt(str,to,shift = 0,end = str.length) { // Функция отрезает всё ненужное :)
    if (str.search(/[\w\u0430-\u044F\u0401\u0451\d\-\!\?\.\,]/i) !== -1){
        let index = str.match(to).index; // Находим выражение и узнаем его положение в строке
        return str.slice(index + shift, end);// Убираем всё что было до выражения с необходимым сдвигом
    }
    else {
        return str;
    }
}

module.exports = {
    makeTODOarr
};