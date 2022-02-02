---
title: "[Kotlin] 클래스의 상속"
excerpt: "클래스 상속 개념"

classes: wide

toc: true
toc_sticky: true

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-02
---

일부 동일한 내용을 가지는 여러 클래스가 있다고 가정해봅시다.

```kotlin
class A {
  code 1
  code 2
}

class B {
  code 1
  code 3
}

class C {
  code 1
  code 4
}

class D {
  code 1
  code 5
}
```

* 4 개의 클래스는 동일하게 `code 1`이라는 내용이 중복됩니다.

이처럼 중복되는 불필요한 부분을 리팩토링하는, 쉽게 말해 정리정돈하는 방법 중의 하나가 "클래스의 상속"입니다.

## 상속

```kotlin
open class 부모클래스() {
  code 1
}

class 자식클래스1(): 부모클래스() {
  code 2
}

class 자식클래스2(): 부모클래스() {
  code 3
}

class 자식클래스3(): 부모클래스() {
  code 4
}
```

클래스의 상속이란 하나의 클래스의 기능을 다른 클래스에서 동일하게 사용할 수 있는 것입니다.   
여기서 상속을 하는 클래스를 <mark style="background-color: #2e2e2e; color: orange;">부모 클래스</mark>라고 하며, 상속을 받는 클래스를 <mark style="background-color: #2e2e2e; color: orange;">자식 클래스</mark>라고 합니다.

* 클래스는 기본 접근 제한자가 `private`으로 설정되어 있으며, 상속을 가능하게 만들기 위해 <mark style="background-color: #3e3e3e; color: #94EC81;">open</mark>키워드를 사용해야 합니다.

* 자식 클래스는 부모 클래스의 `code 1`을 동일하게 가집니다.

___

#### 예제

```kotlin
open class Car() {
	fun run() {}
	fun stop() {}
	fun reverse() {}
}

class Truck() {
}

class Bus() {
}

class SuperCar() {
}

class Person() {
}

fun main() {
	val truck: Truck = Truck()
	val bus: Bus = Bus()
	val supercar: SuperCar = SuperCar()
	val person: Person = Person()
	
	truck.run()
	bus.run()
	supercar.reverse()
	person.run()  //  메서드 없음
}
```

* 부모 클래스 Car를 Truck, Bus, SuperCar 클래스가 상속받고 Person 클래스는 상속 받지 않았습니다.

* Truck, Bus, SuperCar의 객체들은 Car의 메서드를 그대로 사용할 수 있는 반면에,   
상속 받지 않은 Person 클래스의 객체는 Car의 메서드를 사용하지 못합니다.