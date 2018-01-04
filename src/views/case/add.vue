<template>
  <h1 @click="getuser()">caseadd</h1>
</template>
<<script>
export default {
  methods: {
    getuser () {
      this.axios.get('http://oacore.dev.jingshonline.net/api/services/app/Session/GetCurrentLoginInformations')
        .then(response => {
          if (response.status === 200) {
            // 成功后操作
          } else {
            // 由后端抛出的错误
          }
        })
    }

  }
}
</script>

