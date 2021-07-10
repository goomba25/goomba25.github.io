---
title: "[C++] 산술 연산자"
excerpt: "C++ 의 기본 산술 연산자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자]

toc: true
toc_sticky: true

last_modified_at: 2021-07-10
---

사칙 연산을 다루는 기본적인 연산자이다.

두 개의 대상을 가지는 이항 연산자이며, 결합 방향은 왼쪽에서 오른쪽이다.

|산술|설명|
|:--:|:--|
|+|왼쪽 대상에 오른쪽 대상을 더한다.|
|-|왼쪽 대상에 오른쪽 대상을 뺀다.|
|*|왼쪽 대상에 오른쪽 대상을 곱한다.|
|/|왼쪽 대상에 오른쪽 대상을 나눈 몫을 반환한다.|
|%|왼쪽 대상에 오른쪽 대상을 나눈 나머지를 반환한다.|

산술 연산자의 우선 순위 및 결합 방향은 cppreference 를 참조하자.

[cppreference](https://ko.cppreference.com/w/cpp/language/operator_precedence)

또한 괄호를 통해 우선 순위를 변경해 줄 수 있다.