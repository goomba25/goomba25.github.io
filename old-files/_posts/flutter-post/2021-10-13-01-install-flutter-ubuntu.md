---
title: "[Flutter] Flutter 설치 - Ubuntu"
excerpt: "Ubuntu에서의 Flutter 설치"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter, Ubuntu]

toc: true
toc_sticky: true

last_modified_at: 2021-10-31
---

> 사용한 PC의 운영체제는 `Ubuntu 20.04`이다.   
> [공식 사이트](https://flutter.dev/docs/get-started/install/linux)의 내용을 참조한다.

## Flutter

`Flutter`는 `Qt`와 같은 크로스 플랫폼 프레임워크이다.

`Qt`에 비해 굉장히 짧은 역사를 가지며,   
구글에서 `JavaScript`를 대신할 목적으로 만든 `Dart` 언어를 사용한다.

업무 상 사용할지도 모른다는 이야기가 있어서 선행으로 학습해본다.

## 에디터 선택

`Flutter`는 `Qt`와는 다르게 좀더 확장된 영역에서 사용이 가능하다.

* `Android Studio`
* `IntelliJ`
* `*vscode`
* `Emacs`

위의 에디터 이외에도 다른 에디터를 사용할 수 있다고 한다.

본인은 에디터를 `vscode`를 선택했다.

* `vscode`에서 `Flutter` Extension을 설치해주자.   
(자동으로 `Dart` 플러그인과 함께 설치된다.)

## 설치 요구 사항

`Flutter`를 설치하기 위해 필요한 시스템 요구 사항은 아래와 같다.

* 운영 체제 : Linux (64-bit)
* 저장 공간 : 600MB (IDE/Tools 미 포함)
* 필요한 툴 : `bash`, `curl`, `file`, `git 2.x`, `mkdir`, ...

## SDK 설치 방법

`snap`을 사용할 수 있기 때문에 아래의 명령으로 설치했다.

```bash
sudo snap install flutter --classic
```

설치 이후 `Flutter SDK`의 설치 경로를 아래의 명령으로 알 수 있다.

```bash
flutter sdk-path
```

## snap을 사용할 수 없는 경우

공식 사이트에서 `stable`버전 압축 파일을 받아 설치할 수 있다.   
자세한 내용은 사이트를 참조하자.