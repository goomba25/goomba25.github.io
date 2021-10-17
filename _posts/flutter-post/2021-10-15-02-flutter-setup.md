---
title: "[Flutter] Flutter 설정"
excerpt: "flutter를 사용하기 위한 기본적인 설정들"

categories:
  - Flutter
tags:
  - [Flutter]

toc: true
toc_sticky: true

last_modified_at: 2021-10-15
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
export PATH="$PATH:$Home/snap/flutter/common/flutter/bin"
```

## Linux Enable 허용

나는 데스크탑 어플리케이션도 개발할 예정이기 때문에   
아래와 같은 설정을 했다.

```bash
flutter config --enable-linux-desktop
```

* 위의 내용은 변경 사항이 있다면 언제든지 추가/삭제할 예정이다.