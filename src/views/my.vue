<template>
  <!-- <div class="container"> -->
  <!-- <nav class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm mt-2">
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="/myInfo"
              :class="$route.path === '/myInfo' ? 'active' : ''"
              >我的资料</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="myLink"
              :class="$route.path === '/myLink' ? 'active' : ''"
              >我的发布</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="/myLabel"
              :class="$route.path === '/myLabel' ? 'active' : ''"
              >我的收藏</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="/myHistoryCord"
              :class="$route.path === '/myHistoryCord' ? 'active' : ''"
              >历史记录</a
            >
          </li>
        </ul>
      </div>
    </nav> -->

  <!-- <ul class="nav nav-tabs shadow" role="tablist">
      <li class="nav-item">
        <a class="nav-link link-dark" href="#home">个人资料</a>
      </li>
      <li class="nav-item">
        <a class="nav-link link-dark" href="#menu1">我的链接</a>
      </li>
      <li class="nav-item">
        <a class="nav-link link-dark" href="#menu2">个性化标签</a>
      </li>
      <li class="nav-item">
        <a class="nav-link link-dark" href="#menu2">历史记录</a>
      </li>
    </ul> -->
  <router-view class="bg-transparent-51 mt-4"></router-view>
  <!-- </div> -->
</template>

<script>
export default {
  name: "my-vue",
  components: {},
};
</script>

<style></style>
