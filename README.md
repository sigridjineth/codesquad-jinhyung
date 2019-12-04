# 코드스쿼드 마스터즈 2020 온라인 과제 저장소

박진형 지원자의 마스터즈 과제 저장소입니다.

사용 언어: 자바스크립트(node.js)

의존 모듈: node.js에서 사용자의 동기적 입력을 받기 위한 [readline-sync](https://www.npmjs.com/package/readline-sync) v0.4.1.0

## 회고
* 그 동안 100줄 내외의 코드만 작성해보았는데, 500줄 가까이 되는 코드를 작성한 것은 이번이 난생 처음이었다.
* 그래서 View와 Business Logic을 분리하면서 작성했어야 하는데, 이를 제대로 고려하지 않았다.
* 이 때문에 2단계 및 3단계를 구현하기 위해 중도에 1단계의 코드를 리팩토링하는 등 시간을 추가로 투자하여야 했다. 리팩토링 시에는 skeleton code를 작성해보고자 노력했다.
* 모듈화를 시도했으나 const 변수로만 불러와져서, 객체를 수정할 수 없다는 난관에 부딪혔다. 따라서 단일 파일로 작성한 것이 아쉽다.
* 2단계에서 동기식 입력을 받기 위해 async/await 패턴 및 promise 등을 시도하였으나 정상작동에는 실패하였다. 따라서 readline-sync라는 별도의 npm 모듈을 활용하였다. 이 점이 무척 아쉽고 추후 개선 사항이다.
* 다행히 주말이 있었지만, 평일이 있어 작업시간을 확보하기 쉽지 않았다. 퇴근 후 저녁/새벽 시간을 활용하여 하루에 약 7-8시간은 작업하고자 노력하였다. 시간 배분을 잘 한 것 같아 다행이다.
* 최대한 하드코딩을 피하고자 노력했다. 이 점은 잘 이루어진 것 같아 다행이다.
* 별 거 아닌 오류 하나에 많은 시간을 보낸 것이 화가 나면서도, 코딩이 참 어렵지만서도 몰입하면 아주 재밌구나라는 점을 느끼게 되었다.

## 작업 파일
[STEP-1 브랜치](https://github.com/jypthemiracle/codesquad-jinhyung/tree/step-1): 1단계 구현

[STEP-2 브랜치](https://github.com/jypthemiracle/codesquad-jinhyung/tree/step-2): 2단계 구현

[STEP-3 브랜치](https://github.com/jypthemiracle/codesquad-jinhyung/tree/step-3): 3단계 구현

## 진행사항 대시보드
### 3단계 구현 완료

#### 1단계 11/29 구현 완료, 12/1 리팩토링

**[V]** [클린 코딩] 함수를 사용했다.

**[V]** 스트라이크/볼/안타/아웃이 랜덤하게 출력된다.

**[V]** 누적된 스트라이크(S), 볼(B), 아웃(O) 점수가 제대로 출력된다.

**[V]** 스트라이크 3회 누적 시 아웃 1회로 점수가 제대로 변환 및 적용된다.

**[V]** 볼 4회 누적 시 안타 1회로 점수가 제대로 변환 및 적용된다.

**[V]** 안타 또는 아웃 시에 안타, 아웃 점수는 유지되고 스트라이크와 볼 점수는 초기화된다.

**[V]** 안타 또는 아웃 시에 다음 타자 입장 메세지가 잘 출력된다.

**[V]** 3 아웃 시 누적된 안타수가 바르게 출력된다.

**[V]** 3 아웃 시 게임이 종료된다.

#### 2단계 12/3 구현 완료

**[V]** [클린 코딩] 모든 함수의 크기가 15줄 이하이다.

**[V]** [클린 코딩] 모든 코드의 들여쓰기는 최대 3단계로 구현했다.

**[V]** 1, 2, 3번 메뉴가 출력되고 메뉴를 선택할 수 있다.

**[V]** 두 야구팀의 팀 이름과 각 팀당 9명의 선수 데이터(이름, 타율)를 입력받을 수 있고, 저장된다.

**[V]** 1번 데이터 입력 또는 메뉴 선택 시, 올바르지 않은 값이 입력될 때 적절한 에러 처리가 된다.

**[V]** 입력한 팀 데이터 출력 기능(2번 메뉴)이 제대로 동작한다.

**[V]** 회초에는 팀1, 회말에는 팀2의 공격이 출력된다.

**[V]** 1S 0B 1O와 같이 공격당 경기 진행 상황이 바르게 출력된다.

**[V]** 아웃이 3번 발생한 경우 다음팀 공격으로 넘어간다.

**[V]** 회말 공격이 끝나면 다음 회로 넘어간다.

**[V]** 1번 선수부터 차례로 타격 수행이 출력되고 9번 선수 이후에는 다시 1번 타자가 출력된다.

**[V]** 안타/스트라이크/볼/아웃이 문제에 제시된 확률대로 출력된다.

**[V]** 매회에서 4번 안타를 칠 때 점수가 1점 올라가고 이후부터 1안타당 점수가 1점씩 올라간다.

**[V]** 입력받은 두 팀으로 6회까지 시합을 진행할 수 있고, 경기가 끝나면 경기 결과를 출력할 수 있다.

#### 3단계 12/4 현재 진행 중

**[V]** [클린 코딩] 모든 함수의 크기가 15줄 이하이다.

**[V]** [클린 코딩] 모든 코드의 들여쓰기는 최대 3단계로 구현했다.

**[V]** 시합 시작 이후 각 타석의 상태가 값이 올바른지 상관없이 전광판의 형태로 화면에 출력은 된다.

**[V]** 매번 전광판에 두 팀의 이름, 회초/회말 점수, 전체 누적 점수가 제대로 표시된다.

**[V]** 매번 전광판에 두 팀의 이름과 선수 번호, 선수 이름이 제대로 표시된다.

**[V]** 매번 전광판에 현재 회초 또는 회말 타자의 SBO 카운트가 제대로 표시된다.

**[V]** 매번 전광판에 두 팀의 투구 수, 삼진 수, 안타 수가 제대로 표시된다.

**[V]** 사용자의 입력(엔터)을 받고 다음 투구와 전광판이 나타난다.

**[V]** 사용자의 입력(숫자+엔터)을 받고 입력된 회말까지 스킵된다.

**[V]** 사용자 입력 시 올바르지 않은 값(문자 등)이 입력될 때 적절한 에러 처리가 된다.

**[V]** 6회말 시작 시 팀2가 승리하고 있다면 바로 경기가 종료된다.

**[V]** 전광판과 함께 2단계 기능들(타자 교체 및 출력, 스트라이크/볼/안타/아웃 확률 출력, 1S 0B 2O와 같이 공격당 경기 진행 상황 출력)이 자연스럽게 동작한다.
