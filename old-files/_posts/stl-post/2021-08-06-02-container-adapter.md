---
title: "[C++] Container Adapter (컨테이너 어댑터)"
excerpt: ""

categories:
  - STL
tags:
  - [Cpp, Container]

toc: true
toc_sticky: true

last_modified_at: 2021-08-06
---

<mark style="background-color: #3e3e3e; color: orange;">Container Adapter</mark>는 반복자를 지원하지 않는   
기능이 제한되거나 변형된 컨테이너를 말한다.

이는 다른 컨테이너 객체에 특정 작업을 수행하도록 돕는 기능을 가진다.

> Container Adapter의 종류
> * stack
> * queue
> * priority_queue

## stack (스택)

`stack`은 `vector`클래스를 기반으로 하는 컨테이너이다.

`LIFO`(Last In First Out)의 메모리 구조를 가지기 때문에   
삽입과 삭제가 모두 한 쪽에서 이루어진다.

`stack`을 사용하려면 \<stack> 라이브러리를 `include`해야 한다.

> DFS 깊이 우선 탐색에 사용

### stack 주요 메서드

* `size` : 원소 갯수를 반환   
* `empty` : 스택이 비어있으면 `true`를 반환   
* `top` : 가장 나중에 들어온 (가장 위의) 원소를 반환   
* `push` : 원소를 삽입    
* `pop` : `top`에 위치한 원소를 삭제

### stack 사용 예시

```cpp
#include <stack>

int main()
{
  std::stack<int> stack;

  std::cout << stack.size() << std::endl;   //  0

  stack.push(10);
  stack.push(1);
  stack.push(9);
  stack.push(180);

  std::cout << stack.top() << std::endl;  //  180
  stack.pop();
  std::cout << stack.top() << std::endl;  //  9
}
```

`stack`을 비우려면 `clear`메서드가 없기 때문에 `pop`을 통해 모두 제거해야한다.

## queue (큐)

`queue`는 `deque`클래스를 기반으로 하는 컨테이너이다.

`FIFO`(First In First Out)의 메모리 구조를 가지기 때문에   
가장 먼저 저장된 원소가 가장 먼저 인출되는 구조이다.

`queue`를 사용하려면 \<queue>라이브러리를 `include`해야 한다.

> BFS 너비 우선 탐색에 사용

### queue 주요 메서드

* `front` : 가장 먼저 저장된(맨 앞의) 원소를 반환
* `back` : 가장 나중에 저장된(맨 뒤의) 원소를 반환
* `size` : 원소 갯수를 반환   
* `empty` : 스택이 비어있으면 `true`를 반환   
* `push` : 원소를 삽입    
* `pop` : `front`에 위치한 원소를 삭제

### queue 사용 예시

```cpp
#include <queue>

int main()
{
  std::queue<int> q;

  q.push(10);
  q.push(1);
  q.push(77);
  q.push(100);

  std::cout << q.front() << std::endl;  //  10
  std::cout << q.back() << std::endl;   //  100

  q.pop();

  std::cout << q.front() << std::endl;  //  1
}
```

## priority_queue (우선 순위 큐)

`queue`와 달리 가장 큰 값이 맨 앞에 위치하게 된다.   
즉, 원소가 내림차순으로 정렬된다.

또한 `deque`가 아닌 `vector`클래스가 기반인 컨테이너이다.

하지만 동일하게 \<queue>라이브러리에 정의되어 있다.

```cpp
#include <queue>

int main()
{
  std::priority_queue<int> pq;

  pq.push(10);
  pq.push(1);
  pq.push(77);
  pq.push(100);

  std::cout << pq.top() << std::endl; //  100

  pq.pop();

  std::cout << pq.top() << std::endl; //  77
}
```

* `push`, `pop`의 경우 logN 시간이 소요된다.
* `queue`와 거의 동일한 메서드를 가지지만   
`front`, `back`을 사용하지 않고 `top`을 사용한다.