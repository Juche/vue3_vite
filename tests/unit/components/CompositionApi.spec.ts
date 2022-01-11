import { shallowMount } from '@vue/test-utils';
import CompositionApi from '/@/components/Demo/CompositionApi.vue';
// console.log(`🚀 ~ CompositionApi`, CompositionApi);

describe('CompositionApi.vue', () => {
  const message = 'Testing the composition API';
  const wrapper = shallowMount(CompositionApi, {
    props: { message },
  });

  it('props.message toUpperCase', () => {
    // expect(wrapper.text()).toMatch(message);
    expect(wrapper.find('.message').text()).toBe('TESTING THE COMPOSITION API');
  });

  it('data.count add 1', async () => {
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.count').text()).toBe('Count: 1');
  });
});
