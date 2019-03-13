const { readLine } = require('./console');
const { makeTODOarr } = require('./parsing');
const { showTODO } = require('./showing');
const { sortTodo } = require('./sorting');
const { findTODObyUserName } = require('./find');
const { filterTODObyDate } = require('./filter');
const { showImportantTODO } = require('./important');

let arrayOfValues;

arrayOfValues = makeTODOarr(); // Создаем массив распарсенных комментариев
app();

function app () {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function processCommand (command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            showTODO(arrayOfValues);
            break;
        case 'important':
            showImportantTODO(arrayOfValues);
            break;
        default:
            checkCommand(command); // Остальные команды требуют ввода аргументов
            break;
    }
}

function checkCommand(command) {
    const splittedCommand = command.split(' ');
    while (splittedCommand[2]!==undefined){
        splittedCommand[1] += " "+splittedCommand[2]; // В случае составных параметров записываем их в один элемент массива
        splittedCommand.splice(2,1);
    }
    switch (splittedCommand[0]) {
        case 'user':
            findTODObyUserName(arrayOfValues,splittedCommand[1]);
            break;
        case 'date':
            filterTODObyDate(arrayOfValues,splittedCommand[1]);
            break;
        case 'sort':
            sortTodo(arrayOfValues,splittedCommand[1]);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!