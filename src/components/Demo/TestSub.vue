<template>
  <div v-for="(item, index) in items" :key="item">
    {{ index }} --> {{ item }}
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'TestSub',
  setup() {
    const items = reactive([
      '山有木兮木有枝，心悦君兮君不知',
      '人生若只如初见，何事秋风悲画扇',
      '十年生死两茫茫，不思量，自难忘',
      '曾经沧海难为水，除却巫山不是云',
    ]);
    // // 此处会出现1.5秒的loading效果
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     return resolve({
    //       ...toRefs(state),
    //     });
    //   }, 1500);
    // });

    return {
      // ...toRefs(state)
      items,
    };
  },
});
</script>
