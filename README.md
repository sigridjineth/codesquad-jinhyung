## 코드스쿼드 마스터즈코스 2020 2단계 구현사항 설명

![step2_skeleton](/Users/jypsnewmac/Desktop/step2_skeleton.png)

- baseballRule 객체에는 야구의 기본적인 규칙(팀의 제한은 2팀, 타자의 제한은 9명)과 함께 팀 정보를 배열 형태로 저장합니다.
- play 객체는 야구 게임 진행을 위한 제약 상수를 지정합니다. gameStatus는 현재 몇 회인지, 총 몇 개의 볼과 스트라이크 등이 오갔는지를 저장합니다. gameRule은 게임의 기본적인 제약사항에 대해 저장합니다(총 6회이며, 하나의 회에는 초와 말이 있으며, 3스트라이크면 1아웃이다 등)
- team 클래스는 하나의 팀을 만들기 위해 팀의 이름, 타자, 투수, 타자의 수, 그리고 점수를 상정합니다.
- main 함수에서 프로그램이 시작됩니다.
  - makeTeams 함수를 통해 클래스를 통해 팀을 지정합니다. 이렇게 만든 팀은 baseballRule 객체에 배열로 넣습니다.
  - play.gameStatus.cont는 게임을 계속 진행해도 되는지 판단하는 트리거입니다. 이 트리거는 determineResult 함수에서 게임의 승자가 정해지면 false로 전환됩니다. true일 때 control 함수를 계속 호출합니다.
- control 함수는 사용자의 입력을 받고, 입력에 따라 상황에 맞는 함수를 선언합니다.
- inputData 함수는 팀과 타자의 데이터를 입력받는 함수입니다.
  - 팀을 이미 입력해서 teamNum이 2가 되었을 경우 false를 리턴합니다.
  - for문을 2까지 돌리면서 num이라는 index 역할을 하는 변수를 얻고, 이를 활용하여 for문을 다시 돌리면서 9명의 타자를 받습니다. 타자가 모두 입력되면 teamNum을 1 증가하여 하나의 팀이 입력되었음을 알립니다.
  - inputTeamName은 팀의 이름을 받는 역할을 합니다. inputBatter는 "이름, 타율" 형태로 받아 최솟값과 최댓값의 제한에 맞는 지 확인한 후 이를 객체 형태로 반환하여 Baseball.teaminfo에 대입합니다.
- printData 함수는 데이터를 최종적으로 출력하는 함수입니다.
  - inputData 함수에서 데이터를 입력한 것이 없다면 return합니다.
  - teaminfo의 길이(2) 만큼 for문을 돌려 팀 정보를 출력하고, teaminfo의 batter 배열에 map 함수를 돌려서 각각의 타자 정보를 출력합니다.
- playGame 함수는 게임을 진행하는 함수입니다.
  - inputData 함수에서 데이터를 입력한 것이 없다면 return합니다.
  - 현재 라운드(play.gameStatus.round)가 라운드 제한(6, play.gameRule.roundThreshold)에 만나기 전까지 playRound 함수를 실행합니다. 이 때 nowTeam이라는 현재 팀의 이름을 매개변수로 전달합니다.
  - 현재 라운드가 라운드 제한보다 커지는 경우 determineResult 함수를 실행해서 최종 승자를 가려냅니다.
- play.playRound 메소드는 라운드 하나를 진행하는 함수입니다.
  - 3아웃이 되기 까지 라운드를 진행합니다. 즉, while문으로 현재 아웃 수(this.gameStatus.out)이 아웃의 제한(this.gameRule.outThreshold)보다 같아지기 전까지 updateResult를 실행합니다.
  - updateResult에는 playerResult라고 하는, 확률에 따라 계산된 해당 타구의 결과를 매개변수로 전달합니다.
  - 위의 과정이 모두 마무리되면 라운드를 리셋하고 업데이트합니다(updateRound, resetRound 메소드)
- play.updateResult 메소드는 타구 하나를 진행하는 함수입니다.
  - playRound에서 넘어온 타구의 결과를 바탕으로, 해당 결과를 판정합니다.
  - checkBall 메소드를 통해 볼임이 확인되면, 볼의 횟수(this.gameStatus.ball)을 1 증가시키고 fourBall인지 확인합니다. fourBall이면 1안타를 추가하고 초기화합니다.
  - checkStrike 메소드를 통해 스트라이크임이 확인되면, 스트라이크 횟수를 1 증가시키고 3스트라이크 아웃인지 확인해봅니다. 3스트라이크면 1아웃을 추가하고 초기화하고, 새로운 플레이어를 호출합니다(newPlayer)
  - checkOut 메소드를 통해 아웃임이 확인되면, 새로운 플레이어를 호출합니다.
  - checkHit 메소드를 통해 안타임이 확인되면, 점수를 추가하고(this.scoring 메소드) 새로운 플레이어를 호출합니다.
- determineResult 함수를 통해 누가 게임에서 이겼는지 스코어를 비교하여 결정합니다.
