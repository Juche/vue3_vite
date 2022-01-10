<template>
  <div class="scroll-num" :style="{ 'justify-content': align }">
    <ul class="num-ul">
      <li
        :class="{
          list: true,
          'num-li': !isNaN(item),
          'symbol-li': isNaN(item),
        }"
        :style="numStyle"
        v-for="(item, index) in numList"
        :key="index"
      >
        <span class="num-col" v-if="!isNaN(item)">
          <i class="num-item" ref="numItem" :style="numTransition"
            >0123456789</i
          >
        </span>
        <!-- <span class="symbol negative" v-else-if="item === '-'">{{ item }}</span>
        <span class="symbol comma" v-else>{{ item }}</span> -->
        <span class="symbol" v-else
          ><i :class="item === '-' ? 'negative' : 'comma'">{{ item }}</i></span
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    number: {
      // 需要显示的数字
      type: Number,
      default: 0,
    },
    numLen: {
      // 显示几位数
      type: Number,
      default: 0,
    },
    format: {
      // 是否格式化
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: 'center',
    },
    duration: {
      // 动画时间
      type: String,
      default: '1s',
    },
    numStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      numList: [0], // 用于页面for循环展示的内容
      newNumPart: [], // 记录新数字的整数和小数位
      oldNumPart: [], // 记录旧数字的整数和小数位
      closeTransition: false, // 过度动画开关
    };
  },
  computed: {
    // TODO: ZC 可以考虑多一种切换方式(日历翻页 || 半翻页效果)
    // 提供更多定制项: 尺寸/字体/背景/配色...
    numTransition() {
      // let duration = this.closeTransition ? 0 : this.duration;
      return {
        transition: this.closeTransition
          ? 'none'
          : `transform ${this.duration} ease-in-out`,
      };
    },
  },
  watch: {
    number: {
      immediate: true,
      handler(val, oldVal) {
        // 临时关闭过度效果
        this.closeTransition = true;
        // this.oldNum = oldVal;
        let _numStr = Math.abs(val).toString();
        let _oldNumStr = Math.abs(oldVal).toString();
        this.newNumPart = _numStr.split('.');
        this.oldNumPart = _oldNumStr.split('.');

        // if(!!this.numLen)
        let _numLen = _numStr.length || 0;
        if (this.numLen) {
          // 考虑是小数得情况
          let isDecimal = _numStr.includes('.');
          let numLen = isDecimal ? this.numLen + 1 : this.numLen;
          // if(isDecimal) this.numLen += 1;
          if (_numLen < numLen) {
            // 长度不足前置补 0
            let _patch = '0'.repeat(numLen - _numLen);
            _numStr = _patch + _numStr;
          }
          if (_numLen > numLen) {
            // 长度超了截取低位
            _numStr.substr(-numLen);
          }
        }

        if (this.format) {
          let [_int, _dec] = _numStr.split('.');
          // 给整数位加上千分符 & 拼接上小数位
          // _numStr = _numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          _numStr =
            _int.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
            (_dec ? `.${_dec}` : '');
        }

        let _symbol = val >= 0 ? '' : '-'; // 判断是否为负数,为负号预留一个符号位
        _numStr = _symbol + _numStr;

        this.numList = _numStr.split('').map((item) => Number(item) || item);
        // 解决未设置数字长度时内容更新不准确的问题
        // this.setNumberTransform();
        this.$nextTick(() => {
          this.setNumberTransform();
        });
      },
    },
  },
  methods: {
    // 设置文字滚动
    setNumberTransform() {
      const numItems = this.$refs.numItem || []; // 拿到数字的ref，计算元素数量
      const numberArr = this.numList.filter((item) => !isNaN(item));

      // 新增数字位没有位移样式,不会有过渡动画
      // 这里做判断,给新增数字初始位移样式值
      // 标记每一位数字的位移值, 根据位移值做精准的定位
      const hasNewItem = numItems.some((item) => !item.style.transform);
      let numLen = numItems.length;
      if (hasNewItem) {
        // 用旧数字的整数位长度减去新数字的,计算出索引的位移值
        let idxShift =
          (this.newNumPart[0]?.length ?? 0) - (this.oldNumPart[0]?.length ?? 0);
        let oldNum = this.oldNumPart.join('').split('');
        for (let i = 0; i < numLen; i++) {
          const el = numItems[i];
          const oldEl = oldNum[i - idxShift] ?? null;
          // 初始化新数据的位移位置还原为对应旧数据的对应数字位
          el.style.transform = oldEl
            ? `translateY(-${oldEl}0%)`
            : 'translateY(0%)';
        }
      }

      setTimeout(() => {
        // 重新开启过度效果
        this.closeTransition = false;
        // 结合CSS 对数字字符进行滚动
        for (let i = 0; i < numLen; i++) {
          const el = numItems[i];
          el.style.transform = `translateY(-${numberArr[i] * 10}%)`;
        }
      }, 100);
    },
  },
};
</script>
<style scoped lang="less">
.scroll-num {
  display: flex;
  // justify-content: center;
}
.num-ul {
  list-style: none;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  user-select: none;
}

/*滚动数字设置*/
.list {
  width: 36px;
  height: 1em;
  font-family: DINAlternate-Bold;
  font-weight: bold;
  color: #05ffed;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  font-size: 54px;
  list-style: none;
  .num-col {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;

    .num-item {
      letter-spacing: 0.2em;
      font-style: normal;
    }
  }
}
/* .num-li:last-child {
  margin-right: 0;
} */
/* 符号 */
/* TODO: 调整样式 */
.symbol-li {
  width: 0.25em !important;
  display: flex;
  align-items: center;
  line-height: 100%;

  .symbol {
    position: relative;
    display: block;
    writing-mode: initial;
    text-orientation: initial;
    .negative {
      position: relative;
      left: -0.2em;
      top: -0.05em;
    }
    .comma {
      // display: block;
      // line-height: 100%;
    }
  }
}
</style>
