### 코드스쿼드 마스터즈 2020 온라인 과제 1단계 구현내용 (리팩토링 이전의 내용입니다.)

* baseball이라는 객체(object)를 만들고, 게임 진행을 위한 기본사항을 적시했습니다. 하기 사항을 적시한 이유는 하드코딩을 하지 않고 최대한 변수로 넘겨주기 위함입니다.
  * `strikeThreshold` - 3번 스트라이크면 아웃입니다.
  * `ballThreshold` - 4번 볼이면 1안타가 됩니다.
  * `outThreshold` - 3번 아웃이면 게임이 끝납니다.
* baseball이라는 객체에 player 프로퍼티를 설정해줍니다. 초기화 과정이 일어나는 부분입니다.
  * `batterNum` = 타자 횟수는 1로 설정합니다. 이는 누적값으로, 아웃이 일어날 때마다 1씩 추가됩니다. 해당 기능구현은 `baseball.gamePlay`에서 이루어집니다.
  * `ball` = 볼 횟수는 0으로 설정합니다. 볼은 초기화 대상으로, 아웃이 일어날 때마다 0으로 바뀝니다. 해당 기능구현은 `baseball.gamePlay`에서 이루어집니다.
  * `strike` = 스트라이크 횟수는 0으로 설정합니다. 스트라이크는 초기화 대상으로, 아웃이 일어날 때마다 0으로 바뀝니다. 해당 기능 구현은 `baseball.gamePlay`에서 이루어집니다.
  * `hit` = 안타 횟수는 0으로 설정합니다. 이는 누적값으로, 안타가 일어날 때마다 1씩 추가됩니다. 해당 기능구현은 `baseball.gamePlay`에서 이루어집니다.
  * `out` = 아웃 횟수는 0으로 설정합니다. 이는 누적값으로, 아웃이 일어날 때마다 1씩 추가됩니다. 3아웃이 일어나면 게임이 종료됩니다. 해당 기능구현은 `baseball.gamePlay` 와 `main` 이 이루어냅니다.
* baseball.message는 현재 몇 번째 타자가 게임을 하고 있는 지 출력하는 메소드입니다.
  * `this.player.batterNum` 의 변수를 호출하고 출력합니다.
* baseball.gamePlay는 실제로 게임을 플레이하고, 결과를 만들어내는 메소드입니다.
  * `result` = 게임 결과가 담긴 경우의 수를 배열 형태로 담고 있습니다.
  * `randomNumber` = `Math.random()` 활용하여 랜덤값을 생성합니다. 범위는 `result` 길이입니다.
  * `thisResult` = `result` 에서 `randomNumber`가 해당 변수에 몇 번째 원소를 가리키고 있는지를 저장합니다.
  * 볼이 4번이면, 볼 횟수를 초기화하고 1안타로 간주합니다. 이 때 baseball 객체에서 선언한 ballThreshold 프로퍼티를 활용합니다.
  * 스트라이크가 3번이면, 스트라이크 횟수를 초기화하고 1아웃으로 간주한 후 `batterNum` 이라는 타자 횟수를 늘립니다. 이는 새 플레이어를 호출하는 것과 유사합니다.
  * if문을 활용하여 게임 결과에 따라 분기처리를 합니다.
  * `randomNumber`가 0이면 볼로 간주하고, `this.player.ball` 1 증가합니다.
  * `randomNumber`가 1이면 스트라이크로 간주하고, `this.player.strike` 1 증가합니다.
  * `randomNumber` 2이면, 아웃으로 간주합니다. 이 때 `this.player.ball`고과 `this.player.strike`는 0으로 각각 초기화합니다. 이후 `this.player.out` 의 수를 1 증가하여 아웃이 되었음을 명시하고, `this.player.batterNum` 1 증가하여 타자 횟수를 늘립니다. 이는 새 플레이러를 호출하는 것과 유사합니다.
  * `randomNumber`  3이면 안타로 간주하고, `this.player.hit` 을 1 증가합니다. 이 때 스트라이크와 볼은 초기화되어야 하므로 `this.player.strike` 와 `this.player.ball` 은 0으로 초기화합니다.
  * 상기한 모든 과정이 끝나면, baseball.print 라는 메소드를 호출하여 최종 결과를 출력합니다.
* baseball.print는 게임 진행상황을 출력하는 함수입니다.
  * ES6의 template literal을 활용하여 `result` , `baseball.player.strike` , `baseball.player.ball` , `baseball.player.out` 을 출력하도록 하였습니다.
* main 함수는 상기한 모든 메소드가 동작할 수 있도록 제어하는 기능을 하고 있습니다.
  * `baseball.player.out` 이 `baseball.outThreshold` 가 넘기 전까지 while문이 작동하여 `baseball.message` 와 `baseball.gamePlay` 가 이루어지도록 했습니다. 이는 3아웃이 되기 전까지 게임을 플레이하는 기능을 구현합니다.
  * `baseball.player.out` 이 `baseball.outThreshold` 와 동일해지면 '최종 안타수'와 '게임 종료'를 출력하고 전체 게임을 종료합니다.
