# 'unknown mutation' when using vue2, @testing-library/vue@v5 and vuex@^3.6.2

Minimal reproduction of a potential bug. Includes tests.

## See for yourself

```sh
pnpm install && pnpm test
```

## Problem
When passing a store directly into `render` as option, all mutations are lost on Vue2 components.

```ts
// won't work
const store = new Vuex.Store({ mutations: { foo(){} }})
const rendered = render(Component, { store })

// in the component
$store.commit('foo') // -> "[vuex] unknown mutation type: foo"
```
When inspecting the `$store` instance in inside the component, you'll find `$store._mutations = {}`.

A fix is to pass the store not directly but as mock:

```ts
// will work
const store = new Vuex.Store({ mutations: { foo(){} }})
const rendered = render(Component, { mocks: { $store: store } })

// in the component
$store.commit('foo') // -> no warning, works properly
```

Oddly enough, `mapState` works in either case - so reading the state works either way.