---
title: "[Flutter] Bloc 패키지를 사용해보기"
excerpt: "Bloc 패키지를 사용해보자."
classes: wide
toc: true
toc_sticky: true
categories:
  - Flutter
tags:
  - [Flutter]
last_modified_at: 2022-04-22
---

<mark style="background-color: #2e2e2e; color: orange;">Bloc</mark>을 `Stream`을 사용하여 직접 구현하는 일은 생각보다 어렵습니다.

이 <mark style="background-color: #2e2e2e; color: orange;">Bloc 패키지</mark>는 BLoc을 사용하기 쉽게 구현해놓은 패키지입니다.

> Bloc을 상속(?)하는 패키지가 여럿 있습니다.   
> * flutter_bloc
> * angular_bloc
> * bloc_concurrency
> * ...
> 
> BLoc과 flutter_bloc의 차이는 UI계층에서 사용할 요소가 포함되어 있다고 합니다.   
따라서 둘 다 사용하되, UI는 flutter_bloc을 사용하면 될 것 같습니다.

# 패키지 설치

```bash
$ flutter pub add bloc
$ flutter pub add flutter_bloc
```

또는 dependencies 추가

```
dependencies:
	bloc: ^8.x.x
	flutter_bloc: ^8.x.x
```

# Bloc 패키지

## Cubit

![image](/images/flutter-image/cubit_image.png)

Stream을 통해 구현된, Bloc을 쉽게 사용할 수 있도록 만든 클래스입니다.

* 메서드를 통해 상태를 변경합니다.

(*TMI. Cubit과 Bloc에 의해 구현된 것이 BlocBase 입니다.*)

```dart
// example
class CountCubit extends Cubit<int> {
	CountCubit() : super(0);
	//  CountCubit(int initialState) : super(initialState);

	increment() => emit(state + 1);
  decrement() => emit(state - 1);
}
```

* 원래는 Cubit<dynamic>입니다. (따라서 명시하지 않아도 됩니다.)   
Cubit의 State 타입을 명시할 수도 있습니다.

* emit을 사용하여 상태 변경이 가능합니다.

* onChange, onError 등의 로그를 사용할 수 있는 메서드가 있습니다.

> Cubit의 장점은 이벤트 처리가 따로 필요 없고,   
> C/C++에서 클래스 멤버와 멤버 함수를 사용하듯 함수만 호출하면 사용할 수 있다는 것입니다.   
> 반대로 말하면 이벤트 처리를 할 수 없다는 말이기도 합니다.

### 사용 방법

생성한 Cubit을 사용하는 방법은 간단합니다.

1. 먼저 MaterialApp을 BlocProvider로 선언해서   
해당 위젯의 하위 위젯에서 Bloc에 접근이 가능하게 만들어줍니다. (Bloc과 Cubit 동일)

  ```dart
  @override
  Widget build(BuildContext context) {
    return BlocProvider<CountCubit>(
      create: (context) => CountCubit(),
      child: const MaterialApp(
        home: Home(),
      ),
    );
  }
  ```

  * 여러 Cubit을 사용하려면 **MultiBlocProvider**를 사용합니다.

2. BlocBuilder는 Cubit의 업데이트를 감지하고, 데이터가 업데이트 될 수 있도록 합니다.

  ```dart
  BlocBuilder<CountCubit, int>(
    builder: (context, state) {
      return Text(
        '$state',
        textScaleFactor: 2.0,
      );
    },
  )
  ```

  * builder 프로퍼티의 state가 Stream으로 전달되는 데이터입니다.   
  (state를 원하는 명칭으로 변경하셔도 됩니다.)

3. Cubit의 데이터를 변경하려고 함수를 호출하는 경우에는   
**BlocProvider.of<Cubit>(context)**로 Cubit에 접근하거나 변수를 생성하여 접근하시면 됩니다.

  ```dart
  BlocBuilder<CountCubit, int>(
    builder: (context, state) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          ElevatedButton(
            child: const Icon(Icons.add),
            onPressed: () {
              BlocProvider.of<CountCubit>(context, listen: false)
                  .increment();
            },
          ),
          const SizedBox(width: 20),
          ElevatedButton(
            child: const Icon(Icons.remove),
            onPressed: () {
              BlocProvider.of<CountCubit>(context, listen: false)
                  .decrement();
            },
          ),
        ],
      );
    },
  )
  ```

  * `listen: false`는 해당 함수가 호출되어도 위젯을 업데이트 하지 않겠다는 표시입니다.

  * 원래는 build를 호출하여 위젯이 업데이트 됩니다.

