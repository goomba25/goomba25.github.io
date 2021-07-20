---
title: "[C++] 인라인 함수 (inline)"
excerpt: "외부에 작성된 인스턴스 코드, 인라인 함수"

categories:
  - Cpp
tags:
  - [Cpp]

last_modified_at: 2021-07-20
---

함수의 호출 프로세스는 생각보다 복잡하다.

```
함수의 호출
→ 호출된 시점의 주소를 스택에 저장
→ 함수의 매개 변수를 스택에 저장
→ 함수를 실행
→ 함수를 종료
→ 함수의 반환값을 임시 저장소에 저장
→ 스택에 저장된 주솟값 반환
→ 호출된 시점으로 복귀
```

(이것보다 복잡하고 어렵다)   
이러한 복잡한 구조 때문에 함수는 호출할 때마다 어느정도의 오버헤드가 일어난다.   
따라서 내부에서 작성된 `인스턴스 코드`가 훨씬 빠르다.

함수의 장점과 인스턴스 코드의 장점을 합한 것이 <mark style="background-color: #3e3e3e; color: orange;">인라인 함수</mark>라고 볼 수 있다.

```cpp
inline int sum(int &a, int &b)
{
  return a+b;
}

int main()
{
  int num1 = 10;
  int num2 = 20;

  int result = sum(num1, num2);
  
  std::cout << result << std::endl; //  30
}
```

<mark style="background-color: #3e3e3e; color: orange;">인라인 함수</mark>는 `inline`키워드를 사용하여 함수를 선언하며,   
실행 시 컴파일러가 <mark style="background-color: #3e3e3e; color: orange;">인라인 함수</mark>를 내부의 코드로 복사한다.

즉, 함수의 호출과정이 사라진다. 때문에 오버헤드가 제거되고 실행 속도가 증가한다.

```cpp
/*
inline int sum(int &a, int &b)
{
  return a+b;
}
*/

int main()
{
  int num1 = 10;
  int num2 = 20;

  int result = num1+num2; //  sum 함수 내용
  
  std::cout << result << std::endl; //  30
}
```

주의할 점은 <mark style="background-color: #3e3e3e; color: orange;">인라인 함수</mark>는 내부의 코드로 복사되는 것과 같아서   
코드가 길어지는 현상을 초래할 수 있다.

따라서 내용이 길거나 자주 호출되는 함수외의 짧은 함수를 <mark style="background-color: #3e3e3e; color: orange;">인라인 함수</mark>로 만드는 것이 좋다.

___

현대의 컴파일러는 `inline`키워드를 사용하지 않아도 성능이 향상될 것으로 보이는   
함수를 자동으로 인라인화하여 `inline`키워드를 사용할 필요가 별로 없다고 한다.