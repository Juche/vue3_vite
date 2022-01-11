import { shallowMount } from '@vue/test-utils';
import CompositionApi from '/@/components/Demo/CompositionApi.vue';
// console.log(`🚀 ~ CompositionApi`, CompositionApi);

describe('CompositionApi.vue', () => {
  it('props.message toUpperCase', () => {
    const message = 'Testing the composition API';
    const wrapper = shallowMount(CompositionApi, {
      props: { message },
    });

    // expect(wrapper.text()).toMatch(message);
    expect(wrapper.find('.message').text()).toBe('TESTING THE COMPOSITION API');
  });
});
