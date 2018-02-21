> 💁 TLDR; If you want ot use [`redux-observable`](https://github.com/redux-observable/redux-observable) but use [`stream-lite`](https://github.com/pshev/stream-lite) instead of [`RxJS`](https://github.com/ReactiveX/RxJS) you might want to check out this library.

<br/>

If you use `stream-lite` instead of `RxJS` and also use [`redux`](https://github.com/reactjs/redux), 
you might want to handle your async actions with something like `redux-observable`.
While `redux-observable` allows you to write an adapter to convert Rx Observables to your preferred stream library, internally it still uses `RxJS` which brings unnecessary weight into your project.

<br/>

This package export the same API as [`redux-observable`](https://github.com/redux-observable/redux-observable) except: 1) no the support for adapters. 2) `toPayload` pipeable operator is included.
