const readlineSync = require('readline-sync');

var control = function() {
    console.log('신나는 야구시합\n' + '1. 데이터 입력\n' + '2. 데이터 출력\n' + '메뉴선택 (1 - 2)');
    input = readlineSync.prompt();
    if (input == 1) {
        inputData();
    } else if (input == 2) {
        printData();
    } else if (input == 3) {
        playGame();
    } else {
        console.log('새로운 숫자를 입력하세요.');
    };
};

const BaseballRule = {
    teamNum: 0,
    teamThreshold: 2,
    batterThreshold: 9,
    teaminfo: [],
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

var inputBatter = function(num) {
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
}; //15줄

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

var play = {};

play.gameStatus = {
    batterNum: 1,
    ball: 0,
    strike: 0,
    hit: 0,
    out: 0
};

play.gameRule = {
    strikeThreshold: 3,
    ballThreshold: 4,
    outThreshold: 3
}

play.determineResult = function(h) {
    //플레이어 정보와 플레이어의 타율(h)을 받아와야 함
    let playerRate = getPlayerRate(h);
    let playResult = getRandom(playerRate);
    return playeResult;
};

var getPlayerRate = function(h) {
    const hitRate = h;
    const strikeRate = (1 - h) / 2 - 0.05;
    const ballRate = (1 - h) / 2 - 0.05;
    const outRate = 0.1;
    let playerRate = [{ name: "안타", rate: hitRate }, { name: "스트라이크", rate: strikeRate }, { name: "볼", rate: ballRate }, { name: "아웃", rate: outRate }];
    return playerRate;
};

play.getRandom = function(weights) {
    //var weights = [{name: "hit", rate: 0.1}, {name: "strike", rate: 0.4}, {name: "ball", rate: 0.4}, {name: "out", rate: 0.1}];
    var num = Math.random();
    var s = 0;
    lastIndex = weights.length - 1;
    for (var i = 0; i < lastIndex; ++i) {
        s += weights[i]["rate"];
        if (num < s) {
            return weights[i]["name"];
        }
    }
    return weights[lastIndex];
};

play.determineMiddle = function() {
    //볼이 4번이면, 볼 횟수를 초기화하고 1안타로 간주합니다.
    if (this.gameStatus.ball == this.gameRule.ballThreshold) {
        this.gameStatus.hit += 1;
        this.gameStatus.ball = 0;
    };
    //스트라이크 3번이면, 스트라이크 횟수를 초기화하고 1아웃으로 간주하고 새 플레이어를 호출합니다.
    if (this.gameStatus.strike == this.gameRule.strikeThreshold) {
        this.gameStatus.out++;
        this.gameStatus.batterNum++;
        this.gameStatus.strike = 0;
    };
    //게임을 진행합니다.
    if (randomNumber === 0) { //볼인 경우입니다.
        this.gameStatus.ball++;
    }
    if (randomNumber === 1) { //스트라이크인 경우입니다.
        this.gameStatus.strike++;
    }
    if (randomNumber === 2) { //아웃이 된 경우입니다.
        this.gameStatus.ball = 0;
        this.gameStatus.strike = 0;
        this.gameStatus.out++;
        this.gameStatus.batterNum++;
    }
    if (randomNumber === 3) { //안타를 친 경우입니다.
        this.gameStatus.hit++;
        this.gameStatus.strike = 0;
        this.gameStatus.ball = 0;
    };
}

var playGame = function() {
    var result = play.getRandom();
    //input your code here
};

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