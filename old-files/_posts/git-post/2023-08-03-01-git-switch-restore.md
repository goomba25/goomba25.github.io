---
title: "[Git] git switch, restore"
excerpt: ""
classes: wide

categories:
  - Git
tags:
  - [Git, GitHub]

last_modified_at: 2023-08-03
---

Git의 언제부터인가 `checkout`의 기능을 대신하는 `switch`와 `restore`가 도입되었다.   
기존의 `checkout`은 **Branch**를 생성하거나 이동하는 작업하던 공간을 복원하는 기능을 사용할 수 있다.   
(다른 기능도 있음)

이러한 기능을 `switch`(생성/이동)와 `restore`(복원)로 명확하게 나누어졌다.

## switch

사용법은 기존의 `checkout`을 사용하여 Branch를 생성/이동 한다.

```bash
$ git switch branch1
```

* branch1로 전환한다.

## restore

이 또한 `checkout`으로 복원하는 방법 그대로 사용한다.

```bash
$ git restore test.txt
```

* 해당 파일을 이전 상태로 복원한다.

```bash
$ git restore --staged test.txt
```

* `add`된 파일(test.txt)을 취소한다.