4. Cubit 내에서 데이터의 변화를 확인할 수 있는 onChange, onError 등의 메서드를 제공합니다.

  ```dart
  @override
  void onChange(Change<int> change) {
    super.onChange(change);
    print(change);        //    change 로그를 확인
  }

  -------------------
  I/flutter (26274): Change { currentState: 0, nextState: -1 }
  I/flutter (26274): Change { currentState: -1, nextState: -2 }
  I/flutter (26274): Change { currentState: -2, nextState: -3 }
  I/flutter (26274): Change { currentState: -3, nextState: -4 }
  I/flutter (26274): Change { currentState: -4, nextState: -5 }
  I/flutter (26274): Change { currentState: -5, nextState: -6 }
  I/flutter (26274): Change { currentState: -6, nextState: -7 }
  I/flutter (26274): Change { currentState: -7, nextState: -8 }
  ...
  ```

### 샘플 (카운트 앱)

<details markdown="1">
<summary>count_cubit.dart</summary>

```dart
class CountCubit extends Cubit<int> {
  CountCubit() : super(0);

  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);

  @override
  void onChange(Change<int> change) {
    super.onChange(change);
    print(change);
  }
}
```

</details>


<details markdown="1">
<summary>main.dart</summary>

```dart
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);
    return BlocProvider<CountCubit>(
      create: (context) => CountCubit(),
      child: const MaterialApp(
        home: CubitScreen(),
      ),
    );
  }
}
```

</details>

<details markdown="1">
<summary>count_widget.dart</summary>

```dart
class CountWidget extends StatelessWidget {
  const CountWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CountCubit, int>(
      builder: (context, state) {
        return Text(
          '$state',
          textScaleFactor: 2.0,
        );
      },
    );
  }
}
```

</details>

<details markdown="1">
<summary>count_cubit_screen.dart</summary>

```dart
class CubitScreen extends StatelessWidget {
  const CubitScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Cubit"),
      ),
      body: const Center(
        child: CountWidget(),
      ),
      floatingActionButton: BlocBuilder<CountCubit, int>(
        builder: (context, state) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              ElevatedButton(
                child: const Icon(Icons.add),
                onPressed: () {
                  BlocProvider.of<CountCubit>(context, listen: false)
                      .increment();
                },
              ),
              const SizedBox(width: 20),
              ElevatedButton(
                child: const Icon(Icons.remove),
                onPressed: () {
                  BlocProvider.of<CountCubit>(context, listen: false)
                      .decrement();
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
```

</details>

## Bloc

![bloc](/images/flutter-image/bloc_image.png)

Cubit 클래스를 상속하는 클래스라고 합니다.   
기본적으로 Cubit과 동일한 기능을 가지지만 조금 다른 구조입니다.

* Cubit은 상태 변경 시 함수를 정의하고 호출하는 방식을 사용합니다.

* Bloc은 이벤트를 정의하고 이벤트로 핸들링하는 방식을 사용합니다. 따라서 좀 더 세밀한 처리가 가능합니다.

**Bloc**은 Cubit과 다르게 함수가 아닌 이벤트를 통해 사용합니다.

```dart
// example
abstract class CountEvent {}

class IncrementCount extends CountEvent {}

class DecrementCount extends CountEvent {}
```

* Bloc의 이벤트를 enum으로 정의하는 경우도 있는데, 기본적인 방법은 위와 같이 클래스로 정의하는 것이라고 합니다.

* 추상 클래스인 이벤트는 나중에 `Equatable`을 사용하여 정의하게 됩니다. (아직 다루지 않았습니다.)

### 사용 방법

이벤트에 대해 추가 내용도 없고, 이벤트 처리에 있어서도 간단하게 구현했기 때문에   
간단해 보이지만 나중에 이벤트/이벤트 처리 모두 복잡하게 정의될 수 있습니다.

1. `on<Event>`메서드를 사용하여 Bloc생성자에 이벤트 핸들러를 등록합니다.

  ```dart
  class CountBloc extends Bloc<CountEvent, int> {
    CountBloc() : super(0) {
      on<Increment>((event, emit) => emit(state + 1));
      on<Decrement>((event, emit) => emit(state - 1));
    }
  }
  ```

2. Cubit을 사용할 때와 동일하게 BlocProvider를 사용합니다.

  ```dart
  @override
  Widget build(BuildContext context) {
    return BlocProvider<CountBloc>(
      create: (context) => CountBloc(),
      child: const MaterialApp(
        home: Home(),
      ),
    );
  }
  ```

3. BlocBuilder를 통해 Bloc의 업데이트를 감지하고, 위젯을 업데이트 할 수 있도록 만들어줍니다.

  ```dart
  BlocBuilder<CountBloc, int>(
    builder: (context, state) {
      return Text(
        '$state',
        textScaleFactor: 2.0,
      );
    },
  )
  ```

