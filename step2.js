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
        determineResult();
        return false;
    } else {
        console.log('새로운 숫자를 입력하세요.');
    };
}; //15줄

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
    batterNum: 1, //지금 타자가 몇 번째인가?
    score: 0,
    scorelimit: true
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
    console.log(`${BaseballRule.teaminfo[play.gameStatus.roundRotate].name} VS ${BaseballRule.teaminfo[play.gameStatus.roundRotate+1].name}의 시합을 시작합니다.`);
    while (play.gameStatus.round < play.gameRule.roundThreshold) {
        var nowTeam = BaseballRule.teaminfo[play.gameStatus.roundRotate];
        play.gameStatus.round++;
        console.log(`${play.gameStatus.round}회 ${play.gameRule.roundRotate[play.gameStatus.roundRotate]} ${nowTeam.name} 공격`);
        play.playRound(nowTeam);
        if (play.gameStatus.roundRotate === 0) {
            play.gameStatus.roundRotate++;
        };
        if (play.gameStatus.roundRotate === 1) {
            play.gameStatus.round++;
            play.gameStatus.roundRotate = 0;
        };
    };
}; //15줄

//라운드 하나를 플레이하는 것.
play.playRound = function(nowTeam) {
    //여기 for문 쓰면 안된다. 누적되어야 한다.
    while (this.gameStatus.out < this.gameRule.outThreshold) {
        var nowPlayerh = nowTeam.batter[i]["rate"];
        var randomResult = this.playerModule(nowPlayerh);
        this.playerResult(randomResult); //게임을 실행한다.
        this.scoring(); //스코어를 추가한다.
        console.log(`${this.gameStatus.batterNum}번 ${nowTeam.batter[i].name}\n` + `${randomResult}!\n` + `${this.gameStatus.strike}S, ${this.gameStatus.ball}B, ${this.gameStatus.out}O`);
    };
    this.gameStatus.scorelimit = false;
    //for (let i = 0; i < BaseballRule.batterThreshold; i++) {
    //    var nowPlayerh = nowTeam.batter[i]["rate"];
    //    var randomResult = this.playerModule(nowPlayerh);
    //    this.playerResult(randomResult); //게임을 실행한다.
    //    console.log(`${this.gameStatus.batterNum}번 ${nowTeam.batter[i].name}\n` + `${randomResult}!\n` + `${this.gameStatus.strike}S, ${this.gameStatus.ball}B, ${this.gameStatus.out}O`);
    //};
    //nowTeam.score += this.gameStatus.score;
    //this.gameStatus.score = 0;
};

play.scoring = function() {
    if (this.gameStatus.hit === this.gameRule.hitThreshold) {
        BaseballRule.teaminfo[play.gameStatus.roundRotate].score++;
        this.gameStatus.scorelimit = false;
        this.gameStatus.hit = 0;
        return;
    };
    if (this.gameStatus.scorelimit = false) {
        BaseballRule.teaminfo[play.gameStatus.roundRotate].score += this.gameStatus.hitafter;
        this.gameStatus.hitafter = 0;
    };
    return;
    //매 회에서 네 번의 누적된 안타는 1 득점으로 이어지며, 이후부터는 1안타당 추가로 1득점이 발생한다.
};

play.playerModule = function(nowPlayerh) {
    var playerRate = this.getPlayerRate(nowPlayerh);
    var randomResult = this.getRandom(playerRate);
    return randomResult;
}

play.getPlayerRate = function(h) {
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
    return weights[lastIndex]["name"];
};

play.playerResult = function(result) {
    if (this.checkBall(result) || (this.checkStrike(result))) {
        if (this.determine()) {
            this.print(result);
            return baseball.newPlayer();
        }
        return this.print(result);
    };
    if (baseball.checkOut(result) || baseball.checkHit(result)) {
        this.gameStatus.ball = 0;
        this.gameStatus.strike = 0;
        return baseball.newPlayer();
    };
};

play.checkBall = function(result) {
    if (result === "볼") { //볼인 경우입니다.
        this.gameStatus.ball++;
        return true;
    };
    return false;
};

play.checkStrike = function(result) {
    if (result === "스트라이크") { //스트라이크인 경우입니다.
        //console.log(`if문 안의 checkStrike입니다. ${randomNumber}`);
        this.gameStatus.strike++;
        return true;
    };
    return false;
};

play.determine = function() {
    if (this.gameStatus.ball == this.gameRule.ballThreshold) {
        this.gameStatus.hit += 1;
        this.gameStatus.ball = 0;
        console.log('4볼이므로 1 안타로 진출합니다.');
        return true;
    };
    if (this.gameStatus.strike == this.gameRule.strikeThreshold) {
        this.gameStatus.out++;
        console.log('3 스트라이크이므로 아웃입니다.');
        this.gameStatus.strike = 0;
        return true;
    };
    return false;
};

play.checkOut = function(result) {
    if (result === "아웃") { //아웃이 된 경우입니다.
        this.gameStatus.out++;
        baseball.print(result);
        return true;
    };
    return false;
};

play.checkHit = function(result) {
    if (result === "안타") { //안타를 친 경우입니다.
        this.gameStatus.hit++;
        baseball.print(result);
        return true;
    };
    return false;
};

play.newPlayer = function() {
    if (this.gameStatus.out != this.gameRule.outThreshold) {
        this.gameStatus.batterNum++;
        return this.message();
    };
};

play.message = function() {
    //var player = BaseballRule.teaminfo
    return console.log(`${this.gameStatus.batterNum} 번째 타자가 타석에 입장했습니다.`);
};

play.print = function(result) {
    return console.log(`${this.gameStatus.batterNum}번 선수, ${result}!\n` + `${this.gameStatus.strike}S, ${this.gameStatus.ball}B, ${this.gameStatus.out}O`);
};

var determineResult = function() {
    var team1 = BaseballRule.teaminfo[play.gameStatus.roundRotate - 1];
    var team2 = BaseballRule.teaminfo[play.gameStatus.roundRotate];
    console.log(`경기 종료!\n` + `${team1} VS ${team2}\n`);
    //console.log(`${team1.score} : ${team2.score}`);
    return console.log(`Thank You!`);
};

//하드코딩 하지 않는 방법을 고민하자.
var makeTeams = function() {
    var team1 = new Team();
    var team2 = new Team();
    BaseballRule.teaminfo.push(team1);
    BaseballRule.teaminfo.push(team2);
};

var main = function() {
    makeTeams();
    while (true) {
        control();
    };
};
main();