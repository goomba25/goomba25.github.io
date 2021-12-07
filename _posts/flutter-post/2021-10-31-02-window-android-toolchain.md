---
title: "[Flutter] Android toolchain 문제"
excerpt: ""

classes: wide

categories:
  - Flutter
tags:
  - [Flutter, Window]

toc: true
toc_sticky: true

last_modified_at: 2021-10-31
---

> `Flutter`와 `Android Studio`가 설치되었다는 가정 하에 진행.

## cmdline-tools component is missing 문제

```shell
[!] Android toolchain - develop for Android devices ...
    X cmdline-tools component is missing
    ...
```

위와 같은 에러가 발생합니다.

이 문제의 해결은 맨 아래에서 해결합니다.

## Android licenses 문제

`flutter doctor` 수행 중 `Android toolchain`관련 문제가 발생합니다.

```shell
[!] Android toolchain - develop for Android devices ...
      ...
      Run `flutter doctor --android-licenses` ...
      ...
```

위와 비슷한 에러가 발생하는데,   
일부 문제의 경우 해당 명령을 입력하면 해결 가능합니다.

하지만 해당 내용을 입력하였을 때 아래와 같은 에러를 표시할 수 있습니다.

```shell
USER> flutter doctor --android-licenses

Android sdkmanager not found. Update to the latest Android SDK and ensure that
the cmdline-tools are installed to resolve this.
```

## 두 문제 해결

먼저 `Android Studio` 실행 후   
`Configure`의 <mark style="background-color: #3e3e3e; color: orange;">SDK Manager</mark>를 실행합니다.

그리고 `Android SDK`에 들어갑니다.

* 혹시 `Hide Obsolete Packages`가 체크되어 있다면 해제합니다.

* 리스트 중 `Android SDK Command-line Tools(latest)`를 체크하면   
첫번째 문제가 해결 됩니다.

* 리스트 중 `Android SDK Tools (Obsolete)`가 설치되어 있지 않다면,   
해당 목록을 체크 후 `OK`를 눌러 설치합니다.

그 후 `flutter doctor --android-licenses` 명령을 입력하면 여러 권한을 묻습니다.

계속 `y`를 눌러 진행하면   

```shell
All SDK package licenses accepted
```

위와 같이 완료가 됩니다.

`flutter doctor`를 입력하여 해당 문제들이 해결된 것을 확인 할 수 있습니다.

```bash
USER> flutter doctor

Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.x.x, on Microsoft Windows [Version 10.x.xx.xxx], locale ko-KR)
[√] Android toolchain - develop for Android devices (Android SDK version xx.x.x)
[√] Chrome - develop for the web
[√] Android Studio (version 2020.x)
[√] VS Code (version 1.xx.x)
[√] Connected device (x available)

• No issues found!
```