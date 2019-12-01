//1단계 간단 야구게임 구현하기
var baseball = {
    result: ["볼", "스트라이크", "아웃", "안타"], //경우의 수는 4가지이다.
    strikeThreshold: 3, //3번 스트라이크면 아웃이다.
    ballThreshold: 4, //4번 볼이면 1안타가 된다.
    outThreshold: 3, //3번 아웃이면 게임 끝난다.
};

//새로운 플레이어의 설정
baseball.player = {
    batterNum: 1, //타자 횟수는 누적값입니다.
    batterNotice: false,
    ball: 0, //볼은 초기화 대상입니다.
    strike: 0, //스트라이크는 초기화 대상입니다.
    hit: 0, //안타는 누적값입니다.
    out: 0 //아웃은 누적값입니다. 3이 넘어가면 main 함수에서 게임 진행을 종료합니다.
};

//타석 입장 새로운 선수 추가
baseball.newPlayer = function() {
    if (baseball.player.out != baseball.outThreshold) {
        this.player.batterNum++;
        return baseball.message();
    };
};

baseball.message = function() {
    return console.log(`${this.player.batterNum} 번째 타자가 타석에 입장했습니다.`);
};

baseball.determine = function() {
    if (this.player.ball == baseball.ballThreshold) {
        this.player.hit += 1;
        this.player.ball = 0;
        console.log('4볼이므로 1 안타로 진출합니다.');
        return true;
    };
    if (this.player.strike == baseball.strikeThreshold) {
        this.player.out++;
        console.log('3 스트라이크이므로 아웃입니다.');
        this.player.strike = 0;
        return true;
    };
    return false;
};

baseball.checkBall = function(randomNumber) {
    //console.log(`if문 밖의 checkBall입니다. ${randomNumber}`);
    if (randomNumber === 0) { //볼인 경우입니다.
        //console.log(`if문 안의 checkBall입니다. ${randomNumber}`);
        this.player.ball++;
        return true;
    };
    return false;
};

baseball.checkStrike = function(randomNumber) {
    //console.log(`if문 밖의 checkStrike입니다. ${randomNumber}`);
    if (randomNumber === 1) { //스트라이크인 경우입니다.
        //console.log(`if문 안의 checkStrike입니다. ${randomNumber}`);
        this.player.strike++;
        return true;
    };
    return false;
};

baseball.checkOut = function(randomNumber) {
    //console.log(`if문 밖의 checkOut입니다. ${randomNumber}`);
    if (randomNumber === 2) { //아웃이 된 경우입니다.
        //console.log(`if문 안의 checkOut입니다. ${randomNumber}`);
        this.player.out++;
        baseball.print(randomNumber);
        return true;
    };
    return false;
};

baseball.checkHit = function(randomNumber) {
    //console.log(`if문 밖의 checkHit입니다. ${randomNumber}`);
    if (randomNumber === 3) { //안타를 친 경우입니다.
        //console.log(`if문 안의 checkHit입니다. ${randomNumber}`);
        this.player.hit++;
        baseball.print(randomNumber);
        return true;
    };
    return false;
};
//실제로 게임을 플레이 해봅니다.
baseball.gamePlay = function(randomNumber) {
    //console.log(`if문 밖의 gamePlay입니다. ${randomNumber}`);
    if (baseball.checkBall(randomNumber) || (baseball.checkStrike(randomNumber))) {
        if (baseball.determine()) {
            baseball.print(randomNumber);
            return baseball.newPlayer();
        }
        return baseball.print(randomNumber);
    };
    if (baseball.checkOut(randomNumber) || baseball.checkHit(randomNumber)) {
        this.player.ball = 0;
        this.player.strike = 0;
        return baseball.newPlayer();
    };
};



//    baseball.checkBall(randomNumber);
//    baseball.checkStrike(randomNumber);

//    if (baseball.determine() === false) {
//        console.log(`if문 안의 gamePlay입니다. ${randomNumber}`);
//        if (baseball.checkOut(randomNumber) === true || baseball.checkHit(randomNumber) === true) {
//            baseball.print(randomNumber);
//            baseball.newPlayer();
//            return;
//        }
//    };
//    return baseball.print(randomNumber);
//};

//게임 진행상황을 출력하는 함수입니다.
baseball.print = function(randomNumber) {
    return console.log(`${this.player.batterNum}번 선수, ${this.result[randomNumber]}!\n` + `${this.player.strike}S, ${this.player.ball}B, ${this.player.out}O`);
};

//아웃 여부를 판단하여 게임 진행여부를 판단하는 main 함수를 출력합니다.
var main = function() {
    console.log('간단하지 않은 야구게임이 시작되었습니다.');
    baseball.message();
    while (baseball.player.out < baseball.outThreshold) {
        var randomNumber = Math.floor(Math.random() * baseball.result.length);
        //console.log(`${randomNumber} main 함수의 randomNumber가 생성되었습니다.`)
        baseball.gamePlay(randomNumber);
    };
    if (baseball.player.out == baseball.outThreshold) { //3아웃이 넘어가면 게임을 종료합니다.
        console.log(`최종 안타수: ${baseball.player.hit}`);
        console.log(`게임 종료`);
    };
};
main();