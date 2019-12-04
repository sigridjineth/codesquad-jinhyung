## 코드스쿼드 마스터즈코스 2020 온라인 테스트 3단계 구현사항 설명

### 개요

3단계의 코드 구현은 2단계를 바탕으로 진행하였습니다. 따라서 3단계에 추가된 부분인 다음에 대해서만 작성합니다.

* 사용자의 입력에 따른 스킵
* 6회 말 시작 이전에 2팀이 승리하고 있을 경우, 경기를 진행하지 않고 바로 경기를 종료시킴
* 전광판에 경기 진행정보를 각 투구마다 업데이트하고 이를 표시함

### 스킵 부분

![step3_skeleton_skip](https://github.com/jypthemiracle/codesquad-jinhyung/blob/step-3/step3_skeleton_skip.png)

저는 스킵을 **'동일한 작업을 시행하지만, 콘솔에 출력하지 않는다'** 라고 정의했습니다. 따라서 스킵하는 부분은 출력하지 않는 부분을 지정하는 것과 동일하게 설계하였습니다.

#### 사용자의 입력에 따른 스킵 구현

1. 사용자의 입력에 따른 스킵을 달성하기 위해서 다음의 트리거를 `play` 객체에 지정했습니다.

* `play.gameStatus.skip` : 몇 라운드까지 스킵하느냐에 대한 정보를 담고 있습니다.
  * 해당 트리거는 하나의 라운드를 조작하는 `play.playRound` 메소드 내부의 while문에서 활용됩니다.
* `play.gameStatus.print` : 현재 라운드(현재 상황)에서 출력의 여부 속성을 다루고 있습니다.
  * `true` 면 해당 라운드는 출력합니다. `false` 면 해당 라운드에서 출력하지 않습니다.

2. 위의 메소드는 `play.printSkip` 메소드를 포함하여 선수의 타구 및 라운드 진행정보를 출력하는 모든 곳에서 `play.printSkip`에 의해 출력 여부를 제어하는 데 사용합니다. 
   * 예를 들어 `play.printSkip` 함수의 경우 `play.printSkip` 이 `true` 를 리턴하느냐, 또는 `false` 를 리턴하느냐에 따라 출력 여부를 결정합니다.
   * 이 때 `play.printSkip` 은 `play.gameStatus.skip` 이 `true` 이면 `false` 를 리턴합니다. 반대의 경우도 마찬가지로 작동합니다.
3. `doprintSkip`의 경우 라운드 전체를 총괄하는 `play.playRound` 메소드에서 해당 라운드의 출력 여부를 결정합니다.
   * `play.gameStatus.skip` 이 `undefined` 라면, 아직 사용자가 스킵을 입력하지 않은 것으로 이해합니다. 이 때 `doprintSkip` 은 `inputSkip` 메소드를 호출하여 사용자의 입력을 받습니다.
   * 특정 회차의 초회에서 동일한 회차의 말회로 이동하고 싶은 경우가 있을 것입니다. 예를 들어서 6회 초인데 6회 말의 종료를 보기 위해서 6을 입력하는 경우가 있을 것입니다. 이 때 `play.gameStatus.skip` 은 `undefined` 로 유지하되, 회초와 회말을 조절하는 `play.gameStatus.roundRotate`의 값을 1로 변경합니다. 참고로 `play.gameStatus.roundRotate`가 `0`이면 회초이고, `1`이면 회말입니다. `play.gameStatus.print`는 `true`로 유지하여 회말을 출력할 수 있도록 합니다.
   * 스킵하려는 라운드가 현재 라운드보다 더 작으면, `play.gameStatus.skip` 이 `true`인 것과 `play.gameStatus.print` 가 `false` 임을 유지하고 리턴합니다.
4. `doprintSkip` 의 경우 라운드를 스킵하고자 하는 사용자의 입력을 받고 이를 처리합니다.
   * 엔터키의 입력은 `input.length`가 `0`인 것으로 알아차리도록 합니다. 이 때 `print`는 `true`로 하여 리턴함으로써 다음 타구를 출력합니다.
   * 정수가 입력되고 그 정수의 값이 한 자리 수인 경우가 일반적으로 생각하는 경우 중 하나입니다. 예를 들어 5회 말 이후의 타구를 보기 위하여 `5` 를 입력하는 경우를 생각해볼 수 있습니다. 이 때 `decideSkipAmount` 메소드에 `input` 을 전달하여 얼마 만큼의 라운드를 스킵하면 되는 지 결정합니다.
   * 위의 두 가지 경우의 수에서 해당 사항이 없으면 에러 처리를 하고, 다시 사용자 입력을 받도록 기다립니다.
5. `decideSkipAmount` 의 경우 `input` 이 현재 상황에 맞는 사용자 입력인지 검증하는 역할을 합니다.
   * 6라운드보다 `input`이 크면 에러처리 합니다.
   * `input`이 6이면 6회 초까지 스킵하도록 `skip = input` 으로 동일처리 합니다. 이는 계속 스킵하도록 만들어 `play.gameStatus.print`가 `false` 임을 유지하여, 스킵하는 라운드와 진행하는 라운드가 같아질 때까지 계속 출력되지 않도록 합니다.
   * 게임의 라운드가 `input - 1` 보다 작으면 `play.gameStatus.skip` 은 `input` 값으로 하고, `play.gameStatus.print` 는 `false` 처리하여 해당 라운드에서 만나기 전까지 계속 출력되지 않도록 합니다. 위의 경우와 분리해준 이유는 `play.gameRule.roundThreshold` 가 6으로 지정되어 있는데, 실제로 라운드 별로 비교할 때는 5의 `index` 를 가지기 때문에 오류를 방지하고자 의도적으로 분기한 것입니다.

#### 회말에 따른 스킵 구현

* `lastRoundSkip` 은 6회 초에서 말로 공수가 전환될 때, 팀 2가 팀 1에 이기고 있을 때 굳이 경기를 진행할 필요가 없으므로 의도적으로 스킵하는 기능을 구현하는 메소드입니다.
* `play.gameStatus.round` 라는 현재 라운드를 표시하는 프로퍼티가 `play.gameRule.Threshold - 1` 이라는, 즉 6라운드에 해당하는 5의 `index` 와 같으면서 `play.gameStatus.roundRotate` 가 1이라서 회말로 넘어가고자 할 때 두 팀 간의 점수를 고려하여 한 쪽이 이기고 있을 때 6회 말을 진행하지 않고 바로 리턴합니다.

### 전광판 부분

![step3_skeleton_dashboard](https://github.com/jypthemiracle/codesquad-jinhyung/blob/step-3/step3_skeleton_dashboard.png)

* 전광판의 경우 팀의 이름과 각 팀의 회초/회말의 점수, 전체 누적 점수와 각 팀의 선수번호와 그 이름, 현재 회초/회말 타자의 SBO(스트라이크, 볼, 아웃) 여부와 각 팀의 누적 투구 수, 삼진 수, 안타 수를 출력해야 합니다.
* 각 팀의 회초와 회말 점수를 구현하기 위해 `team` 클래스에 `this.scoreperround` 라는 프로퍼티를 정의하여 각 회차별로 점수를 저장할 수 있도록 하였습니다. 총 6회 간의 스코어를 배열의 원소 형태 6개로 만들어 0으로 초기화하였습니다. 여기서의 한계는 하드코딩을 피하고자 했던 이번 과제의 개인적인 목표에 어긋나는 지점이었다는 것입니다. 이 점은 추후 개선이 필요한 사항입니다.
* `play.scoringPrint` 에 따라 `play.scoring` 메소드가 작업한 득점 추가내용이 출력될 때, `play.scoringperRound` 라는 메소드가 함께 실행되어 각 라운드 별로 원소가 추가되도록 하였습니다.
* `updateDashboard` 함수는 S, B, O를 출력하는 역할을 담당합니다. ES6의 template literal을 이용하여 `console.log` 에서 함수를 호출할 수 있었습니다. `this.gameStatus` 에 저장된 변수를 바탕으로 `X` 문자를 변수의 크기만큼 출력합니다.
* `displayBatterOne/Two` 메소드는 현재 타자가 누구인지를 전광판에 `V` 문자로 출력하는 역할을 담당합니다. ES6의 template literal을 이용하여 `console.log` 에서 함수를 호출할 수 있었습니다. `currentPlayer` 라는 변수는 현재 타자의 번호를 일컫는데, 이는 현재 타자의 횟수(`play.gameStatus.batterNum`) 에서 타자가 9명임을 활용하여 나머지로 나눔으로써 얻는 번호입니다. (참조 - 6회 제한이 아니라 9회 제한입니다. 그림에 오타가 있습니다. 이는 `play.gameRule.batterThreshold`) 에서 참조된 것입니다.)
  * 회차가 초반이라 `play.gameStatus.roundRotate`의 값이 `0`이면 `displayBatterOne` 함수를 호출하고, 그 값이 `1`이면 `displayBatterTwo` 함수를 호출합니다. 이후 인덱스 값을 대비하여 현재 타자의 번호를 찾아 해당 타자에 `V` 를 리턴하고, 해당하지 않을 경우 비어있는 문자열을 리턴합니다.
  * 이 함수의 경우에도 `displayBatter` 라는 하나의 단일 함수가 아니라 `displayBatterOne/Two` 라는 함수 두 개로 나눈 것이 하드코딩의 연장선상이라 볼 수 있어, 개선의 대상이라고 생각합니다.