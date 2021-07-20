---
title: "[C++] 주소(포인터)에 의한 전달 (Address)"
excerpt: "인수 전달의 세 가지 중 주소에 의한 전달에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-19
---

<mark style="background-color: #3e3e3e; color: orange;">주소에 의한 전달</mark>은 함수의 인수로 주소를 전달해준다.   
주솟값을 전달 받기 때문에 함수는 이를 `포인터`로 받아야한다.

함수의 내부에서는 이를 역참조(`*`)하여 값에 접근할 수 있다.

```cpp
void swap(int *a, int *b)
{
  int temp = a;
  *a = *b;
  *b = temp;
}

int main()
{
  int num1 = 10;
  int num2 = 5;

  swap(&num1, &num2);

  std::cout << num1 << std::endl;  //  5
  std::cout << num2 << std::endl;  //  10
}
```

두 정수를 교환하는 `swap`함수에서 인수를 주솟값으로 받았기 때문에 실제 값의 변경이 가능하다.

___

일반적인 주소의 전달은 값이 변경되지 않는 것을 보장하지 못한다.   
따라서 매개 변수를 `const`로 선언하여 함수 내에서 전달받은 인수를   
변경하지 못하도록 보장할 수 있다.

```cpp
void print(const int *n)
{
  std::cout << *n << std::endl;
}

int main()
{
  int num = 10;
  
  print(&num);  //  10
}
```

내부에서 변경하려는 시도를 하면, 에러를 발생시킨다.

## 주소에 의한 전달과 배열

<mark style="background-color: #3e3e3e; color: orange;">주소에 의한 전달</mark>은 배열과 함께 쓰이는 경우가 많다고 한다.

```cpp
void print(const int *arr, int size)
{
  for (int i = 0; i < size; i++) {
    std::cout << arr[i] <<  " ";
  }
  std::cout << std::endl;
}

int main()
{
  int array[] {1,2,3,4,5};

  print(array, 5);
}
```

배열을 출력하는 함수 `print`는 내부에서 전달받은 인수를 변경하지 못하도록 `const` 매개 변수를 사용했다.

또한 인수로 전달하는 배열은 포인터로 변환하면 길이를 알 수 없으므로 길이를 함께 전달했다.

___

주소에 의한 전달을 사용할 때 주의할 점은 매개 변수를 역참조(`*`)하기 전에   
널 포인터인지 확인해야 한다는 것이다.

널 포인터를 역참조(`*`)하게 되면 프로그램이 중단된다. 때문에 항상 확인하는 작업을 수행하도록 하자.

```cpp
void print(const int *arr, int size)
{
  if (!arr)
    return;
  else {
    for (int i = 0; i < size; i++) {
      std::cout << arr[i] <<  " ";
    }
    std::cout << std::endl;
  }
}

int main()
{
  int array[] {1,2,3,4,5};

  print(array, 5);
}

//  1 2 3 4 5
```

매개 변수가 널 포인터가 아니므로 전달된 사이즈만큼 출력된다.

___

주소에 의한 전달의 장점은 전달받은 인수의 값을 변경할 수 있으며,   
복사를 진행하지 않기 때문에 비용이 추가로 들지 않게 된다.

대신 리터럴이나 표현식 형태 그대로 전달하는 것이 불가능하며,   
null 값을 전달받을 경우 프로그램이 중단되는 단점이 있다.   
또한 복사를 진행하지 않지만 값에 접근할 때 역참조(`*`)를 해야하므로 속도가 조금 느리다고 한다.