4. Bloc의 데이터를 변경하려고 함수를 호출하는 경우에는 Cubit과 동일하게 **BlocProvider.of<Bloc>(content)**로 접근하거나 변수를 생성하여 접근합니다.

  ```dart
  @override
  Widget build(BuildContext context) {
    final _countBloc = BlocProvider.of<CountBloc>(context, listen: false);

  // 중략

    IconButton(
      icon: const Icon(Icons.add),
      onPressed: () {
        _countBloc.add(Increment());
      },
    ),
    IconButton(
      icon: const Icon(Icons.remove),
      onPressed: () {
        _countBloc.add(Decrement());
      },
    ),
  }
  ```

  * Cubit과 다르게 메서드를 직접 호출하지 않고 **add** 메서드를 사용하여 이벤트를 발생 시킵니다.

  * listen: false는 Bloc의 데이터가 업데이트 되어도 해당 위젯을 업데이트하지 않겠다는 표시입니다.   
  불필요한 re-build 비용을 줄일 수 있습니다.

  * 참고로 listen은 default로 false입니다.

5. Cubit과 동일하게 변화를 확인할 수 있는 메서드를 제공합니다. 하지만 Cubit과 다르게 onTransition 메서드를 추가로 제공합니다.

```dart
@override
void onChange(Change<int> change) {
  super.onChange(change);
  print(change);
}

@override
void onTransition(Transition<CountEvent, int> transition) {
  super.onTransition(transition);
  print(transition);
}

--------------------
I/flutter ( 8824): Transition { currentState: 0, event: Instance of 'Increment', nextState: 1 }
I/flutter ( 8824): Change { currentState: 0, nextState: 1 }
I/flutter ( 8824): Transition { currentState: 1, event: Instance of 'Increment', nextState: 2 }
I/flutter ( 8824): Change { currentState: 1, nextState: 2 }
```

* `onChange` 메서드를 통해 상태값의 변경을 확인합니다.

* `onTransition`메서드를 통해 발생된 이벤트를 확인 할 수 있습니다.

### 샘플 (카운트 앱)

<details markdown="1">
<summary>count_bloc.dart</summary>

```dart
abstract class CountEvent {}

class Increment extends CountEvent {}

class Decrement extends CountEvent {}

class CountBloc extends Bloc<CountEvent, int> {
  CountBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
    on<Decrement>((event, emit) => emit(state - 1));
  }

  @override
  void onChange(Change<int> change) {
    super.onChange(change);
    print(change);
  }

  @override
  void onTransition(Transition<CountEvent, int> transition) {
    super.onTransition(transition);
    print(transition);
  }
}
```

* Event, State, Bloc 세 부분으로 나누는 것이 일반적이라고 합니다.

* 여기서는 간단하기 때문에 나누지 않았습니다.

</details>

<details markdown="1">
<summary>main.dart</summary>

```dart
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);
    return BlocProvider<CountBloc>(
      create: (context) => CountBloc(),
      child: const MaterialApp(
        home: BlocScreen(),
      ),
    );
  }
}
```

</details>

<details markdown="1">
<summary>count_widget.dart</summary>

```dart
class CountWidget extends StatelessWidget {
  const CountWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CountBloc, int>(
      builder: (context, state) {
        return Text(
          '$state',
          textScaleFactor: 2.0,
        );
      },
    );
  }
}
```

</details>

<details markdown="1">
<summary>count_cubit_screen.dart</summary>

```dart
class BlocScreen extends StatelessWidget {
  const BlocScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
		final _countBloc = BlocProvider.of<CountBloc>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Cubit"),
      ),
      body: const Center(
        child: CountWidget(),
      ),
      floatingActionButton: BlocBuilder<CountBloc, int>(
        builder: (context, state) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              ElevatedButton(
                child: const Icon(Icons.add),
                onPressed: () {
									_countBloc.add(Increment());
                },
              ),
              const SizedBox(width: 20),
              ElevatedButton(
                child: const Icon(Icons.remove),
                onPressed: () {
									_countBloc.add(Decrement());
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
```

</details>

## Bloc vs Cubit

Cubit이 Bloc보다 lite하다고 보시면 됩니다.

Bloc이 좀 더 복잡한 데이터와 데이터 처리를 할 수 있다고 합니다.

> Cubit은 상태를 변경하기 위한 메서드만 정의하면 간단하게 사용할 수 있다는 장점이 있습니다.   
> 그에 비해 Bloc은 상태를 변경하기 위한 이벤트, 이벤트 핸들러 등을 정의해야 하기 때문에    
> Cubit에 비해 조금 복잡한 구조를 가집니다.   
> 하지만 Bloc은 상태값이 변경된 이유를 추적할 수 있고(onTransition),   
> 좀 더 복잡한 처리가 가능하다는 장점을 가집니다.   