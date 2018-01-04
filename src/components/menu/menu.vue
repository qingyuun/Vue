<style lang="scss">
@import '../../assets/scss/menu.scss';
</style>

<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <left-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></left-menu>
        <icon-menu 
          v-show="shrink"
          :menu-theme="theme" 
          :menu-list="menuList" 
          :icon-color="shrinkIconColor"
          @on-change="handleChange"
        ></icon-menu>
    </div>
</template>

<script>
import leftMenu from './left-menu.vue'
import iconMenu from './icon-menu.vue'
import util from '@/libs/util'
export default {
  name: 'menu',
  components: {
    leftMenu,
    iconMenu
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
      validator (val) {
        return util.oneOf(val, ['dark', 'light'])
      }
    },
    beforePush: {
      type: Function
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    bgColor () {
      return this.theme === 'dark' ? '#495060' : '#fff'
    },
    shrinkIconColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  methods: {
    handleChange (name) {
      let willpush = true
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false
        }
      }
      if (willpush) {
        this.$router.push({
          name: name
        })
      }
      this.$emit('on-change', name)
    }
  }
}
</script>
