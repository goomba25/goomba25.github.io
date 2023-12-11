---
title: "[Window] Git - tree 사용하기"
excerpt: "Window의 Git에서 tree를 설치해서 사용해보자."

categories:
  - Etc
tags:
  - [Window, Ubuntu]

toc: true
toc_sticky: true

last_modified_at: 2022-07-02
---

Ubuntu에서 `tree`를 사용하는 것은 굉장히 간단합니다.

```bash
$ sudo apt install tree
```

하지만 Window의 Git으로는 tree 설치가 이러한 커맨드로는 어렵습니다.

따라서 아래와 같은 방법으로 진행해줍니다.

1. [Tree For Windows](http://gnuwin32.sourceforge.net/packages/tree.htm)

    해당 사이트에 들어가서 바이너리 파일을 다운로드합니다.
    ![image](/images/etc-image/window_tree_binary.PNG)

2. 다운로드 받은 Zip 파일의 압축을 풀고 `/bin/tree.exe` 파일을 자신의 `Program Files\Git\usr\bin\` 디렉토리에 넣어줍니다.

---

이러한 과정을 거치고 나면 Git에서 `tree`를 사용할 수 있게 됩니다.

```bash
$ tree -L 1 -F

...
```