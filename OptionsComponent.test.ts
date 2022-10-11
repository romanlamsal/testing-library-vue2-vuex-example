import {afterEach, describe, expect, it} from "vitest"
import Vue from "vue"
import Vuex from "vuex"
import {fireEvent, render, cleanup} from "@testing-library/vue"
import OptionsComponent from "./OptionsComponent.vue"

Vue.use(Vuex)

const createStore = () => new Vuex.Store({
  state: {
    foo: null as any,
  },
  mutations: {
    foo(state, newFoo) {
      state.foo = newFoo
    }
  }
})

afterEach(() => {
  cleanup()
})

describe("$store.commit in the component warns about 'unknown mutation type: foo'", () => {
  it("store directly in options gives the warning and won't function properly", async () => {
    // given
    const store = createStore()
    const rendered = render(OptionsComponent, { store })

    // when
    await fireEvent.click(rendered.getByRole("button"))

    // then
    expect(store.state.foo).toEqual("amazing foo")
  })

  it("$store in options.mock does not give a warning", async () => {
    // given
    const store = createStore()
    const rendered = render(OptionsComponent, { mocks: { $store: store } })

    // when
    await fireEvent.click(rendered.getByRole("button"))

    // then
    expect(store.state.foo).toEqual("amazing foo")
  })
})

it("mapState works like expected", () => {
  // given
  const store = createStore()
  const newFoo = "bar";
  store.state.foo = newFoo

  // when
  const rendered = render(OptionsComponent, { store })

  // then
  expect(rendered.getByText(newFoo)).toBeTruthy()
})
