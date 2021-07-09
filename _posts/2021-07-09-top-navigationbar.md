---
title: "[GitHub 블로그] 상단 메뉴바 변경하기"
excerpt: "상단의 네비게이션 목록을 바꿔보자"

categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-09
---

상단 네비게이션 목록을 바꿔보자.

아무것도 건들지 않은 상태에서는 Quick Start ... 이라고 되어있다.

자신이 원하는 페이지 목록으로 변경할 수 있다.

> minimal-mistakes 테마를 사용한다는 전제하에 작성했다.

## _data/navigation.yml 수정하기

해당 파일의 내부를 보면 아래와 같다.

```yml
# main links
main:
  - title: "Quick-Start Guide"
    url: https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/
  # - title: "About"
  #   url: https://mmistakes.github.io/minimal-mistakes/about/
```

따라서 목록이 Quick-Start .. 만 존재하는 것이다.

예를 들어 카테고리 목록을 추가해보자.

```yml
  - title: "Category"
    url: /categories/
```

이처럼 목록 이름과 url 경로를 입력해주면 된다.