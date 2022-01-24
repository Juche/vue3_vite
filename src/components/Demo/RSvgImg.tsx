import { defineComponent } from 'vue';

export const RenderSvg = defineComponent({
  props: {
    svgSrc: {
      type: String,
      default: '',
    },
    svgId: {
      type: String,
      default: '',
    },
  },
  emits: ['svg-play'],
  setup({ svgSrc, svgId }, { emit }) {
    function emitSvgPlay() {
      emit('svg-play');
      console.log(`🚀 ~ emitSvgPlay ~ svg-play`);
    }
    return () => <div id={svgId} onClick={emitSvgPlay} />;
  },
});
