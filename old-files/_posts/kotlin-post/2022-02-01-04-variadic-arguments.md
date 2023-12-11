---
title: "[Kotlin] 가변 인자"
excerpt: "가변 인자"

classes: wide

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-01
---

Kotlin에서는 <mark style="background-color: #2e2e2e; color: orange;">vararg</mark>라는 가변 인자를 제공합니다.   
가변 인자를 사용하면 매개 변수를 유동적으로 활용할 수 있습니다.

```kotlin
fun print(vararg nums: Int)
{
  for(i in nums) {
    println(i)
  }
}

fun main()
{
  print(1,2,3,4)
  println()
  print(10,20)
}


//  1
//  2
//  3
//  4
//
//  10
//  20
```

* 가변 인자는 정해지지 않은 갯수를 전달 받도록 하여 내부에서 반복문으로 처리할 수 있습니다.