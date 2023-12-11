---
title: "[Flutter] Flutter 설정"
excerpt: "flutter를 사용하기 위한 기본적인 설정들"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter]

toc: true
toc_sticky: true

last_modified_at: 2021-10-22
---

> `Flutter`를 설치했다는 가정하에 진행.

## Flutter 진단

`Flutter`는 개발에 있어서 필요한 플랫폼이 설치되어 있는지   
진단해주는 명령어를 제공한다.

```bash
flutter doctor
```

여기서 필요한 개발 플랫폼이 설치가 되어있지 않거나,   
문제가 있다면 해결해주자.   
(본인이 필요 없는 플랫폼이라면 넘어가도 상관없다.)

## Path 설정

`.bashrc`에 `Flutter`의 경로를 넣어주자.

본인의 `Flutter`의 경로는 아래와 같았다.

```bash
PATH="$PATH:$Home/snap/flutter/common/flutter/bin"
```

`stable`버전을 설치했다면 아래와 같이 본인의 설치 경로를 넣어주자.

```bash
// example
PATH="$PATH:`pwd`/flutter/bin"
```

## 데스크탑 어플리케이션 설정

데스크탑 어플리케이션을 개발할 경우 아래와 같은 명령어로   
데스크탑 지원을 구성해야 한다.

|OS|Command|
|:--|:--|
|**Window**|flutter config \--enable-window-desktop|
|**macOS**|flutter config \--enable-macos-desktop|
|**Linux**|flutter config \--enable-linux-desktop|

### 데스크탑 off

모든 데스크탑 어플리케이션을 false로 변경하려는 경우 아래와 같이 구성합니다.

```bash
$ flutter config --no-enable-macos-desktop --no-enable-windows-desktop --no-enable-linux-desktop
```