import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  StyleValue,
  watchEffect,
  watch,
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
    let _lottie: AnimationItem;
    let lottieCtn: HTMLElement | null;

    function suspendFun() {
      _lottie?.pause();
    }
    function startFun() {
      _lottie?.play();
    }

    function loadLottie() {
      lottie.destroy();
      _lottie = lottieCtn && lottie.loadAnimation({ ...props.option, container: lottieCtn });
    }

    onMounted(() => {
      lottieCtn = document.getElementById('lottie');
      loadLottie();
    });
    onUpdated(() => {
      lottie.destroy();
      loadLottie();
    });

    const boxStyle: StyleValue = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '200px',
      height: '300px',
    };

    return () => (
      <div class="box" style={boxStyle}>
        {props.option.path ? <div id="lottie"></div> : <h2>视图为空</h2>}
        <button onClick={startFun}>播放</button>
        <button onClick={suspendFun}>暂停</button>
      </div>
    );
  },
});
