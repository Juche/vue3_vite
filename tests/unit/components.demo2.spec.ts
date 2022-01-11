import { shallowMount } from "@vue/test-utils"

import CompositionApi from "/@/components/Demo/CompositionApi.vue"

describe("CompositionApi", () => {
  it("renders a message", () => {
    const wrapper = shallowMount(CompositionApi, {
      propsData: {
        message: "Testing the composition API"
      }
    })

    // wrapper.find('button').trigger('click')
    // await wrapper.vm.$nextTick()

    console.log(`🚀 ~ it ~ wrapper.find(".message").text()`, wrapper.find(".message").text())

    expect(wrapper.find(".message").text()).toBe("TESTING THE COMPOSITION API")
  })
})
