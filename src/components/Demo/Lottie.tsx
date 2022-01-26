import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  StyleValue,
  watchEffect,
  watch,
  nextTick,
  PropType,
} from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

export const Lottie = defineComponent({
  name: 'Lottie',
  props: {
    option: {
      type: Object,
      default: () => ({
        renderer: 'svg',
        loop: true,
        path: '',
      }),
    },
  },
  setup(props) {
    let lottieAniItem: AnimationItem | null;
    // let lottieCtn: HTMLElement | null;

    function startAni() {
      lottieAniItem?.play();
    }
    function stopAni() {
      lottieAniItem?.stop();
    }
    function pauseAni() {
      lottieAniItem?.pause();
    }

    function loadLottie() {
      lottie.destroy();
      nextTick(() => {
        const lottieCtn = document.getElementById('lottie');
        lottieAniItem =
          lottieCtn && lottie.loadAnimation({ ...props.option, container: lottieCtn });
      });
    }

    onMounted(() => loadLottie());
    onUpdated(() => loadLottie());

    const boxStyle: StyleValue = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '200px',
      height: '300px',
      textAlign: 'center',
    };

    return () => (
      <div class="box" style={boxStyle}>
        {props.option.path ? <div id="lottie"></div> : <h2 class="empty">视图为空</h2>}
        <button onClick={startAni}>播放</button>
        <button onClick={pauseAni}>暂停</button>
        <button onClick={stopAni}>停止</button>
      </div>
    );
  },
});
