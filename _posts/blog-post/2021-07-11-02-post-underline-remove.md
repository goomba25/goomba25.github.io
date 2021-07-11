---
title: "[GitHub 블로그] 게시글 밑줄 제거하기"
excerpt: "게시글의 밑줄을 제거해보자."

categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-11
---

페이지에서 게시글을 보면 밑줄이 있다.

이 밑줄을 제거해보자.

## /_sass/minimal-mistakes/_base.scss 를 수정하자.

해당 파일을 열면 해당 파일의 /* link */ 라고 되어있는 주석을 찾아보자.

해당 주석 아래의 내용은 이러하다.

```scss
/* links */

a {
  &:focus {
    @extend %tab-focus;
  }
...
```

이 곳에 아래와 같이 `text-decoration: none;` 을 추가한다.

```scss
/* links */

a {
  text-decoration: none;

  &:focus {
    @extend %tab-focus;
  }
...
```

이렇게 하면 게시글의 밑줄이 사라진 것을 볼 수 있다.