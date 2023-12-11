---
title: "[HTML] 웹개발의 기초이자 초석 - HTML이란"
excerpt: "웹의 뼈대, HTML에 대해서 알아보자."

classes: wide

categories:
  - HTML
tags:
  - [WEB, HTML]

last_modified_at: 2022-06-04
---

## HTML이란?

<mark style="background-color: #2e2e2e; color: orange;">HTML</mark>은 `HyperText Markup Language`의 약자로 웹페이지를 구성하기 위해 작성하는 가장 기초가 되는 언어입니다.

사실상 웹 페이지를 개발하기 위해 필수적으로 알아야하는 언어입니다.

* HTML 예시
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
  <script>
    ...
  </script>
  </html>
  ```

## 태그 사용 (TAG)

태그는 `<>`로 묶어서 사용합니다.

* 대부분 시작(`<>`)과 종료(`</>`) 태그 한 쌍으로 사용합니다.

* 종료 없이 시작만 사용하는 빈 태그도 존재합니다. (`<img>`, `<br>` 등)

태그의 구조는 다음과 같습니다.

`<태그 속성="속성값"> 내용 </태그>`

## HTML 구조

!DOCTYPE html : 문서의 버전을 표시하고, 문서의 가장 앞에 위치합니다.

html : HTML문서의 시작과 끝을 나타내는 태그이며 `lang="ko"`속성으로 해당 문서의 언어를 표시할 수 있습니다.

head : 화면에는 나타나지 않는 HTML의 정보를 정의합니다. `meta charset="UTF-8"`태그를 통해 인코딩을 표기할 수 있습니다.

body : 화면에 나타내기 위해 작성하는 실질적인 내용입니다.


## HTML 주석

다른 언어에서의 주석은 `// 내용`, `# 내용` 또는 `/* 내용 */` 등을 통해 주석처리를 하곤 합니다.   
HTML에서는 `<!-- 내용 -->` 을 사용하여 주석 처리를 합니다.

* 이는 웹화면에서는 보이지 않지만 "소스 보기"를 통해 볼 수 있다고 하니 조심해야 합니다.