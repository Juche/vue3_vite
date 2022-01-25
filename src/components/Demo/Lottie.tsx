import { computed, defineComponent, onMounted, StyleValue } from 'vue';
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

    function suspendFun() {
      _lottie?.pause();
    }
    function startFun() {
      _lottie?.play();
    }

    onMounted(() => {
      const ctn = document.getElementById('lottie');
      _lottie = lottie.loadAnimation({ ...props.option, container: ctn });
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
