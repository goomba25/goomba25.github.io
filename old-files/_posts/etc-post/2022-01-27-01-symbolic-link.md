---
title: "[Ubuntu] 심볼릭 링크 (윈도우의 바로가기)"
excerpt: "심볼릭 링크 생성 방법"

classes: wide

categories:
  - Etc
tags:
  - [Ubuntu]

last_modified_at: 2022-01-27
---

심볼릭 링크(`Symbolic Link`)는 링크를 연결하여 원본 파일을 직접 사용하는 방법입니다.

* 윈도우의 "바로가기"와 비슷한 개념입니다.

## 심볼릭 링크 생성하기

```bash
$ ln -s [ORIGIN] [SYMBOLIC-NAME]
```

* 원본 파일 또는 디렉터리(ORIGIN)를 심볼릭 링크와 연결합니다.
* 심볼릭 링크는 새롭게 생성되는 파일 또는 디렉터리로, 이미 존재하는 파일 또는 디렉터리가 될 수 없습니다.

## 심볼릭 링크 제거하기

```bash
$ rm [SYMBOLIC-NAME]
```

* 동일하게 `rm`을 사용하여 삭제합니다.
링크만 삭제되므로 원본 파일 또는 디렉터리는 그대로 존재합니다.