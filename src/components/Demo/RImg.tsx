import { defineComponent } from 'vue';
import hiThere from '/@/assets/svg/hi-there.svg';

export const RenderImg = defineComponent({
  setup() {
    return () => <img src={hiThere} />;
  },
});

// const renderImg = () => {
//   return <img src={hiThere} alt="" />;
// };
