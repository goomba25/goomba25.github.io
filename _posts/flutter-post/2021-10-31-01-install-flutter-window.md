---
title: "[Flutter] Flutter 설치 - Window"
excerpt: "Window에서의 Flutter 설치"

categories:
  - Flutter
tags:
  - [Flutter, Window]

toc: true
toc_sticky: true

last_modified_at: 2021-10-31
---

> 사용한 PC의 운영체제는 `Window 10`이다.   
> [공식 사이트](https://flutter.dev/docs/get-started/install/windows)의 내용을 참조한다.

## Flutter SDK 설치

사이트를 방문하여 Window 용 SDK를 다운로드 합니다.

다운로드한 `.zip`파일의 압축을 원하는 경로에 풀어줍니다.   
(저는 `C:`에 배치했습니다.)

### 환경 변수 추가

해당 SDK에 대한 환경 변수를 추가해주는 과정입니다.

window 검색을 통해 <mark style="background-color: #3e3e3e; color: orange;">시스템 환경 변수 편집</mark>을 열어줍니다.

<img src="/images/flutter-image/window_system_setting.png" width="200" height="200">

위와 같은 창이 열리면 <mark style="background-color: #3e3e3e; color: orange;">환경 변수</mark>를 클릭합니다.

<img src="/images/flutter-image/window_system_setting2.png" width="200" height="200">

사용자 변수의 `PATH`를 더블 클릭, 또는 편집을 눌러줍니다.   
그리고 설치한 Flutter의 SDK 경로의 bin 폴더를 추가해줍니다.   
(ex. `C:\flutter\bin`)

## 에디터 선택

`Flutter`는 `Qt`와는 다르게 좀더 확장된 영역에서 사용이 가능하다.

* `Android Studio`
* `IntelliJ`
* `*vscode`
* `Emacs`

위의 에디터 이외에도 다른 에디터를 사용할 수 있다고 한다.

이번에는 `Android Studio`를 선택했다.   

* `Android Studio`의 `Flutter` 플러그인을 설치해주자.   
(자동으로 `Dart` 플러그인과 함께 설치된다.)