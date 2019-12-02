const readlineSync = require('readline-sync');

var control = function() {
    console.log('신나는 야구시합\n' + '1. 데이터 입력\n' + '2. 데이터 출력\n' + '3. 시합 시작\n' + '메뉴선택 (1 - 3)');
    input = readlineSync.prompt();
    if (input == 1) {
        inputData();
    } else if (input == 2) {
        printData();
    } else if (input == 3) {
        playGame();
    } else {
        console.log('숫자를 다시 입력하세요.');
    };
}; //14줄

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
        this.score = 0; //팀의 점수를 0으로 초기화
    }
};

var inputData = function() {
    if (BaseballRule.teamNum == 2) { //이미 한 번 입력했으면 돌아올 수 없음.
        console.log(`이미 팀을 입력하셨습니다.`);
        return false;
    }
    for (var i = 0; i < BaseballRule.teamThreshold; i++) {
        var num = i;
        inputTeamName(num);
        for (j = 0; j < BaseballRule.batterThreshold; j++) {
            inputBatter(num);
            BaseballRule.teaminfo[i].batterNum++;
        }
        BaseballRule.teamNum++;
    };
}; //15줄

//데이터 입력부분, 아래 것을 팀 이름 입력으로 하자.
var inputTeamName = function(num) { // 들여쓰기 0단계
    var teamName = readlineSync.question(`${num+1}팀의 이름을 입력하세요.`);
    BaseballRule.teaminfo[num].name = teamName;
};

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

//데이터 출력부분
var printData = function() {
    if (didntInput()) {
        return;
    };
    for (let i = 0; i < BaseballRule.teaminfo.length; i++) {
        console.log(`${i+1}팀 ${BaseballRule.teaminfo[i].name}의 정보\n`);
        const print = BaseballRule.teaminfo[i].batter.map(function(cur, idx) {
            return console.log(`${idx+1}번 ${cur.name}, ${cur.rate}\n`);
        });
    };
};

var didntInput = function() {
    if (BaseballRule.teaminfo[0].name === undefined || BaseballRule.teaminfo[0].name.length === 0) {
        console.log('아무 정보도 없네요.');
        return true;
    };
};

//여기부터는 play하는 부분입니다
var play = {};

play.gameStatus = {
    round: 0, //몇 회인지 알려줌
    roundRotate: 0, //회 중에서도 초(0, 1팀 공격)인지, 말(1, 2팀 공격)인지 알려줌
    ball: 0,
    strike: 0,
    hit: 0, //scorelimit이 존재할 때 안타를 기록함
    hitafter: 0, //scorelimit이 풀렸을 때 안타를 기록함
    out: 0,
    batterNum: 0, //지금 타자가 몇 번째인가?
    score: 0,
    scorelimit: true,
    cont: true
};

play.gameRule = {
    roundThreshold: 6,
    roundRotate: ['초', '말'],
    strikeThreshold: 3,
    hitThreshold: 4,
    ballThreshold: 4,
    outThreshold: 3
};

var playGame = function() {
    if (didntInput()) {
        return;
    }
    console.log(`${BaseballRule.teaminfo[play.gameStatus.roundRotate].name} VS ${BaseballRule.teaminfo[play.gameStatus.roundRotate+1].name}의 시합을 시작합니다.`);
    while (play.gameStatus.round < play.gameRule.roundThreshold) {
        var nowTeam = BaseballRule.teaminfo[play.gameStatus.roundRotate];
        console.log(`${play.gameStatus.round+1}회 ${play.gameRule.roundRotate[play.gameStatus.roundRotate]} ${nowTeam.name} 공격\n`);
        play.playRound(nowTeam);
    };
    determineResult();
}; //15줄

play.resetRound = function() {
    this.gameStatus.scorelimit = true;
    this.gameStatus.batterNum = 0;
    this.gameStatus.strike = 0;
    this.gameStatus.hit = 0;
    this.gameStatus.hitafter = 0;
    this.gameStatus.score = 0;
    this.gameStatus.out = 0;
};

play.updateRound = function() {
    if (this.gameStatus.roundRotate === 0) {
        this.gameStatus.roundRotate++;
    } else if (play.gameStatus.roundRotate === 1) {
        this.gameStatus.round++;
        this.gameStatus.roundRotate = 0;
    };
};

play.playRound = function(nowTeam) {
    this.message();
    while (this.gameStatus.out < this.gameRule.outThreshold) {
        var currentPlayer = (this.gameStatus.batterNum % BaseballRule.batterThreshold);
        var nowPlayerh = nowTeam.batter[currentPlayer]["rate"];
        var playerResult = this.playerModule(nowPlayerh);
        this.updateResult(playerResult, currentPlayer);
    };
    this.updateRound();
    this.resetRound();
};

play.scoring = function() {
    if (this.gameStatus.scorelimit === true && this.gameStatus.hit === this.gameRule.hitThreshold) {
        BaseballRule.teaminfo[play.gameStatus.roundRotate].score++;
        this.gameStatus.scorelimit = false;
        this.gameStatus.hit = 0;
        return console.log('4안타가 누적되어 득점 하였습니다!\n')
    };
    if (this.gameStatus.scorelimit === false && this.gameStatus.hitafter != 0) {
        BaseballRule.teaminfo[play.gameStatus.roundRotate].score += this.gameStatus.hitafter;
        this.gameStatus.hitafter = 0;
        return console.log('4안타 이후에 1안타씩 추가 득점 하였습니다!\n');
    };
    return false;
};

play.playerModule = function(nowPlayerh) {
    var playerRate = this.getPlayerRate(nowPlayerh);
    var playerResult = this.getRandom(playerRate);
    return playerResult;
};

