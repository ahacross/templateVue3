<template>
  <h1 class="center">사용자 정보 수정</h1>
  <div class="row justify-center">
    <table>
      <tr>
        <th>이름</th>
        <td>
          <q-input />
        </td>
      </tr>
      <tr>
        <th>폰 번호</th>
        <td><q-input /></td>
      </tr>
      <tr>
        <th>생일</th>
        <td>
          <datepicker v-model="date" />
        </td>
      </tr>
      <tr>
        <th>e-mail</th>
        <td><q-input /></td>
      </tr>
    </table>

    <q-btn>수정</q-btn>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
export default {
  components: { Datepicker },
  data: () => ({
    date: new Date(),
  }),
}
</script>
<style scoped lang="scss">
table {
  width: 90%;
  margin-bottom: 20px;
}
</style>
