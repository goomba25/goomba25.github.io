---
title: "[Kotlin] 접근 제한자 (Access Modifier) - private, public"
excerpt: "제어자를 알아보자"

classes: wide

toc: true
toc_sticky: true

categories:
  - Kotlin
tags:
  - [Android, Kotlin]

last_modified_at: 2022-02-02
---

Kotlin의 클래스, 함수, 변수, 인터페이스는 모두 제한자를 가질 수 있습니다.   
접근 제한자를 사용한다는 것은 어디서든 접근이 가능한 대상을 접근이 불가능하도록 할 수 있다는 것입니다.

접근 제한자는 다음과 같습니다.

* **public** : 기본 제한자로, 모든 경우에서 접근이 가능합니다.
* **protected** : 상속의 관계의 자식 클래스에서 접근이 가능합니다.
* **internal** : 같은 모듈 안에서만 접근이 가능합니다.
* **private** : 외부에서 접근할 수 없습니다.


> 이번에 알아볼 제한자는 private와 public입니다.

## private, public

```kotlin
class Access (val name_: String, var num: Int) {
    fun test1()
    {
        num++
    }

    fun test2()
    {
        println("${name_}'s number is $num")
    }
}

fun main()
{
    var ac:Access = Access("John",0)
    
    ac.test2()  //  John's number is 0

    ac.test1()
    ac.test2()  //  John's number is 1
    
    ac.num = 5
    ac.test2()  //  John's number is 5
}
```

* 위의 클래스에서 `num`을 변경하는 메서드를 작성했지만, 해당 메서드 없이도 `num`을 변경할 수 있습니다.   
이러한 부분은 외부에서 무분별하게 변경할 수 있는 문제를 가집니다.

* 이러한 문제를 <mark style="background-color: #2e2e2e; color: orange;">private</mark>접근자를 통해 해결할 수 있습니다.

```kotlin
class Access (val name_: String, private var num: Int) {
    fun test1()
    {
        num++
    }

    fun test2()
    {
        println("${name_}'s number is $num")
    }
}

fun main()
{
    var ac:Access = Access("John",0)
    
    ac.test2()  //  John's number is 0

    ac.test1()
    ac.test2()  //  John's number is 1
    
    ac.num = 5  //  에러
    ac.test2()
}
```

* <mark style="background-color: #2e2e2e; color: orange;">private</mark>으로 선언된 `num`변수는 클래스 내부에서만 접근이 가능해집니다.

* <mark style="background-color: #2e2e2e; color: orange;">private</mark>을 사용하는 이유 중의 하나는 이처럼 외부에서 무분별한 변경을 막을 수 있다는 점도 유용하지만,   
외부에 공개하지 않도록 코드를 "은닉"하도록 하는 점이 있습니다. (캡슐화)

* 또한 접근 제한자가 지정되지 않은 모든 변수, 함수, 클래스 등은 생략된 것으로, 기본적으로 <mark style="background-color: #3e3e3e; color: #D69EF6;">public</mark>입니다.

___

## 사용 예제

간단하게 플레이어와 몬스터가 싸우는 형태의 예제입니다.

```kotlin
fun main()
{
	val player = Player(20, 15)
	val monster = Monster(20, 10)

	monster.attack(player)
	player.attack(monster)
	monster.attack(player)
	player.attack(monster)
}

class Player(private var hp: Int, private var power: Int) {
	fun attack(monster: Monster) {
		println("플레이어가 몬스터를 공격했습니다.")
		monster.defense(this.power)
	}

	fun defense(damage: Int) {
		hp -= damage
		if (hp <= 0) {
			println("기사가 죽었습니다.")
		} else {
			heal()
			println("기사의 현재 체력은 $hp 입니다.\n")
		}
	}

	private fun heal() {
		hp += 5
		println("플레이어가 체력을 5 회복합니다.")
	}
}

class Monster(private var hp: Int, private var power: Int) {
	fun attack(player: Player) {
		println("몬스터가 플레이어를 공격했습니다.")
		player.defense(this.power)
	}

	fun defense(damage: Int) {
		hp -= damage
		if (hp <= 0) {
			println("몬스터가 죽었습니다.")
		} else {
			println("몬스터의 현재 체력은 $hp 입니다.\n")
		}
	}
}
```

* Player 클래스의 `attack`함수는 Monster 클래스의 `defense`함수를 호출하며 자신의 `power`를 전달.

* 반대로 Monster 클래스의 `attack`함수는 Player 클래스의 `defense`함수를 호출하며 자신의 `power`를 전달.

	* 이때 Player 클래스의 `defense`함수는 `heal`함수를 호출하는데,   
  `heal` 함수는 오로지 같은 클래스의 defense 함수에서만 호출합니다. 따라서 <mark style="background-color: #2e2e2e; color: orange;">private</mark>로 하는 것이 좋겠죠.

* 또한 각각의 클래스의 `attack`과 `defense`함수로만 서로의 `hp`를 변경할 수 있어야하기 때문에 `hp`를 <mark style="background-color: #2e2e2e; color: orange;">private</mark>으로 선언.

* power 역시 외부에서 변경하지 못하도록 <mark style="background-color: #2e2e2e; color: orange;">private</mark>으로 선언.