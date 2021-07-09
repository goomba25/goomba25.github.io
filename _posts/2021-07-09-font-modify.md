---
title: "[GitHub 블로그] 폰트 변경하기"
excerpt: "웹 폰트로 블로그의 폰트를 변경해보자"

categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-06
---

> minimal-mistakes 테마를 사용한다는 전제하에 작성했다.

## 1. 웹 폰트의 @import 찾아 추가하기

먼저 원하는 웹 폰트를 찾아보자.

예를 들어 [Google](https://fonts.google.com/?subset=korean) 같은 곳에서 찾을 수 있다.

거기서 해당 폰트를 클릭하고 select this style을 클릭하면 아래와 같은 @import 를 볼 수 있다.

![image](/images/Screenshot_font.png)

style 태그 안의 주소를 복사하여 /assets/css/main.scss 에 추가해주자.

## 2. 폰트 적용하기

/_sass/minimal-mistakes/_variables.scss 파일에서 아래와 같은 부분을 찾아보자.

```scss
/* system typefaces */
$serif: Georgia, Times, serif !default;
$sans-serif: -apple-system, BlinkMacSystemFont, "Noto Sans KR", "Roboto", "Segoe UI",
   "Helvetica Neue", "Lucida Grande", Arial, sans-serif !default;
$monospace: Monaco, Consolas, "Lucida Console", monospace !default;
```

맨 앞의 -apple-system, BlinkMacSystemFont 는 Mac 의 시스템 폰트라고 한다.

여기에 다운로드 받은 폰트의 이름을 추가해주자.

```scss
$serif: Georgia, Times, serif !default;
$sans-serif: -apple-system, BlinkMacSystemFont, "Nanum Pen Script", "Roboto", "Segoe UI",
   "Helvetica Neue", "Lucida Grande", Arial, sans-serif !default;
$monospace: Monaco, Consolas, "Lucida Console", monospace !default;
```

수정한 뒤에 push 해주면 해당 글꼴이 적용된 것을 확인할 수 있다.