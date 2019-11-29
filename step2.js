//node.js 입력받기
const readline = require("readline");
const R = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//R.setPrompt('');
R.prompt();
R.on('line', function(input) {
    console.log('신나는 야구시합');
    console.log('1. 데이터 입력');
    console.log('2. 데이터 출력');
    console.log('메뉴선택 (1 - 2)');
    if (input === 1) {
        inputData();
    } else if (input === 2) {
        printData();
    } else {
        console.log('잘못된 숫자를 입력하셨습니다.');
        R.prompt();
    }
});

var inputData = function() {
    //1팀과 2팀의 9명의 타자와 한 명의 투수를 입력한다.
    //입력받은 데이터를 저장한다.
};

var printData = function() {
    //1팀과 2팀의 9명의 타자와 한 명의 투수 정보를 출력한다.
};