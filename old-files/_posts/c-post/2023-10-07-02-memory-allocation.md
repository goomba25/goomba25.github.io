---
title: "[C/C++] 메모리 동적 할당 malloc, calloc, realloc"
excerpt: ""

categories:
  - C
tags:
  - [C, Cpp]
toc: true
toc_sticky: true

last_modified_at: 2023-10-07
---

동적 할당은 컴파일 타임이 아닌 런타임에 메모리 공간을 할당하는 것을 말합니다.   
c 언어에서 대표적으로 사용하는 malloc과 calloc, realloc을 정리했습니다.

공통적으로 `stdlib.h` 헤더에 포함됩니다.

## malloc

메모리의 크기를 바이트 단위로 할당하는 함수입니다. (**Heap 영역**)   
할당에 실패할 경우 NULL을 반환합니다.

```c
void* malloc(size_t size)
```

- `size_t size` : 할당할 메모리의 크기

단순히 메모리를 할당하는 함수로, 데이터의 형태를 사용자가 직접 정할 수 있도록 생성되어 있습니다.

- 예시
    
    ```c
    int* i = (int*) malloc(sizeof(int));
    ```

## calloc

형태가 조금 다를 뿐 malloc과 동일한 기능을 가지는 함수입니다.

```c
void* calloc(size_t n, size_t size)
```

- `size_t n` : 할당할 메모리의 크기
- `size_t size` : 각 요소의 크기

malloc은 할당된 메모리를 초기화하지 않고 쓰레기 값이 들어있는 반면,   
calloc은 할당과 동시에 모두 초기화 시킵니다.

- 예시
    
    ```c
    char* m_ptr = (char*)malloc(sizeof(char) * 10);
    char* c_ptr = (char*)calloc(10, sizeof(char));
    ```

## realloc

`malloc`, `calloc을` 사용하여 할당된 메모리의 크기를 늘이거나 줄일 때 사용하는 함수입니다.

```c
void* realloc(void* p, size_t size)
```

- `void* p` : 메모리가 할당된 포인터
- `size_t size` : 할당할 메모리의 크기

- 예시
    
    ```c
    char* ptr = (char*)malloc(sizeof(char) * 10);
    ptr = (char*)realloc(ptr, 12);
    ```

## free

힙 영역에 할당된 메모리를 해제하는 함수입니다.

```c
void free(void* ptr)
```

- `void* ptr` : 할당 해제할 포인터

메모리를 할당만 하고 해제하지 않는다면 메모리 누수가 발생합니다.   
따라서 사용하지 않을 때 반드시 해제해야만 합니다.   
(개발자의 실수가 발생하기 쉬운 지점일 수 있다.)

- 예시
    
    ```c
    int* m_ptr = (int*) malloc(sizeof(int) * 3);
    char* c_ptr = (char*) calloc(5, sizeof(char));
    m_ptr = (int*)realloc(m_ptr, 7);
    ...
    
    free(m_ptr);
    free(c_ptr);
    ```