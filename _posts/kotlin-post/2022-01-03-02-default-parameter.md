---
title: "[Kotlin] 디폴트 매개변수"
excerpt: "디폴트 매개 변수에 대해 알아보자"

classes: wide

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-01-03
---

함수의 매개 변수를 아무것도 넘겨주지 않아도, 기본값으로 동작하도록 할 수 있습니다.

```kotlin
fun printInt(a : Int = 0) {
  println(a)
}

fun main()
{
  val num : Int = 5
  printInt(num)  //  5 출력

  printInt()  //  0 출력
}
```

매개 변수의 기본값을 `0`으로 선언해주고, 아무것도 넣어주지 않았기 때문에 `0`이 출력됩니다.

매개 변수로 값을 전달하면, 기본값이 아닌 전달된 값으로 함수가 동작하므로 `5`가 출력됩니다.