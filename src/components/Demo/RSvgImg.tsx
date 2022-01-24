import { defineComponent, onMounted } from 'vue';
import Vivus from 'vivus';

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
    let vivusSvg: { reset: () => { (): any; new (): any; play: { (): void; new (): any } } };

    function emitSvgPlay() {
      vivusSvg.reset().play();
      emit('svg-play');
    }

    onMounted(() => {
      // new Vivus('my-div', { duration: 200, file: 'link/to/my.svg' }, myCallback);
      vivusSvg = new Vivus(
        svgId,
        {
          type: 'scenario-sync',
          duration: 20,
          start: 'autostart',
          dashGap: 20,
          forceRender: false,
          file: svgSrc,
        },
        function () {
          if (window.console) {
            console.log('Animation finished. [log triggered from callback]');
          }
        },
      );
    });

    return () => <div id={svgId} onClick={emitSvgPlay} />;
  },
});
