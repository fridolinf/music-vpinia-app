<template>
  <div class="about">
    <p class="text-center mx-20 text-3xl mt-20 about">
      {{ $t('about.title') }}
    </p>
    <div class="flex justify-center">
      <a target="_blank" href="https://github.com/fridolinf/music-vpinia-app" id="git-href">
        <p id="github-link" class="mt-10 hover:text-orange-500 hover:font-semibold cursor-pointer">
          {{ $t('about.see-code') }}
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
