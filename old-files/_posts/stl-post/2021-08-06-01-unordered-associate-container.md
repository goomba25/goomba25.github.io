---
title: "[C++] Unordered Associate Container (정렬되지 않는 연관 컨테이너)"
excerpt: "STL 컨테이너의 한 종류인 연관 컨테이너에 대해 알아보자"

categories:
  - STL
tags:
  - [Cpp, STL, Container]

toc: true
toc_sticky: true

last_modified_at: 2021-08-06
---

> Unordered Associate Container의 종류
> * unordered_set
> * unordered_map
> * unordered_multiset
> * unordered_multimap

<mark style="background-color: #3e3e3e; color: orange;">Unordered Associate Container</mark>의 특징은 해시 테이블로 이루어진다는 것이다.

따라서 탐색 속도가 굉장히 빠르다. (`insert`, `find`, `erase` 연산이 굉장히 빠르다.)

하지만 `해시 충돌`이 발생할 수 있는 위험이 따른다.

## unordered_set 컨테이너

정렬되지 않는 `set`컨테이너라고 보면 된다.
사용 방법도 동일하다.

`unordered_set`컨테이너를 사용하려면 \<unordered_set>을 `include`해야 한다.

```cpp
#include <string>
#include <unordered_set>

template<typename T>
void func(const std::unordered_set<T> &s, T key)
{
  auto itr = s.find(key);
  if (itr == s.end()) {
    std::cout << "unexist " << key << std::endl;
  } else {
    std::cout << "exist " << key << std::endl;
  }
}

int main()
{
  std::unordered_set<std::string> set;

  set.insert(std::string("string"));
  set.insert(std::string("abcd"));
  set.insert(std::string("hello"));

  func(set, std::string("string"));

  set.erase(std::string("abcd"));

  func(set, std::string("abcd"));
}


//  exist string
//  unexist abcd
```

* `find`함수는 해당 원소가 존재하지 않을 경우 `end`를 반환한다.

## unordered_map 컨테이너

정렬되지 않는 `map`컨테이너라고 보면 된다.

`unordered_set`컨테이너를 사용하려면 \<unordered_set>을 `include`해야 한다.

```cpp
#include <unordered_map>

template<typename T, typename E>
void func(const std::unordered_map<T, E> &m, T key)
{
  auto itr = m.find(key);
  if (itr == m.end()) {
    std::cout << "unexist key " << key << std::endl;
  } else {
    std::cout << "exist key " << key << ", value = " << m.at(key) << std::endl;
  }
}

int main()
{
  std::unordered_map<std::string, int> map;

  map.insert(std::make_pair("abcd", 9));
  map.insert(std::make_pair("string", 100));
  map.insert(std::make_pair("hello", 100));

  func(map, std::string("string"));
  func(map, std::string("str"));
}


//  exist key string, value = 100
//  unexist key str
```

## unordered_multiset, unordered_multimap

`multiset`, `multimap`과 동일하다.

## Associate Container 전체 요약

* 특정 원소만 존재하는 경우 : `set`, `multiset`

* 특정 키와 값이 존재하는 경우 : `map`, `multimap`

* 값이 중복되는 경우 : `multiset`, `multimap`

* 정렬이 필요 없고, 속도를 필요로 할 경우 : `unordered_set`, `unordered_map`

### Set
* 추가/삭제 시 O(logN)의 시간이 소요됨.
* find 함수를 사용하여 원소의 존재여부 확인가능.
* 내부적으로 트리 구조로 구성됨.

### Map
* key와 value로 이루어짐. (std::pair)
* 첨자[]와 key를 사용하여 value에 접근 가능.

### Multimap
* 중복 허용.
* find 함수 사용 불가.
* 같은 key의 값은 붙어있음.

### Multiset
* 중복 허용.

### Unordered_set, Unordered_map
* 해시로 구성됨.
* insert, find, erase 함수가 굉장히 빠름. (O(1) 시간 소요)

### Unordered_multiset, Unordered_multimap
* 중복 허용.