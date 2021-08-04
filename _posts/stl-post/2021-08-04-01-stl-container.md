---
title: "[C++] Sequence Container (순차 컨테이너)"
excerpt: "STL 컨테이너의 한 종류인 순차 컨테이너에 대해 알아보자"

categories:
  - STL
tags:
  - [Cpp, STL, Container]

toc: true
toc_sticky: true

last_modified_at: 2021-08-04
---

> Sequence Container 의 종류
> * array
> * vector
> * deque
> * list

<mark style="background-color: #3e3e3e; color: orange;">Sequence Container</mark> (순차 컨테이너)의 특징은 자동으로 정렬되지 않으며,   
순서의 영향을 받는다는 것이다.

## std::array 컨테이너

C++11에서 소개된 `array`컨테이너는 정적 배열이다.   
따라서 사이즈를 변경할 수 없다. (`stack`에 저장된다.)

`array`컨테이너를 사용하려면 \<array> 라이브러리를 `include`해야 한다.

```cpp
template<typename T, size_t N>
class array
{};
```

### std::array 메서드

`array`는 정적 배열이기 때문에 원소를 추가하거나 삭제할 수 없다.

* begin : 포인터 타입으로 배열의 첫 원소의 주소 (iterator 와 사용)
* end : 포인터 타입으로 배열의 마지막 원소의 다음 주소 (iterator 와 사용)
* rbegin : 포인터 타입으로 배열을 거꾸로 뒤집었을 때, 첫 원소의 주소 (iterator 와 사용)
* rend : 포인터 타입으로 배열을 거꾸로 뒤집었을 때, 마지막 원소의 다음 주소 (iterator 와 사용)
* front : 맨 앞 원소 반환
* back : 맨 뒤 원소 반환
* data : 포인터 타입으로 배열의 주소를 반환
* fill : 모든 원소를 주어진 값으로 변경
* swap :  배열과 배열의 원소를 교환 (자료형과 사이즈가 동일해야 함)
* empty : 배열이 비어있는지 확인
* at : index 번째 인자 반환 (범위를 점검하여 안전)

이외에도 여러 메서드가 존재한다.

### std::array 사용

```cpp
#include <array>

int main()
{
  std::array<int, 3> arr1 {1,2,3};
  std::array<int, 3> arr2 {10,20,30};

  std::cout << *(arr1.begin()) << std::endl;  //  1
  std::cout << *(arr1.rend()) << std::endl; //  0
  std::cout << arr1.back() << std::endl;  //  3
  std::cout << *(arr1.data()) << std::endl; //  1
  arr1.fill(5);
  arr1.swap(arr2);
  std::cout << arr1.at(1) << std::endl; //  20
  std::cout << arr2.empty() << std::endl; //  0 (false)
}
```

## std::vector 컨테이너

`vector`컨테이너는 동적 배열이다. (`heep`에 저장된다.)   
따라서 원소가 추가되거나 삭제될 때 자동으로 메모리를 재할당하고, 사이즈를 변경할 수 있다.

`vector`컨테이너를 사용하려면 \<vector> 라이브러리를 `include`해야 한다.

```cpp
template<typename T>
class vector
{};
```

### std::vector 메서드

* push_back : 맨 뒤에 원소를 추가
* pop_back : 맨 뒤의 원소 제거
* at : index 번째 원소 반환 (범위를 점검하여 안전)
* front / back : 맨 앞/뒤의 원소를 반환
* clear : 모든 원소를 제거 (원소는 제거되고 메모리는 남음)
* begin / end : 포인터 타입으로 처음/마지막 원소의 주소 (iterator 와 사용)
* size : 원소의 갯수 반환
* capacity : 할당된 메모리의 크기 반환
* reserve : n 사이즈의 메모리를 미리 할당
* resize : 사이즈를 n 으로 변경
* swap : 배열과 배열을 교환 (사이즈가 달라도 됨)
* insert : 해당 위치에 원소 추가 (iterator 와 사용)
* erase : iterator 가 가리키는 원소 제거 (iterator 와 사용)
* empty : 배열이 비어있는지 확인

이외에도 여러 메서드가 존재한다.

### std::vector 사용

```cpp
int main()
{
  std::vector<int> vec1;
  std::vector<int> vec2;

  vec1.push_back(1);
  vec1.push_back(2);
  vec1.push_back(3);
  vec1.push_back(4);
  std::cout << vec1.at(0) << std::endl; //  1
  std::cout << vec1.front() << std::endl; //  1
  std::cout << vec1.back() << std::endl;  //  4
  vec1.pop_back();
  std::cout << vec1.back() << std::endl;  //  3
  // ---------------------------------------
  std::cout << vec1.size() << std::endl;  //  3
  std::cout << vec1.capacity() << std::endl;  //  4
  vec1.reserve(5);
  std::cout << vec1.capacity() << std::endl;  //  5
  vec1.resize(6, 0);  //  사이즈가 더 커질 경우 빈자리를 0으로 초기화
  std::cout << vec1.at(5) << std::endl; //  0
  std::cout << vec1.size() << std::endl;  //  6
  std::cout << vec1.capacity() << std::endl;  //  6
  vec1.resize(3);
  std::cout << vec1.size() << std::endl;  //  3
  std::cout << vec1.capacity() << std::endl;  //  6

  vec1.swap(vec2);
  std::cout << vec1.empty() << std::endl; //  1
  vec2.clear();
  std::cout << vec1.empty() << std::endl; //  1
  // ---------------------------------------
  vec1.insert(vec1.begin(), 1);  //  1을 begin 위치에 삽입
  vec1.insert(vec1.begin(), 3, 5);  //  5를 begin 위치에 3개 삽입
  for (int i: vec1) {
    std::cout << i << " ";
  }
  std::cout << std::endl;  //  5 5 5 1

  vec1.erase(vec1.end()-1);

  for (int i: vec1) {
    std::cout << i << " ";
  }
  std::cout << std::endl;  //  5 5 5
}
```

