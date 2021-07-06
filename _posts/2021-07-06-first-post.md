---
title: "깃헙 블로그 포스팅하기"
excerpt: "md(마트다운)을 사용하여 깃헙 블로그에 글 올리기"

categories:
  - Blog
tags:
  - [Blog, jekyll, GitHub, Git]

toc: true
toc_sticky: true

date: 2021-07-06
last_modified_at: 2021-07-06
---
**블로그 작성법**
===

블로그의 내용은 마크다운 언어로 적는다.   
처음 사용하기 때문에 생소한 것들 뿐인데,   
금방 적응 하리라...

마크다운 문법을 알아보자.

___

## 1. 헤더 (Header)

```
# Heading1  //  헤더1은 밑줄이 자동으로 그어진다.
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6
```

# Heading1
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6

## 2. 밑줄 (UnderLine)

```
___ //  언더스코어 3번
```

___

###### 이렇게 밑줄이 그어진다.

## 3. 텍스트 속성 (Text Attributes)

```
*Italic*
**Bold**
***Italic & Bold***
~~cancelled~~
```

*Italic*   
**Bold**   
***Italic & Bold***   
~~cancelled~~  

## 4. 인용문 (Block Quotes)

```
> first
>> second
>>> third
>>>> fourth
```

> first
>> second
>>> third
>>>> fourth

## 5-1. 순서 없는 리스트 (List)

```
* 야채
* 과일
  * 사과
    * 초록사과
    * 빨간사과
      * 못생긴 사과
      * 예쁜 사과
```

* 야채
* 과일
  * 사과
    * 초록사과
    * 빨간사과
      * 못생긴 사과
      * 예쁜 사과   

'+', '-', '*' 다 가능하다.

<br/>

## 5-2. 순서가 있는 리스트 (List)

```
1. first
2. second
1. third  //  숫자가 동일해도 순서대로 바뀐다.
```

1. first
2. second
1. third

<br/>

## 6. 코드 블럭 (Code Block)

첫번째 방법  

```
```C++  //  사용언어를 적어주어 문법강조가 가능하다.
#include <iostream>
int main()
{
  std::cout << "hello world" << std::endl;
}
```  //  닫는다.
```

```C++
#include <iostream>
int main()
{
  std::cout << "hello world" << std::endl;
}
```

두번째 방법

    공백을 넣는다. (스페이스바 4번)

<br/>

## 7. 링크 (Link)

```
click [here](URL)
```

click [here]()

## 8. 이미지 (Image)

```
![이름](URL)
```

![라이언](/home/felix/Downloads/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg)

## 9. 참조

```
[이름][참조]
[참조]: URL
```

#### 링크와 이미지 모두 사용이 가능하다.

## 10. 표 (Table)

```
|Header1|Header2|
|--|--|
|cell1|cell2|
|cell1|cell2|
|cell1|cell2|
```

|Header1|Header2|
|:--:|:--:|
|cell1|cell2|
|cell1|cell2|
|cell1|cell2|

* 콜론의 위치에 따라 정렬이 바뀐다.
  * |:--| : 왼쪽 정렬
  * |--:| : 오른쪽 정렬
  * |:--:| : 가운데 정렬

## 11. 이모티콘

다양한 이모티콘들이 존재한다.

```
&#128513;
&#127822;
&#127827;
```

&#128513;   
&#127822;   
&#127827;

## 12. 그 외

줄바꿈은 엔터가 아니라 공백 3칸을 사용한다.   
강제로 줄을 바꾸고 싶은 경우 \<br/> 을 사용한다.

<br/>

backslash( \\ ) 를 이용하여 마크다운의 포맷을 무시하고 작성할 수 있다.

___

<br/>

마크다운은 생각보다 편리하지만 표준이 없다는 단점이 있다.   
따라서 도구에 따라 변환 방식이나 생성물이 다를 수 있다고 한다.   
또한 HTML 의 문법을 사용할 수는 있지만,   
온전히 대신하지 못한다고 한다.
