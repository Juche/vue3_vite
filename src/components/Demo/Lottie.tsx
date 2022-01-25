import { defineComponent, onMounted, StyleValue } from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

export const Lottie = defineComponent({
  name: 'Lottie',
  setup() {
    let _lottie: AnimationItem;

    function suspendFun() {
      _lottie?.pause();
    }
    function startFun() {
      _lottie?.play();
    }

    onMounted(() => {
      _lottie = lottie.loadAnimation({
        container: document.getElementById('lottie_box'),
        renderer: 'svg',
        loop: true,
        // path: '/src/assets/json/lottie/markus.json',
        // path: '/src/assets/json/lottie/bell.json',
        path: '/src/assets/json/lottie/email-sent.json',
        // path: '/src/assets/json/titanic/pause.json',
        // path: '/src/assets/json/titanic/checkbox.json',
        // path: '/src/assets/json/titanic/menu-close.json',
        // path: '/src/assets/json/titanic/heart.json',
        // path: '/src/assets/json/titanic/shield.json',
      });
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
        <div id="lottie_box"></div>
        <button onClick={startFun}>播放</button>
        <button onClick={suspendFun}>暂停</button>
      </div>
    );
  },
});
