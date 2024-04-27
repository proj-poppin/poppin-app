# Poppin-App

취향에 맞는 팝업을 PIN!, 팝핀(POPPIN)의 프론트엔드 Repository 입니다.

## Github Branch

### 1. 개발을 시작할 때
1. 개발을 시작할 때는 `Issue`를 생성합니다.
2. 이후 Issue에서 Origin Repository의 Dev Branch에서 새로운 Branch를 생성합니다
    - 이때 브랜치 이름은 다음을 따릅니다.
    - **새로운 기능 개발 : feature/#[Issue의 번호]**
    - **기능 리팩토링 : refactor/#[Issue의 번호]**
    - **버그 픽스 : bug/#[Issue의 번호]**
3. Loacl에서 Fetch를 통해 만든 New Branch(feature or fix or refactor)을 들고옵니다.
4. 해당 Branch로 checkout 이후 기능 개발을 진행합니다.

### 2. 개발을 종료할 때
1. 해당 Issue를 언급하며 PR을 보냅니다.
   - 이때 PR Title은 다음을 따릅니다
   - **새로운 기능 개발 : ✨Feature - 변경사항(#해당 PR번호)** ex)✨Feature - FCM 연동 완료(#해당 PR번호)
   - **기능 리팩토링 : 🎨Refactor - 변경사항(#해당 PR번호)** ex)🎨Refactor - 폴더 이름 변경 및 연동 테스트 완료(#해당 PR번호)
   -  **버그 픽스 : ❗Bug - 변경사항(#해당 PR번호)** ex)❗Bug - 폴더 이름 변경 및 연동 테스트 완료(#해당 PR번호)
2. 프론트엔드 팀원들의 `Code Review & approve` 이후 마지막으로 Approve한 사람은 ***Confirm Merge***를 합니다.


## 🎯Commit Convention

| 커밋 유형 | 설명 |
| --- | --- |
| Feat | 새로운 기능 추가 |
| Fix | 버그 수정 |
| Docs | 문서 수정 |
| Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| Refactor | 코드 리팩토링 |
| Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
| Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
| Design | CSS 등 사용자 UI 디자인 변경 |
| Comment | 필요한 주석 추가 및 변경 |
| Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
| Remove | 파일을 삭제하는 작업만 수행한 경우 |
| !BREAKING CHANGE | 커다란 API 변경의 경우 |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |


## PR Convention
| Icon | Code | Description |
| --- | --- | --- |
| 🧑🏻‍🎨 | :art | Improve code structure/formatting |
| ⚡️ | :zap | Performance improvement |
| 🔥 | :fire | Delete code/files |
| 🐛 | :bug | Fix bugs |
| 🚑 | :ambulance | Urgent fixes |
| ✨ | :sparkles | Introduce new features |
| 💄 | :lipstick | Add/modify UI/style files |
| ⏪ | :rewind | Revert changes |
| 🔀 | :twisted_rightwards_arrows | Merge branches |
| 💡 | :bulb | Add/modify comments |
| 🗃 | :card_file_box | Database-related changes |
