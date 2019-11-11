<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary">button</el-button>
    <Button size="mini">Button</Button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'about',
  components: {
    Button
  }
}
</script>
