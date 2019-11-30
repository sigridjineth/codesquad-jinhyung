const readlineSync = require('readline-sync');

var control = function() {
    console.log('신나는 야구시합\n' + '1. 데이터 입력\n' + '2. 데이터 출력\n' + '메뉴선택 (1 - 2)');
    input = readlineSync.prompt();
    if (input == 1) {
        inputData();
    } else if (input == 2) {
        printData();
    } else {
        console.log('새로운 숫자를 입력하세요.');
    };
};

const BaseballRule = {
    teamNum: 0,
    teamThreshold: 2,
    batterThreshold: 9,
    teaminfo: []
};

//Team 클래스의 생성
class Team {
    constructor(name) {
        this.name = name; //팀 이름의 설정
        this.batter = []; //타자 9명을 저장할 배열
        this.pitcher = []; //투수 1명을 저장할 배열
        this.batterNum = 0; //타자의 수를 0으로 초기화
    }
};

var inputData = function() {
    for (var i = 0; i < BaseballRule.teamThreshold; i++) {
        var num = i;
        inputTeamName(num);
        for (j = 0; j < BaseballRule.batterThreshold; j++) {
            inputBatter(num);
            BaseballRule.teaminfo[i].batterNum++;
        }
        BaseballRule.teamNum++;
    };
};


//데이터 입력부분, 아래 것을 팀 이름 입력으로 하자.
var inputTeamName = function(num) { // 들여쓰기 0단계
    var teamName = readlineSync.question(`${num+1}팀의 이름을 입력하세요.`);
    BaseballRule.teaminfo[num].name = teamName;
};

//BaseballRule.teaminfo.forEach(function(element, index) {
//    var teamName = readlineSync.question('이번 팀의 이름을 입력하세요.');
//    console.log(teamName);
//    BaseballRule.teaminfo[index].name = teamName;
//    console.log(BaseballRule.teaminfo[index]);
//});

//async-await-promise 패턴으로 시도해보았으나 실패.
//for await (const [v, i] of BaseballRule.teaminfo.entries()) {
//    var newName = await inputTeamName();
//    console.log(newName);
//BaseballRule.teaminfo.forEach(function(element, index) {
//    console.log(inputTeamName());
//})
//console.log('팀 데이터 입력이 완료되었습니다.');

var inputBatter = function(num) { //들여쓰기 0단계
    //타자 9명의 정보를 입력한다.
    var pitcherInfo = readlineSync.question(`${BaseballRule.teaminfo[num].batterNum+1} 번 타자 정보 입력: (예: crong, 0.499)`);
    var newInfo = pitcherInfo.split(", ");
    var name = newInfo[0];
    var rate = newInfo[1];

    const rateMin = 0.1;
    const rateMax = 0.5;

    if (rate > rateMin && rate < rateMax) {
        let player = { "name": name, "rate": rate };
        BaseballRule.teaminfo[num].batter.push(player);
    } else {
        console.log('다시 입력하세요.');
        inputBatter(num);
    };
};

//rl2.setPrompt(`${BaseballRule.batterNum +1} 번 타자 정보 입력: (예: crong, 0.499)`);
//rl2.prompt();
//rl2.on('line', function(input) { //들여쓰기 1단계
//    var newInput = input.split(", ");
//    var rateMin = 0.1;
//    var rateMax = 0.5;
//    name += input[0];

//    if (newInput[1] > rateMin && rateMax < newInput[1]) { //들여쓰기 2단계
//        rate += newInput[1]; //들여쓰기 3단계
//    } else {
//        console.log('타율을 잘못 입력하셨습니다.');
//        rl2.prompt();
//    }
//});
//var player = { "name": name, "rate": rate };
//return player;

//데이터 출력부분
var printData = function() {
    if (BaseballRule.teaminfo[0].name === undefined || BaseballRule.teaminfo[0].name.length === 0) {
        console.log('아무 정보도 없네요.');
        return;
    };
    for (let i = 0; i < BaseballRule.teaminfo.length; i++) {
        console.log(`${i+1}팀 ${BaseballRule.teaminfo[i].name}의 정보`);
        const print = BaseballRule.teaminfo[i].batter.map(function(cur, idx) {
            return console.log(`${idx+1}번 ${cur.name}, ${cur.rate}`);
        });
    };
};
//    const print = BaseballRule.teaminfo[i].batter.map(function(player, cur, idx, array) {
//        return player, cur, idx, array;
//console.log(`${idx+1}번 ${cur["name"]}, ${cur["rate"]}`);
//    });
//    console.log(print);

//하드코딩 하지 않는 방법을 고민하자.
var makeTeams = function() {
    var team1 = new Team();
    var team2 = new Team();
    BaseballRule.teaminfo.push(team1);
    BaseballRule.teaminfo.push(team2);
}

var main = function() {
    makeTeams();
    while (true) {
        control();
    };
}
main();