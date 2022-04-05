---
title: "[Flutter] Bloc 패턴 맛보기"
excerpt: "Bloc에 대해 간단하게 알아보자"
classes: wide
toc: true
toc_sticky: true
categories:
  - Flutter
tags:
  - [Flutter]
last_modified_at: 2022-04-05
---

<mark style="background-color: #2e2e2e; color: orange;">Bloc</mark>패턴이란, Business Logic Component의 약자로   
UI와 로직을 분리하기 위한 **디자인 패턴**입니다.

* 따라서 다른 언어, 프레임워크에서도 이러한 패턴을 사용할 수 있습니다.

## Bloc 형태

쉽게 위젯(UI)이 Bloc을 구독한다고 합니다.

* Bloc입장에서 위젯을 Listener(리스너)라고 합니다.

Bloc의 상태가 변하면, 구독 중인 위젯(UI)이 Bloc의 변화를 적용시키는 형태입니다.

이러한 Bloc은 Stream을 사용하여 구현이 가능합니다.

### Stream

비동기 이벤트를 처리하기 위해 사용하는 클래스입니다.

* 물이 흐르는 파이프 형태를 떠올리면 됩니다.

* 위젯과 Bloc이 Stream을 통해 이어져 있다고 보면 됩니다.

## Bloc 구조

1. StreamController를 통해 Observable 객체를 생성.
2. Sink를 통해 이벤트 수용.
3. Stream을 통해 구독된 객체에게 변화 전달.

Sink는 "입구"라는 의미로 Bloc에서 이벤트를 받는 입구 역할입니다.   
Bloc은 Sink를 통해 이벤트를 받아 이벤트에 대해 로직을 처리하고, 변경된 상태를 Stream을 통해  위젯에게 전달하는 구조입니다.

## Bloc의 종류

### Single-subscription

Stream이 한 개의 Listener만 허용합니다.   
또한 Listener가 구독을 취소하면 재 구독이 불가능합니다.

### Broadcast

Single과 다르게 여러 Listener를 허용할 수 있으며, 언제든지 Listener를 연결/해제 할 수 있습니다.

## Bloc 간단하게 구현하기

Bloc을 직접 Stream을 통해 구현하는 일은 굉장히 복잡하고 어려운 일이라고 합니다.   
따라서 아주 간단하게 구현해봤습니다.

### 카운팅 앱

카운트를 저장하고, 카운트를 수정 및 구독 가능한 앱입니다.

카운트를 다른 화면에서도 사용이 가능한지 확인 할 수 있도록 3 페이지의 앱으로 만들었습니다.

1. 카운트를 저장하기 위한 BLoc 생성

  * Bloc의 주요 클래스인 Stream을 사용합니다. (Stream은 `dart:async`에 있습니다.)

  ```dart
  import 'dart:async';

  class CountBloc {
    int _count = 0;
    final StreamController<int> _countController =
    StreamController<int>.broadcast();

    Stream<int> get count => _countController.stream;
    int get currentCount => _count;

    add() {
      _count++;
      _countController.sink.add(_count);
    }

    subtract() {
      if (_count > 0) {
        
      }
    }
  }

  ```