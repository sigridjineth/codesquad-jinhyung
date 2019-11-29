//1단계 간단 야구게임 구현하기
var baseball = {
    strikeThreshold: 3, //3번 스트라이크면 아웃이다.
    ballThreshold: 4, //4번 볼이면 1안타가 된다.
    outThreshold: 3, //3번 아웃이면 게임 끝난다.
};

//새로운 플레이어의 설정
baseball.player = {
    batterNum: 1, //타자 횟수는 누적값입니다.
    ball: 0, //볼은 초기화 대상입니다.
    strike: 0, //스트라이크는 초기화 대상입니다.
    hit: 0, //안타는 누적값입니다.
    out: 0 //아웃은 누적값입니다. 3이 넘어가면 main 함수에서 게임 진행을 종료합니다.
};

//타석 입장 메시지
baseball.message = function() {
    console.log(`${this.player.batterNum} 번째 타자가 타석에 입장했습니다.`);
};

//실제로 게임을 플레이 해봅니다.
baseball.gamePlay = function() {
    var result = ["볼", "스트라이크", "아웃", "안타"] //경우의 수는 4가지이다.
    var randomNumber = Math.floor(Math.random() * result.length);
    var thisResult = result[randomNumber];
    //볼이 4번이면, 볼 횟수를 초기화하고 1안타로 간주합니다.
    if (this.player.ball == baseball.ballThreshold) {
        this.player.hit += 1;
        this.player.ball = 0;
    };
    //스트라이크 3번이면, 스트라이크 횟수를 초기화하고 1아웃으로 간주하고 새 플레이어를 호출합니다.
    if (this.player.strike == baseball.strikeThreshold) {
        this.player.out++;
        this.player.batterNum++;
        this.player.strike = 0;
    };
    //게임을 진행합니다.
    if (randomNumber === 0) { //볼인 경우입니다.
        this.player.ball++;
    }
    if (randomNumber === 1) { //스트라이크인 경우입니다.
        this.player.strike++;
    }
    if (randomNumber === 2) { //아웃이 된 경우입니다.
        this.player.ball = 0;
        this.player.strike = 0;
        this.player.out++;
        this.player.batterNum++;
    }
    if (randomNumber === 3) { //안타를 친 경우입니다.
        this.player.hit++;
        this.player.strike = 0;
        this.player.ball = 0;
    };
    console.log(baseball.print(result[randomNumber]));
};

//게임 진행상황을 출력하는 함수입니다.
baseball.print = function(result) {
    console.log(`${result}! ${baseball.player.strike}S, ${baseball.player.ball}B, ${baseball.player.out}O`);
};

//아웃 여부를 판단하여 게임 진행여부를 판단하는 main 함수를 출력합니다.
var main = function() {
    console.log('간단하지 않은 야구게임이 시작되었습니다.');
    while (baseball.player.out < baseball.outThreshold) { //3아웃까지는 계속 플레이 합니다.
        baseball.message();
        baseball.gamePlay();
    };
    if (baseball.player.out == baseball.outThreshold) { //3아웃이 넘어가면 게임을 종료합니다.
        console.log(`최종 안타수: ${baseball.player.hit}`);
        console.log(`게임 종료`);
    };
};
main();