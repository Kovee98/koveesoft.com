<script setup lang="ts">
import { siteUrl } from '~/composables/useSiteSeo'
import { email, socialLinks } from '~/data/contact'

const description = 'Koveesoft is an independent software studio, starting with games. Follow along for upcoming releases.'

useSiteSeo({ path: '/', title: 'Koveesoft | Independent Software Studio', description })

useHead({
  script: [{
    type: 'application/ld+json',
    textContent: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Koveesoft',
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logo-512.png`,
      description,
      email,
      sameAs: socialLinks.map(({ url }) => url),
    }).replaceAll('<', '\\u003c'),
  }],
})
</script>

<template>
  <div class="home">
    <section class="home-copy" aria-labelledby="home-title">
      <p class="eyebrow">Independent software studio</p>
      <h1 id="home-title">      Software for <span class="accent accent-line">everyone<span class="dot">.</span></span></h1>
            <p class="lede">Eat. Play. Game.</p>
      <NuxtLink class="cta" to="/games">Explore games <span aria-hidden="true">&rarr;</span></NuxtLink>
    </section>

    <div class="home-art" aria-hidden="true">
      <span class="art-label art-tl">Koveesoft / Studio</span>
      <span class="art-label art-tr">N&deg; 01</span>
      <img src="/studio-mark.svg" width="340" height="340" alt="">
      <span class="art-label art-bl">Eat &middot; Play &middot; Game</span>
      <span class="art-label art-br">+</span>
    </div>
  </div>
</template>
