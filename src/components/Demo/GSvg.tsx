import { defineComponent } from 'vue';

export const GroupSvg = defineComponent({
  props: {
    gGroup: {
      type: Array,
      default: (): string[] => [
        // '/src/assets/svg/shutter.svg#circle',
        // '/src/assets/svg/synth.svg#Synth',
      ],
    },
  },
  setup(props: { gGroup: string[] }) {
    function UseG() {
      return props.gGroup.map((g) => {
        return <use x="0" y="0" href={g} class="blue" key={g} />;
      });
    }
    return () => (
      <svg width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="Port">
            <circle style="fill: inherit" r="10" />
          </g>
        </defs>

        <use x="20" y="20" href="#Port" class="green" />
        {UseG()}
        {/* <use x="0" y="0" :href="`${shutter}#circle`" class="green" />
      <use x="0" y="0" :href="`${synth}#Synth`" class="blue" /> */}
      </svg>
    );
  },
});