play.getPlayerRate = function(h) {
    const hitRate = Number(h);
    const strikeRate = Number((1 - h) / 2 - 0.05);
    const ballRate = Number((1 - h) / 2 - 0.05);
    const outRate = Number(0.1);
    let playerRate = [{ name: "안타", rate: hitRate }, { name: "스트라이크", rate: strikeRate }, { name: "볼", rate: ballRate }, { name: "아웃", rate: outRate }];
    return playerRate;
};

play.getRandom = function(weights) {
    var num = Math.random();
    var s = 0;
    lastIndex = weights.length - 1;
    for (var i = 0; i < lastIndex; ++i) {
        s += weights[i]["rate"];
        if (num < s) {
            return weights[i]["name"];
        }
    }
    return weights[lastIndex]["name"];
};

play.updateResult = function(result, currentPlayer) {
    if (this.checkBall(result, currentPlayer)) {
        this.isfourBall(result, currentPlayer);
    } else if (this.checkStrike(result, currentPlayer)) {
        this.isthreeStrike(result, currentPlayer);
    } else if (this.checkOut(result, currentPlayer)) {
        this.print(result, currentPlayer);
        this.newPlayer();
    } else if (this.checkHit(result, currentPlayer)) {
        //this.print(result, currentPlayer);
        this.scoring(currentPlayer);
        this.newPlayer();
    };
}; //14줄

play.checkBall = function(result, currentPlayer) {
    if (result === "볼") { //볼인 경우입니다.
        this.gameStatus.ball++;
        return true;
    };
    return false;
};

play.checkStrike = function(result, currentPlayer) {
    if (result === "스트라이크") { //스트라이크인 경우입니다.
        this.gameStatus.strike++;
        return true;
    };
    return false;
};

play.isfourBall = function(result) {
    if (this.gameStatus.ball == this.gameRule.ballThreshold) {
        if (this.gameStatus.scorelimit = true) {
            this.withscoreLimit(result);
            this.gameStatus.ball = 0;
            this.newPlayer();
        } else if (this.gameStatus.scorelimit = false) {
            this.withoutscoreLimit(result);
            this.gameStatus.ball = 0;
        }
        this.scoring();
    };
    this.print(result);
}; //16줄 -- 바꿔야 함

play.withscoreLimit = function(result) {
    this.gameStatus.hit++;
    this.print(result);
};

play.withoutscoreLimit = function(result) {
    this.gameStatus.hitafter++;
    this.print(result);
};

play.isthreeStrike = function(result, currentPlayer) {
    if (this.gameStatus.strike == this.gameRule.strikeThreshold) {
        this.gameStatus.out++;
        this.print(result);
        console.log('3 스트라이크이므로 아웃입니다.\n');
        this.newPlayer();
        return true;
    };
    this.print(result);
    return false;
};

play.checkOut = function(result, currentPlayer) {
    if (result === "아웃") { //아웃이 된 경우입니다.
        this.gameStatus.out++;
        return true;
    };
    return false;
};

play.checkHit = function(result) {
    if (result === "안타") { //안타를 친 경우입니다.
        if (this.gameStatus.scorelimit == true) {
            play.withscoreLimit(result);
            //this.gameStatus.hit++;
        } else if (this.gameStatus.scorelimit == false) {
            play.withoutscoreLimit(result);
            //this.gameStatus.hitafter++;
        };
        return true;
    };
    return false;
};

play.newPlayer = function() {
    if (this.gameStatus.out != this.gameRule.outThreshold) {
        this.gameStatus.batterNum++; //타자 번호를 높이자.
        this.gameStatus.ball = 0; //새로운 타자를 위해 초기화하자.
        this.gameStatus.strike = 0; //새로운 타자를 위해 초기화하자.
        return this.message();
    };
};

play.message = function() {
    var nowTeam = BaseballRule.teaminfo[play.gameStatus.roundRotate];
    var currentPlayer = (this.gameStatus.batterNum % BaseballRule.batterThreshold);
    var nowPlayern = nowTeam.batter[currentPlayer]["name"];
    return console.log(`${currentPlayer+1} 번째 ${nowPlayern} 타자가 타석에 입장했습니다.\n`);
};

play.print = function(result) {
    var currentPlayer = (this.gameStatus.batterNum % BaseballRule.batterThreshold);
    return console.log(`${currentPlayer+1}번 선수, ${result}!\n` + `${this.gameStatus.strike}S, ${this.gameStatus.ball}B, ${this.gameStatus.out}O\n`);
};

var determineResult = function() {
    var team1 = BaseballRule.teaminfo[play.gameStatus.roundRotate];
    var team2 = BaseballRule.teaminfo[play.gameStatus.roundRotate + 1];
    console.log(`경기 종료!\n` + `${team1.name} VS ${team2.name}\n` + `${team1.score} : ${team2.score}\n`);
    if (team1.score > team2.score) {
        console.log(`${team1.name}이 승리!`);
    } else if (team1.score < team2.score) {
        console.log(`${team2.name}이 승리!`);
    } else {
        console.log(`양 팀은 무승부!`)
    }
    play.gameStatus.cont = false;
    return console.log(`Thank You!`);
}; //14줄

//하드코딩 하지 않는 방법을 고민하자.
var makeTeams = function() {
    var team1 = new Team();
    var team2 = new Team();
    BaseballRule.teaminfo.push(team1);
    BaseballRule.teaminfo.push(team2);
};

var main = function() {
    makeTeams();
    while (play.gameStatus.cont === true) {
        control();
    };
    console.log(`프로그램 종료`);
};
main();