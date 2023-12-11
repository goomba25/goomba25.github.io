---
title: "[Kotlin] 전역변수와 지역변수"
excerpt: "전역/지역 변수의 차이"

classes: wide

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-02
---

<mark style="background-color: #2e2e2e; color: orange;">전역변수</mark>는 어디서든 접근이 가능한 변수입니다.

```kotlin
var num:Int = 10

class Test1 {
  var nums:Int = num
}

class Test2 {
  var number:Int = num
}

fun main()
{
  println(num)
}
```

* 위처럼 어떠한 범위에도 들어가지 않은 변수이며, 어디서든 접근이 가능합니다.

<mark style="background-color: #3e3e3e; color: #94EC81;">지역변수</mark>는 범위에 국한되는 변수입니다.

```kotlin
class Test1 {
  var num1:Int = 10
  var num2:Int = num1 //  접근 가능
}

class Test2 {
  var number:Int = num  //  접근 불가능
}

fun main()
{
  println(num1) //  접근 불가능
}
```

* 전역변수와는 다르게 클래스, 함수 등에서 선언한 변수이며 범위 안에서만 접근이 가능합니다.