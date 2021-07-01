<template>
  <div class="head-slider-block">
    <v-carousel
      cycle
      :height="sliderMaxWidth"
      :hide-delimiters="false"
      :show-arrows="false"
      v-resize="onResize"
      style="width: 100%; margin: 100px auto;"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :to="slide.url"
      >
          <div class="v-image__image v-image__image--contain" :style="slide.style"></div>
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
        sliderMaxWidth:  550,
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

      setTimeout(() => {
        let all_icons = document.querySelectorAll('.head-slider-block .v-carousel .v-carousel__controls .v-icon');
        for(let i = 0; i < all_icons.length; i++) {
          all_icons[i].style.color = "#01B8BE";
        }
        document.querySelector('.head-slider-block .v-carousel .v-carousel__controls').style.background = "transparent";
        // document.querySelector('.head-slider-block .v-carousel .v-carousel__controls').style.bottom = "-25px";
      }, 100);

      setInterval(() => {
        let all_icons = document.querySelectorAll('.head-slider-block .v-carousel .v-carousel__controls .v-icon');
        for(let i = 0; i < all_icons.length; i++) {
          all_icons[i].style.opacity = '0.8';
        }
        let active_icon = document.querySelector('.head-slider-block .v-carousel .v-carousel__controls .v-item--active .v-icon');
        active_icon.style.opacity = '1';
      }, 100);

      this.onResize();
      if(this.slides.length == 0){
        this.component.componentElements.forEach((el) => {
          this.slides.push({text: el.name, src: el.image, url: el.url, style: 'background-image: url("'+el.image+'"); background-position: center center; background-size: contain; height: 500px;'});
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
          this.sliderMaxWidth = 550;
        }
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
    },
  }
</script>

<style scoped>
  @media (max-width: 959px) {
    .head-slider-block .v-carousel {
      margin: 0 auto !important;
    }
  }

  @media (min-width: 448px) and (max-width: 700px) {
    .head-slider-block .v-image__image {
        height: 400px !important;
    }
  }
</style>