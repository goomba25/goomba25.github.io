---
title: "[Kotlin] 프로퍼티의 get, set"
excerpt: "프로퍼티의 get, set 정리"

classes: wide

toc: true
toc_sticky: true

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-02
---

클래스의 <mark style="background-color: #2e2e2e; color: orange;">프로퍼티(Property)</mark>의 선언은 다음과 같습니다.

```kotlin
var <propertyName>[:<PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

* **property_initializer** : 프로퍼티 초기화 데이터
* **getter, setter** : 프로퍼티의 데이터를 얻거나 변경하기 위한 접근자
* **PropertyType** : 프로퍼티의 자료형(타입)

이는 각각 생략이 가능하기도 하고, 암묵적으로 기본 기능이 구현됩니다.

## getter, setter

`getter`와 `setter`는 모두 해당 프로퍼티의 바로 밑에 들여쓰기를 통해 작성합니다.

`getter`는 <mark style="background-color: #3e3e3e; color: #94EC81;">get</mark>이라는 이름으로 접근할 때 호출되고,   
`setter`는 <mark style="background-color: #3e3e3e; color: #94EC81;">set</mark>이라는 이름으로 값을 할당할 때 호출됩니다.

* `val`은 상수이기 때문에 `getter`만 생성됩니다.

```kotlin
class Rectangle {
    var width = 10
        set(value) {
            field = value/2
        }
    var height = 10
        set(value) {
            field = value/2
        }
    var area: Int = 0
        get() = width*height
}

fun main()
{
    var rect = Rectangle()
    println("w : ${rect.width}")
    println("h : ${rect.height}")
    println("a : ${rect.area}")

    rect.width = 30
    rect.height = 30

    println("w : ${rect.width}")
    println("h : ${rect.height}")
    println("a : ${rect.area}")
}

//  w : 10
//  h : 10
//  a : 100
//  w : 15
//  h : 15
//  a : 225
```

* width와 height는 10으로 초기화됩니다.   
하지만 다시 값을 할당하면 `setter`가 호출되고, 값은 1/2가 됩니다.

* `setter`의 value는 파라미터와 같이 변수에 할당되는 값을 의미하고,   
`field`라는 것에 대입함으로 변수에 최종적으로 할당됩니다.   
(value는 다른 이름으로 변경 가능합니다.)

* area의 값을 얻으려고 하면 `getter`가 호출되어 width*height가 얻어집니다.   
`getter`로 자기 자신의 값을 호출하려면 아래와 같이 정의할 수 있습니다.

  ```kotlin
  get {
    return field
  }
  ```

## field

`field`는 프로퍼티의 값이 저장된 곳으로, 프로퍼티에 저장된 값 자체를 지칭하는 키워드입니다.   
`field`는 `getter`와 `setter`에서만 사용이 가능합니다.

따라서 외부에서 프로퍼티의 값에 접근하면 `getter`와 `setter`가 호출되지만   
`getter`와 `setter`의 내부에서 값에 접근하려면 `field`를 통해서만 접근할 수 있습니다.

```kotlin
class Rectangle {
    var width = 10
        set(value) {
            width = value/2
        }
}

fun main()
{
    var rect = Rectangle()
    println("w : ${rect.width}")

    rect.width = 30

    println("w : ${rect.width}")
}

//  무한 루프
```

* 위처럼 `field`가 아닌 프로퍼티의 값에 직접 접근하려고 하면, 초기화된 값을 한번 출력한 뒤에 값을 재할당 하는 부분에서 오버플로우가 발생합니다.

* 이유는 값이 할당될 때 `setter`가 호출되는데,   
내부에서 프로퍼티의 값을 할당하기 위해 다시 `setter`를 호출하는 것을 반복하기 때문입니다.