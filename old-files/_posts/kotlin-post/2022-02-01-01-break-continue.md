---
title: "[Kotlin] break와 continue"
excerpt: ""

classes: wide

toc: true
toc_sticky: true

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-01
---

<mark style="background-color: #2e2e2e; color: orange;">break</mark>와 <mark style="background-color: #2e2e2e; color: orange;">continue</mark>는 `for`와 `while`과 같은 반복문을 제어하는 대표적인 제어문입니다.

## break

<mark style="background-color: #2e2e2e; color: orange;">break</mark>는 반복문을 즉시 탈출하도록 합니다.

```kotlin
var num = 0

while (num != 10) {
  if (num == 3) {
    break
  }

  println(num)
  num++
}

// 0
// 1
// 2
```

* `num`이 3이되면 `break`문이 실행되어 `while`문이 즉시 종료됩니다.
* `for`문도 동일합니다.


## continue

`continue`는 이후의 코드를 실행하지 않고, 해당 범위의 맨 처음의 위치로 이동합니다.

```kotlin
var num = 0

while (num != 5) {
  num++

  if (num == 3) {
    continue
  }

  println(num)
}

// 1
// 2
// 4
// 5
```

* `num`의 값이 3이 되었을 때, `continue`가 실행되어 밑의 코드가 실행되지 않고 처음으로 돌아갑니다.
* 이 역시도 `for`문에도 동일하게 사용할 수 있습니다.

`continue`를 사용함에 있어 주의할 점은,   
이후의 코드가 실행되지 않기 때문에 무한 루프가 될 수 있다는 것입니다.   
(특히 `while`의 경우)

```kotlin
var num = 0

while (num != 10) {
  if (num == 3) {
    continue
  }
  
  println(num)
  num ++
}

//  0
//  1
//  2
//  무한루프
```

* `num`의 값을 증가시켜서 값이 10이 되면 루프를 종료해야 합니다.   
하지만 `num`의 값이 3이 되면 `continue`로 인해 `num++`이 실행되지 않아 무한 루프를 돌게 됩니다.