//node.js 입력받기
var control = function() {
    const readline = require("readline");
    const R = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('신나는 야구시합');
    console.log('1. 데이터 입력');
    console.log('2. 데이터 출력');
    console.log('메뉴선택 (1 - 2)');
    R.prompt();
    R.on('line', function(input) {
        if (input == 1) {
            inputData();
        } else if (input == 2) {
            console.log(printData());
        } else {
            console.log('잘못된 숫자를 입력하셨습니다.');
        }
        R.prompt();
    });
};

var BaseballRule = {
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
        this.pitcherNum = 0; //투수의 수를 0으로 초기화
    }
};

//데이터 입력부분
var inputData = function() { // 들여쓰기 0단계
    for (i = BaseballRule.teamNum; i < BaseballRule.teamThreshold; i++) { //들여쓰기 1단계
        BaseballRule.teaminfo[i].name = inputTeamName(); //팀 이름 지정
        BaseballRule.teamNum++;
        console.log('여기 도나요?')
        for (j = BaseballRule.batterNum; j < BaseballRule.batterThreshold; j++) {
            BaseballRule.teaminfo[i].batter.push(inputBatter());
            console.log('여기 도나요?')
        }
    };
    console.log('팀 데이터 입력이 완료되었습니다.');
    //1팀과 2팀의 9명의 타자와 한 명의 투수를 입력한다.
    //입력받은 데이터를 저장한다.
};

var inputTeamName = function() {
    //팀 이름을 입력한다.
    var name = "";
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt(`${BaseballRule.teamNum + 1}팀의 이름을 입력하세요.`);
    rl.prompt();
    rl.on('line', function(input) {
        name += input;
    })
    return name;
    //1팀 또는 2팀의 이름을 입력한다. 지금 입력하는 팀이 몇 팀인지는 input() 함수가 제어한다.
};

var inputBatter = function() { //들여쓰기 0단계
    //타자 9명의 정보를 입력한다.
    var name = "";
    var rate = "";
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt(`${BaseballRule.batterNum +1} 번 타자 정보 입력: (crong, 0.499)처럼 comma와 띄어쓰기로 분리해서 입력하세요.`);
    rl.prompt();

    rl.on('line', function(input) { //들여쓰기 1단계
        var newInput = input.split(", ");
        var rateMin = 0.1;
        var rateMax = 0.5;
        name += input[0];

        if (newInput[1] > rateMin && rateMax < newInput[1]) { //들여쓰기 2단계
            BaseballRule.batterNum++;
            rate += newInput[1]; //들여쓰기 3단계
        } else {
            console.log('타율을 잘못 입력하셨습니다.');
            rl.prompt();
        }
    })
    var player = { "name": name, "rate": rate };
    return player;
};

//데이터 출력부분
var printData = function() {
    //1팀과 2팀의 9명의 타자 정보를 출력한다.
    for (let i = 0; i < BaseballRule.teaminfo.length; i++) {
        console.log(`${BaseballRule.teaminfo[i].name} 정보`);
        const print = BaseballRule.teaminfo[i].batter.map(function(player, cur, idx) {
            console.log(`${idx+1}번 ${cur["name"]}, ${cur["rate"]}`);
        })
    };
};

var main = function() {
    //팀의 설정. 
    //이렇게 하드코딩 하고 싶지는 않았는데 동적으로 생성할 수 있게 하는 방법이 없을까?
    //가장 큰 문제는 변수 설정할 때, 각종 동적 접근이 안된다는 점에 있다. template literal이 안된다. eval()은 사용하지 말자고 한다.
    //리팩토링 시 참고해보자. https://www.rosettacode.org/wiki/Dynamic_variable_names#JavaScript
    var team1 = new Team(); // array number 0으로 접근
    var team2 = new Team(); // array number 1로 접근
    BaseballRule.teaminfo.push(team1);
    BaseballRule.teaminfo.push(team2);
    console.log(BaseballRule.teaminfo);
    control(); //팀의 정보를 입력한다.
}
main();
//최종적으로 모듈로 만들어서 객체를 게임을 실행하는 js 파일로 export한다.
//우선 기능을 구현하는 1차 시도에는 단일 파일로 만들고, 이후 리팩토링 단계에서 모듈 별로 출력하도록 한다.