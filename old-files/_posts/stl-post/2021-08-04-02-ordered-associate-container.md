---
title: "[C++] Ordered Associate Container (정렬된 연관 컨테이너)"
excerpt: "STL 컨테이너의 한 종류인 연관 컨테이너에 대해 알아보자"

categories:
  - STL
tags:
  - [Cpp, STL, Container]

toc: true
toc_sticky: true

last_modified_at: 2021-08-04
---

STL 컨테이너의 종류 중 하나인 <mark style="background-color: #3e3e3e; color: orange;">Associate Container</mark>는 두 가지로 나뉜다.
* Ordered Associate Container
* UnOrdered Associate Container

> Ordered Associate Container의 종류
> * map
> * set
> * multimap
> * multiset

## std::map 컨테이너

`map`컨테이너는 `key`와 `value`로 템플릿 인자를 가지고 있다.   
두 인자는 한 쌍의 `std::pair` 객체로 저장되며,   
`key`를 가지고 `value`를 얻는 형식으로 사용된다.   
(이때 `key`는 중복될 수 없다.)

`key`의 순서대로 자동 정렬되는 특징을 가진다.

`map`컨테이너를 사용하려면 \<map> 라이브러리를 `include`해야 한다.

### std::map 생성 및 초기화

```cpp
std::map<int, std::string> map {
  {1, "string"},
  std::pair<int, std::string>(2, "string"),
  std::make_pair(3, "string")
}
```

생성할 때 파라미터 인자는 `key`와 `value` 순서로 자료형을 입력한다.

___

초기화하는 방법은 세 가지가 있다.

`map`컨테이너를 초기화할 때는 중괄호를 사용하여 값을 넣을 수 있다.   
이때 첫번째는 `key`, 두번째는 `value`에 해당한다.

또는 `std::pair` 객체를 생성하여 넣을 수 있다.   
이는 템플릿으로 템플릿 인자를 명시해줘야 하므로 조금 불편하다.

STL에서 `std::pair`의 불편함을 해소하기 위한 `std::make_pair`메서드를 제공한다.   
이는 인자의 자료형을 자동 추론하여 `std::pair` 객체를 만들어 반환해주는 기능을 한다.

> C++17 부터는 `std::pair`가 템플릿 인자를 명시하지 않아도 된다고 한다.

### std::map 원소 접근하기

`std::pair`의 `first`와 `second`메서드를 사용하여 `key`와 `value`를 조회할 수 있다.

```cpp
for (const std::pair<int, std::string> &pair : map) {
  std::cout << pair.first << ":" << pair.second << std::endl;
}

//  1:string
//  2:string
//  3:string
```

> auto 를 사용하여 좀더 깔끔하게 표현이 가능하며, 자동으로 추론하게 만들 수 있다.
> ```cpp
> for (const auto &pair : map) {
>   std::cout << pair.first << ":" << pair.second << std::endl;
> }
> ```

___

또한 첨자와 `key`를 사용하여 `value`에 접근할 수 있다.

```cpp
map[1] = "abcd";
std::cout << map[2] << std::endl;
```

### std::map 사용

```cpp
#include <map>

int main()
{
  std::map<char, int> map {
    {'b', 20},
    {'a', 10}
  }
  map.insert(make_pair('c', 50)); //  원소 삽입

  std::cout << map['a'] << std::endl; //  10
  map.insert(make_pair('a', 100)); // key 중복으로 무시
  std::cout << map['a'] << std::endl; //  10

  std::cout << map.size() << std::endl; //  3

  for (auto& pair : map) {
    std::cout << "Key = " <<  pair.first << ":" << "Value = " << pair.second << std::endl;
  }
}


//  10
//  10
//  3
//  Key = a:Value = 10
//  Key = b:Value = 20
//  Key = c:Value = 50
```

## std::set 컨테이너

`map`과 다르게 `key`로만 이루어진 컨테이너이다.   
(한 쌍이 아닌 단일 값으로 이루어진다. `key`가 `value`이다.)

`insert`메서드를 통해 삽입이 되며, 자동으로 정렬된다.

이 또한 원소가 중복되지 않는다.

`set`컨테이너를 사용하려면 \<set>라이브러리를 `include`해야 한다.

### std::set 생성과 초기화

```cpp
std::set<std::string> set {
  "string", "abcd"
}
```

파라미터 인자에 자료형을 입력하여 생성한다.
`key`로만 이루어지기 때문에 배열을 초기화하듯 하면 된다.

### std::set 사용

```cpp
int main()
{
  std::set<std::string> set;

  set.insert("abcd");
  set.insert("efgh");
  set.insert("string");
  set.insert("abcd"); //  중복되므로 무시

  std::cout << set.size() << std::endl;

  for (auto& key : set) {
    std::cout << key << std::endl;
  }
}


//  3
//  abcd
//  efgh
//  string
```

## std::multimap 컨테이너

`map`컨테이너와 거의 동일하다.   
대신 `key`의 중복이 가능한 `map`컨테이너라고 보면 된다.

1:1 대응이 아니기 때문에 첨자`[]`와 `key`를 통해 접근할 수 없다.   
또한 `insert`메서드를 통해서 값을 넣을 수 있다.

`multimap`컨테이너도 \<map>라이브러리를 `include`해야 한다.

### std::multimap 사용

```cpp
#include <multimap>

int main()
{
  std::multimap<char, int> multi_map;
  multi_map.insert(std::pair<char, int>('a', 10));
  multi_map.insert(std::pair('b', 20));   // C++ 17 이후
  multi_map.insert(std::pair('c', 50));
  multi_map.insert(std::pair('a', 100));  // 중복
  multi_map.insert(std::pair('a', 200));  // 중복

  std::cout << multi_map.count('a') << std::endl;
  for (auto &pair : multi_map) {
    cout << "Key = " << pair.first << ":" << "Value = " << pair.second << std::endl;
  }
}


//  3
//  Key = a:Value = 10
//  Key = a:Value = 100
//  Key = a:Value = 200
//  Key = b:Value = 20
//  Key = c:Value = 50
```

## std::multiset 컨테이너

`set`컨테이너와 거의 동일하다.
대신 원소의 중복이 가능하다.

이 또한 `insert`메서드를 통해서 값을 넣을 수 있다.

`multiset`컨테이너도 \<set>라이브러리를 `include`해야 한다.

### std::multiset 사용

```cpp
#include <multiset>

int main()
{
  std::multiset<std::string> multi_set;

  multi_set.insert("abcd");  
  multi_set.insert("efg");
  multi_set.insert("abcd");	

  std::cout << multi_set.size() << std::endl;

  for (auto &key : multi_set)
    std::cout << key << std::endl;
}


//  3
//  abcd
//  abcd
//  efg
```