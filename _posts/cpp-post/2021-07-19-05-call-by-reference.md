---
title: "[C++] 참조에 의한 전달 (Reference)"
excerpt: "인수 전달의 세 가지 중 참조에 의한 전달에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true

last_modified_at: 2021-07-19
---

값에 의한 전달은 큰 데이터를 전달할 경우 복사의 비용이 크고,   
데이터를 반환하는 것이 아니면 값을 변경할 수 없다.

주소에 의한 전달은 값의 변경은 가능하지만 역참조(`*`)의 속도 저하가 있을 수 있으며,   
주솟값을 전달해야하는 불편함이 따른다.

<mark style="background-color: #3e3e3e; color: orange;">참조에 의한 전달</mark>은 이러한 단점들을 보완한 방법이라고 볼 수 있다.

변수를 복사하지 않고 전달하며, 역참조(`*`)를 할 필요도 없고, 값의 변경도 가능하다.

```cpp
void swap(int &a, int &b)
{
  int temp = a;
  a = b;
  b = temp;
}

int main()
{
  int num1 = 10;
  int num2 = 5;

  std::cout << num1 << std::endl;  //  10
  std::cout << num2 << std::endl;  //  5  

  swap(num1, num2);

  std::cout << num1 << std::endl;  //  5
  std::cout << num2 << std::endl;  //  10
}
```

<mark style="background-color: #3e3e3e; color: orange;">참조에 의한 전달</mark>은 값의 전달과 사용하는 모습이 동일하다.

대신 매개 변수를 참조형 변수로 선언한다.

___

참조에 의한 전달도 함수 내에서 값을 변경하지 못하도록 `const`를 사용하여 보장할 수 있다.

```cpp
void print(const int &n)
{
  std::cout << n << std::endl;
}

int main()
{
  int num = 10;
  
  print(num); //  10
}
```

매개 변수를 `const`를 사용하여 값을 변경하지 못하도록 하며,   
개발자가 값을 변경하지 않는 함수라는 것을 빠르게 인식할 수 있는 장점도 있다.

## 포인터의 참조 전달

포인터를 참조로 전달하고, 함수에서 포인터의 주소를 변경할 수 있다.

```cpp
void func(int *&n)
{
  n = nullptr;
}

int main()
{
  int num = 10;
  int *ptr = &num;

  func(ptr);

  if (ptr)
    std::cout << *ptr << std::endl;
  else
    std::cout << "null pointer" << std::endl;
}

//  null pointer
```

___

포인터를 참조로 전달할 수 있다는 점을 이용하여 배열을 전달할 수 있다.   
(배열의 크기를 같이 전달해야 한다.)

```cpp
void func(int (&arr)[4])
{
  int size = (sizeof(arr)/sizeof(arr[0]));
  for (int i = 0; i < size; i++) {
    std::cout << arr[i] << " ";
  }
  std::cout << std::endl;
}

int main()
{
  int arr[] = {1,2,3,4};

  func(arr);  //  1 2 3 4
}
```

___

또한 범위 기반의 `for`문은 반복자에 배열의 원소를 복사하는 것이다.   
값에 의한 전달과 동일하게 값을 변경할 수 없다.

하지만 반복자를 참조형 변수로 변경하여 값을 변경할 수 있다.

```cpp
int num[] = {1, 2, 3, 4};

for (int &n : num) {
  n = 0;
}

for (int n : num) {
  std::cout << n << " ";
}
std::cout << std::endl;

//  0 0 0 0
```

참조에 의한 전달의 장점은 인수로 전달받은 값을 변경할 수 있고,   
`const`를 통해 변경하지 않도록 보장할 수도 있다.   
또한 값이 전달될 때 복사하지 않기 때문에 큰 데이터도 빠르게 전달이 가능하며,   
주소에 의한 전달처럼 null 값에 대해 걱정하지 않아도 된다.

단점으로는 전달되는 값이 일반 변수여야 한다는 점이다.

주소에 의한 전달과 참조에 의한 전달은 거의 비슷하지만,   
참조에 의한 전달이 조금 더 안전하다고 한다.