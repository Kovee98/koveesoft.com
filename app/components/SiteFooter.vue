<script setup lang="ts">
import { discord, email, socialLinks } from '~/data/contact'

const year = new Date().getUTCFullYear()
</script>

<template>
  <footer class="site-footer">
    <ul class="socials" aria-label="Koveesoft on social media">
      <li v-for="profile in socialLinks" :key="profile.url">
        <a :href="profile.url" rel="me" :title="profile.label" :aria-label="`Koveesoft on ${profile.label}`" :style="{ '--brand': profile.hex }">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path :d="profile.path" fill-rule="evenodd" /></svg>
        </a>
      </li>
    </ul>
    <div class="contact">
      <a class="contact-item" :href="`mailto:${email}`">
        <svg class="stroke-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 5.5h17v13h-17zM4 6l8 6.5L20 6" /></svg>
        {{ email }}
      </a>
      <span class="contact-item" title="Discord username">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path :d="discord.path" /></svg>
        <span class="sr-only">Discord username:</span> {{ discord.username }}
      </span>
    </div>
    <div class="footer-meta">
      <nav class="legal-links" aria-label="Legal">
        <NuxtLink to="/terms">Terms</NuxtLink>
        <NuxtLink to="/privacy">Privacy</NuxtLink>
      </nav>
      <small class="copyright">&copy; {{ year }} Koveesoft</small>
    </div>
  </footer>
</template>