___

### std::vector 컨테이너 주의 사항

`vector`의 경우 동적 배열이기 때문에   
해당 용량 이상으로 원소를 추가하면 자동으로 용량을 증가시킨다.

하지만 엄밀히 말하면 "증가시킨다"는 개념이 아니다.

> `vector`의 용량을 증가시키는 과정
> * 새로운 메모리에 더 큰 용량을 할당한다.
> * 현재 vector를 새롭게 할당된 메모리에 복사한다.
> * 현재 vector의 메모리를 삭제한다.

때문에 `reserve`를 통해 용량을 미리 할당하여   
비효율적인 재할당 연산을 최소화 할 수 있다.

## std::deque 컨테이너

`deque`는 `vector`의 단점을 보완하기 위해 만들어진 컨테이너이다.

> `vector`는 메모리를 재할당 할 때 새롭게 메모리를 할당한다.   
때문에 성능이 저하된다는 단점이 있지만,   
`deque`는 여러 메모리를 할당하여 하나의 블럭처럼 사용하여   
이러한 단점을 보완한다.

`deque`컨테이너를 사용하려면 \<deque> 라이브러리를 `include`해야 한다.

```cpp
template<typename T>
class deque
{};
```

`deque`는 여러 배열을 가진다고 보면 된다.

![deque](/images/stl-image/deque.png)


### std::deque 메서드

* assign : n 개의 원소를 m 의 값으로 원소 할당
* clear : 모든 원소 제거
* push_front : 첫 원소의 앞에 원소 삽입
* push_back : 마지막 원소의 뒤에 원소 삽입
* pop_front : 첫 원소 제거
* pop_back : 마지막 원소 제거
* insert : 해당 위치에 값을 삽입하고, iterator 를 반환
* empty : 비어있으면 true 를 반환
* size : 사이즈를 반환

이외의 여러 메서드가 존재하며, `vector`와 거의 동일하다.

### std::vector 사용

```cpp
#include <deque>

int main()
{
  std::deque<int> nums;
  nums.assign(2, 3);
  nums.push_front(0);
  nums.push_back(4);
  for (std::deque<int>::iterator iter = nums.begin(); iter != nums.end(); ++iter) {
    std::cout << *iter << ","; //  0,3,3,4,
  }
  std::cout << std::endl;

  std::cout << nums.at(2) << std::endl; //  3

  std::cout << nums.size() << std::endl;  //  4

  nums.clear();
  std::cout.setf(std::ios_base::boolalpha);
  std::cout << nums.empty() << std::endl; //  true
}
```

## std::list 컨테이너

`list`는 `doubly linked list` 구조의 노드 기반 컨테이너이다.

```cpp
template<typename T>
class list
{};
```

해당 원소에 접근하기 위한 첨자`[]`나 `at`메서드를 사용하지 못하고,   
양 방향으로 반복자를 사용해 탐색한다.

첫 노드부터 순서대로 접근해야하므로 시간 복잡도를 지원하지 않는다.

![list](/images/stl-image/list.png)

> `deque`처럼 양방향으로 삽입 및 삭제가 가능하며,   
특성은 다른 컨테이너들과 비슷하다.

### std::list 메서드

* remove : 해당 값과 같은 원소를 모두 제거
* remove_if : 단항 조건에 해당하는 원소를 모두 제거
* reverse : 컨테이너의 원소 순서를 뒤집음
* sort : 원소를 정렬
* splice : 원소를 잘라 붙인다.
* unique : 인접한 원소가 같으면 유일하게 만들고 나머지 삭제
* merge :  정렬된 두 개의 std::list 를 합병

나머지 메서드는 다른 컨테이너들과 비슷하다.

### std::list 사용

```cpp
#include <list>

bool func(int n)
{
  return n == 3;
}

int main()
{
  std::list<int> list {1, 2, 3};
  list.push_back(1);
  list.push_back(2);
  list.push_back(3);
  list.push_back(5);
  list.push_back(5);

  //  reverse
  list.reverse();
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  5 5 3 2 1 3 2 1

  //  sort
  list.sort();
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 1 2 2 3 3 5 5

  //  remove
  list.remove(2);
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 3 1 3 5 5

  list.remove_if(func);
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 1 5 5

  //  splice
  std::list<int> list2 {10, 20, 30};
  std::list<int>::iterator it = list.begin();
  list.splice(++it, list2);
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 10 20 30 1 5 5

  //  merge
  list2.push_back(2);
  list2.push_back(3);
  list.sort();
  list.merge(list2);
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 1 2 3 5 5 10 20 30

  //  unique
  list.unique();
  for(std::list<int>::iterator iter = list.begin(); iter != list.end(); ++iter){
    std::cout <<*iter << " ";
  }
  std::cout << std::endl;   //  1 2 3 5 10 20 30
}
```