---
title: "[CSS] CSS의 선택자 (기본, 복합)"
excerpt: "선택자(Selector)에 대해 알아보자"

toc: true
toc_sticky: true

categories:
  - HTML
tags:
  - [WEB, CSS]

last_modified_at: 2023-12-09
---

<mark style="background-color: #2e2e2e; color: orange;">CSS</mark>

# 선택자 종류

CSS에서 사용하는 선택자는 크게 5 가지 종류로 나눌 수 있습니다.

* 기본 선택자
* 복합 선택자
* 가상 클래스 선택자
* 가상 요소
* 속성

# 기본 선택자.

기본 선택자로 분류할 수 있는 선택자는 아래와 같습니다.

* 전체 선택자
* 태그 선택자
* 클래스 선택자
* ID 선택자

> 💡 이 순서는 나중에 복합으로 사용될 때 중요합니다.

## 전체 선택자

전체 선택자(`Universal Selector`)는 모든 요소를 선택하는 선택자입니다.   

<u>*`*`를 사용합니다.*</u>

* 예시
  ```css
  * {
    color : orange;
  }
  ```

## 태그 선택자

태그 선택자(`Type Selector`)는 HTML 문서의 태그 요소를 선택합니다.

* 예시
  ```css
  li {
    color: orange;
  }
  ```

  ```html
  <li>...</li>
  ```

## 클래스 선택자

클래스 선택자(`Class Selector`)는 HTML 문서의 class를 선택합니다.

<u>*`.`으로 클래스를 가리킬 수 있습니다.*</u>

* 예시
  ```css
  .orange {
    color : orange;
  }
  ```

  ```html
  <li>...</li>
  <li>...</li>
  <li class="orange">...</li>

  ...
  <span class="orange">...</span>
  ```

## ID 선택자

ID 선택자(`ID Selector`)는 HTML 문서의 ID를 선택합니다.

<u>*`#`을 사용하여 ID를 가리킬 수 있습니다.*</u>

* 예시
  ```css
  #orange {
    color: orange;
  }
  ```

  ```html
  <li id="orange">...</li>
  ```

# 복합 선택자

복합 선택자는 2 가지 이상의 선택자 요소를 결합하여 사용하는 선택자입니다.   
종류는 아래와 같습니다.

* 일치 선택자
* 자식 선택자
* 하위 선택자
* 인접 형제 선택자

## 일치 선택자

일치 선택자(`Basic Combinator`)는 여러 선택자를 만족하는 요소를 선택하여 스타일을 적용합니다.

<u>*선택자를 따로 구분하지 않고 붙여 씁니다.*</u>

* 예시
  ```css
  span.orange
  ```

  ```html
  <span class="orange">...</span>
  ```

  * 위 예시에서는 태그 선택자와 클래스 선택자를 사용하는 것을 볼 수 있습니다.
  * 이때 순서를 바꿔 클래스 선택자를 앞에 두면 `.orangespan`이 되어 이름이 orangespan인 클래스에 대한 클래스 선택자가 되어버립니다.

## 자식 선택자

자식 선택자(`Child Combinator`)는 앞의 선택자의 자식 요소인 뒤의 선택자를 찾아 선택합니다.

<u>*`>`를 사용하여 구분합니다.*</u>

* 예시
  ```css
  ul > .orange {
    color: orange;
  }
  ```

  ```html
  <ul>
    ...
    <li class="orange">...</li>
  </ul>
  ```

## 하위 선택자

하위 선택자(`Descendant Combinator`)는 앞의 선택자의 하위 요소인 뒤의 선택자를 찾아 선택합니다.

<u>*공백 1칸을 사용하여 구분합니다.*</u>

* 예시
  ```css
  div .orange {
    color: orange;
  }
  ```

  ```html
  <div>
    <ul>
      <li class="orange">...</li>
    </ul>

    <span class="orange">...</span>
  </div>
  ```
  
  * div 태그의 하위에 있는 모든 orange 클래스를 선택하는 예시입니다.

## 인접 형제 선택자

인접 형제 선택자(`Adjacent Sibling Combinator`)는 앞의 선택자와 인접한 뒤의 선택자를 찾아 선택합니다.

<u>*` + `를 사용하여 구분합니다.*</u>

* 예시
  ```css
  .orange + li {
    color: orange;
  }
  ```

  ```html
  <ul>
    <li class="orange">...</li>
    <li>오렌지</li>
    <li>시과</li>
  </ul>
  ```

  * 이러한 경우 orange 클래스에 인접한 태그 `li`를 하나만 선택하는 예시입니다.
  * 따라서 "오렌지"만 스타일이 적용됩니다.

## 일반 형제 선택자

일반 형제 선택자(`General Sibling Combinator`)는 인접 형제 선택자와 다르게 다음에 있는 모든 선택자에 스타일을 적용합니다.

<u>*`~`을 사용하여 구분합니다.*</u>

* 예시
  ```css
  .orange ~ li {
    color: ornage;
  }
  ```

  ```html
  <ul>
    <li class="orange">...</li>
    <li>오렌지</li>
    <li>시과</li>
  </ul>
  ```

  * 인접 형제 선택자와 다르게 "오렌지"와 "사과" 모두 스타일이 적용됩니다.