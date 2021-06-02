<template>
  <div class="head-slider-block">
    <v-carousel
      cycle
      :height="sliderMaxWidth"
      :hide-delimiters="false"
      :show-arrows="false"
      v-resize="onResize"
      style="width: 720px; margin: 100px auto;"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        :to="slide.url"
      >

          <v-row
            class="fill-height px-5 py-5"
            align="center"
            justify="start"
          >
            <div class="display-3" style="align-self: flex-end; color: #fff;">{{ slide.text }}</div>
          </v-row>

      </v-carousel-item>
    </v-carousel>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        slides: [
        ],
        sliderMaxWidth:  600,
      }
    },
    mounted () {
      this.$nextTick(function () {
        if(document.querySelector('.head-slider-block .v-carousel .v-carousel__controls') !== null) {
          // document.querySelector('.head-slider-block .v-carousel .v-carousel__controls').style.background = "transparent";
          // document.querySelector('.head-slider-block .v-carousel .v-carousel__controls').style.bottom = "-50px";
          // document.querySelector('.head-slider-block .v-carousel .v-carousel__controls .v-icon').style.color = "#01B8BE";
        }
      });
      this.onResize();
      if(this.slides.length == 0){
        this.component.componentElements.forEach((el) => {
          this.slides.push({text: el.name, src: el.image, url: el.url});
        })
      }
    },
    computed: {
      component() {
        return this.$store.getters['components/slider'];
      },
    },
    methods: {
      onResize () {
        if(window.innerWidth <= 960){
          this.sliderMaxWidth = 400;
        }else{
          this.sliderMaxWidth = 600;
        }
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
    },
  }
</script>
