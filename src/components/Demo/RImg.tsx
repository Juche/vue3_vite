import { defineComponent } from 'vue';

export const RenderImg = defineComponent({
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
  },
  emits: ['img-play'],
  setup({ imgSrc }, { emit }) {
    function emitPlay() {
      emit('img-play');
      console.log(`🚀 ~ emitPlay ~ img-play`);
    }
    return () => <img src={imgSrc} onClick={emitPlay} />;
  },
});

// const renderImg = () => {
//   return <img src={hiThere} alt="" />;
// };
