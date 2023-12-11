---
title: "[Linux] 유용한 Terminal - Terminator"
excerpt: "기본 Terminal의 확장판 같은 Terminator를 써보자."
classes: wide
toc: true
toc_sticky: true
categories:
  - Etc
tags:
  - [Linux, Ubuntu]
last_modified_at: 2022-05-17
---

# Terminator

<mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>는 터미널 에뮬레이터로 JAVA로 만들어졌다고 합니다. (오픈 소스)

> 저는 Ubuntu에서 사용하지만 Mac 또는 Window, Linux 등에서 사용 가능하다고 합니다.

기본적으로 사용되는 Terminal은 하나의 창에 여러 탭(Tab)을 열어서 사용할 수는 있지만, 창을 분할하지 못해서 조금 불편합니다.   
<mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>는 이러한 방법을 제공하는 터미널 에뮬레이터입니다.

하나의 창에 여러 탭(Tab)을 열 수도 있고, 화면 분할도 가능합니다. (물론 이것 외에 다른 프로그램도 있습니다.)

## Terminator 설치

<mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>는 apt로 간단하게 설치할 수 있습니다.

```bash
$ sudo apt install terminator
```

* 설치가 완료되면 Ubuntu에서는 `Ctrl`+`Alt`+`T` 단축키로 Terminer이 아닌 <mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>가 실행됩니다.

## Terminator 단축키

<mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>의 단축키는 기본 Terminer과 같다고 보면 됩니다.

추가적으로 자주 쓰는 단축키는 아래와 같습니다.

* 수평 분할 : `Ctrl`+`Shift`+`O`
* 수직 분할 : `Ctrl`+`Shift`+`E`
* 화면 이동 : `Alt`+ 방향키
* 새 탭 열기 : `Ctrl`+`Shift`+`T`
* 탭 이동 : `Ctrl`+ `PgUp`/`PgDn`
* 현재 창 또는 탭 닫기 : `Ctrl`+ `D`

### Python 버전으로 Terminator 실행 안되는 문제

간혹 Python의 버전 변경 등의 문제로 <mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>가 실행되지 않는 경우가 발생합니다.

이때 해결 방법 중 하나입니다.

<mark style="background-color: #2e2e2e; color: orange;">Terminator</mark> 셔뱅(Shebang)의 변경으로 해결했습니다. (최상단의 주석)

* `/usr/bin/terminator` 파일 수정

기본적으로 아래와 같이 작성되어 있습니다.

```shell
#!/usr/bin/python
```

이 내용을 아래와 같이 변경합니다.

```shell
#!/usr/bin/python2
```

변경 후에 재부팅 또는 `source`로 적용하면 정상적으로 <mark style="background-color: #2e2e2e; color: orange;">Terminator</mark>가 실행됩니다.
