<script setup lang="ts">
import { email } from '~/data/contact'

useSiteSeo({
  path: '/terms',
  title: 'Terms of Service | Koveesoft',
  description: 'Terms of Service for the Koveesoft website and the social media publishing tool Koveesoft uses for its own accounts.',
})
</script>

<template>
  <article class="legal" aria-labelledby="terms-title">
    <p class="eyebrow">Legal</p>
    <h1 id="terms-title">Terms of Service<span class="dot">.</span></h1>
    <p class="legal-date">Effective November 25, 2026</p>

    <p>
      These terms cover the Koveesoft website at koveesoft.com and the self-hosted social media
      publishing tool Koveesoft uses to manage its own accounts (the "publishing tool"). The publishing
      tool is built on the open-source Postiz software.
    </p>

    <h2>The publishing tool</h2>
    <p>
      Koveesoft uses the publishing tool only to draft, schedule and publish Koveesoft's own content to
      Koveesoft's own social media accounts. It is not offered as a service. Nobody outside Koveesoft
      can sign up for it, and it is not used to manage anyone else's accounts.
    </p>
    <p>
      Content published through the tool is subject to each platform's own terms, policies and
      community guidelines, and Koveesoft is responsible for it.
    </p>

    <h2>The website</h2>
    <p>
      You may browse this website for personal, non-commercial purposes. The Koveesoft name, logo,
      artwork and game assets belong to Koveesoft and may not be reused without permission.
    </p>

    <h2>No warranty</h2>
    <p>
      The website and the publishing tool are provided "as is", without warranties of any kind. To the
      extent permitted by law, Koveesoft is not liable for damages arising from their use. Nothing in
      these terms limits liability that cannot legally be limited.
    </p>

    <h2>Changes</h2>
    <p>These terms may be updated from time to time. The current version is always published on this page.</p>

    <h2>Contact</h2>
    <p>Koveesoft, <a :href="`mailto:${email}`">{{ email }}</a></p>
  </article>
</template>
