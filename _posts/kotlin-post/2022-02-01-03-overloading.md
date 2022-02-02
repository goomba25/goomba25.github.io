---
title: "[Kotlin] 함수의 오버로딩"
excerpt: "함수를 오버로딩하는 방법"

classes: wide

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-01
---

<mark style="background-color: #2e2e2e; color: orange;">오버로딩(overloading)</mark>은 이름이 같은 함수를 만드는 기능입니다.

<mark style="background-color: #2e2e2e; color: orange;">오버로딩</mark>이 가능하기 위해서는 이름은 같되, 매개 변수는 다르게 만들면 됩니다.

```kotlin
class Test {
  fun test(a: Int) {
    //  code
  }
  
  fun test(a: Int, b: Int) {
    //  code
  }
  
  fun test(a: String) {
    //  code 
  }
}
```

* 다른 매개 변수 목록을 가진, 이름이 동일한 세 개의 함수는 전달하는 인수에 따라 알맞은 함수가 자동으로 호출됩니다.