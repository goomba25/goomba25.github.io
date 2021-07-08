---
title: "[GitHub 블로그] 사이드 여백 줄이기"
excerpt: "_variables.scss의 Grid를 수정해서 좌우 여백 줄이기."

categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-07
---

생각보다 좌우 여백이 넓은 편이라고 생각되어 줄이는 방법을 찾았다.   

_variables.scss 에 좌우 여백을 늘이거나 줄일 수 있는 스크립트가 있다.   
여백 사이즈를 수정해보자.

> minimal-mistakes 테마를 사용한다는 전제하에 작성했다.

<br/>

## /_sass/minimal-mistakes/_variables.scss 수정

해당 파일의 Grid 주석을 찾아보자. 아래와 같이 적혀있다.

```scss
/*
   Grid
   ========================================================================== */
$right-sidebar-width-narrow: 200px !default;
$right-sidebar-width: 300px !default;
$right-sidebar-width-wide: 400px !default;
```

이 부분을 아래와 같이 바꿔주었다.

```scss
/*
   Grid
   ========================================================================== */
$right-sidebar-width-narrow: 150px !default;
$right-sidebar-width: 200px !default;
$right-sidebar-width-wide: 250px !default;

// $right-sidebar-width-narrow: 200px !default;
// $right-sidebar-width: 300px !default;
// $right-sidebar-width-wide: 400px !default;
```


right-sidebar 라고 해서 오른쪽만 바뀌는 것은 아니다.   
원래 있던 값이 필요할 수도 있으니 주석처리했다.