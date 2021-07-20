---
title: "[C++] 포인터와 배열 그리고 인덱싱"
excerpt: "포인터와 배열의 관계를 알아보고 어떻게 배열을 인덱싱하는지 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 포인터, 배열]

toc: true
toc_sticky: true

last_modified_at: 2021-07-17
---

포인터와 배열은 매우 긴밀한 관계를 가진다. (수행하는 것이 동일하다.)

```cpp
int array[] = {1,2,3,4,5};

std::cout << array << std::endl;  // 배열의 첫 요소의 주솟값

std::cout << *array << std::endl; //  1
```

배열의 식별자(이름)는 배열의 첫 원소의 주소를 반환한다.   
이는 포인터처럼 역참조(`*`)하면 주소에 저장된 값 즉, 첫 원소의 값에 접근할 수 있다.

```cpp
int num[] {1, 2, 3};
int *ptr = num;
```

이러한 구조 때문에 배열을 포인터로 가리킬 때에는 주소 연산자(`&`)를 사용하지 않아도 된다.

## 포인터와 배열의 크기

```cpp
int num[] {1, 2, 3};
int *ptr = num;

std::cout << sizeof(num) << std::endl;  //  12
std::cout << sizeof(ptr) << std::endl;  //  8
```

포인터와 배열은 수행하는 것이 같지만 크기는 다르다.

배열의 크기는 배열의 전체 메모리 크기를 반환하지만   
포인터는 포인터 자체의 크기만 반환한다.   
(64비트 운영체제 사용)

## 포인터의 연산

포인터의 연산 특성을 이용하여 배열을 표현할 수 있다.

```cpp
int nums[] = {1, 2, 3};
int *ptr = nums;

std::cout << *nums << std::endl;  //  1
std::cout << *(nums+1) << std::endl;  //  2
std::cout << *(nums+2) << std::endl;  //  3
```

배열은 메모리에 자료형의 크기만큼씩 차례로 배치되어 있다.   
포인터에 정수를 더하면 자료형의 크기만큼 포인터가 이동하며,   
각 인덱스를 가리킨다는 것을 알 수 있다.   

여기서 주의할 점은 `*`연산자가 `+`연산자보다 우선순위가 높기 때문에   
포인터의 역참조를 하기 전에 괄호로 묶어줘야한다.

___

```cpp
int nums[] {1, 2, 3};
int *ptr = nums;

std::cout << ptr[0] << std::endl; //  1
std::cout << ptr[1] << std::endl; //  2
std::cout << ptr[2] << std::endl; //  3
```

array[i] 는 *(array+i) 과 같다.

따라서 배열을 가리키는 포인터를 배열처럼 첨자[ ]를 사용하여 인덱싱 할 수 있다.