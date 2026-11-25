<script setup lang="ts">
import { email } from '~/data/contact'

useSiteSeo({
  path: '/privacy',
  title: 'Privacy Policy | Koveesoft',
  description: 'How Koveesoft handles data on its website and in the social media publishing tool it uses for its own accounts.',
})
</script>

<template>
  <article class="legal" aria-labelledby="privacy-title">
    <p class="eyebrow">Legal</p>
    <h1 id="privacy-title">Privacy Policy<span class="dot">.</span></h1>
    <p class="legal-date">Effective November 25, 2026</p>

    <p>
      This policy explains how Koveesoft handles data on its website at koveesoft.com and in the
      self-hosted social media publishing tool Koveesoft uses to manage its own accounts (the
      "publishing tool"). The publishing tool is built on the open-source Postiz software.
    </p>

    <h2>This website</h2>
    <p>
      This website has no accounts, forms, cookies or analytics. It is hosted by Cloudflare, which
      processes standard request information such as IP addresses to deliver and protect the site, under
      <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's privacy policy</a>.
      If you email Koveesoft, your message and address are used only to reply.
    </p>

    <h2>The publishing tool</h2>
    <p>
      Koveesoft uses the publishing tool only to publish to Koveesoft's own social media accounts,
      including TikTok, YouTube, Bluesky, X, LinkedIn, Instagram, Facebook and Reddit. Nobody outside
      Koveesoft can sign up for it. It stores:
    </p>
    <ul>
      <li>
        Authorization tokens for Koveesoft's connected accounts. They let the tool publish content and
        read account information and statistics, as permitted by each platform.
      </li>
      <li>
        Basic information about those accounts returned by each platform, such as account IDs, names,
        usernames, profile images and post or follower statistics.
      </li>
      <li>Koveesoft's own drafts, captions, images, videos and schedules.</li>
    </ul>
    <p>
      This data is used only to publish Koveesoft's content and show Koveesoft its account statistics.
      It is kept on a server Koveesoft controls and is never sold. It is shared only with the platform
      a post is published to, through that platform's API.
    </p>

    <h2>Platforms</h2>
    <p>Once content reaches a platform, that platform's own privacy policy applies, for example:</p>
    <ul>
      <li><a href="https://www.tiktok.com/legal/privacy-policy">TikTok</a></li>
      <li><a href="https://policies.google.com/privacy">Google and YouTube</a></li>
      <li><a href="https://www.facebook.com/privacy/policy">Meta (Facebook and Instagram)</a></li>
    </ul>
    <p>
      The publishing tool's use of information received from Google APIs adheres to the
      <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>,
      including the Limited Use requirements.
    </p>

    <h2>Retention and deletion</h2>
    <p>
      Account data is kept while an account is connected to the publishing tool. Access can be revoked
      by disconnecting the account in the tool or removing the app in that platform's settings.
      Revoking access stops future access but doesn't by itself delete data already stored. To ask
      about or request deletion of any data, contact Koveesoft at the address below.
    </p>

    <h2>Changes</h2>
    <p>This policy may be updated from time to time. The current version is always published on this page.</p>

    <h2>Contact</h2>
    <p>Koveesoft, <a :href="`mailto:${email}`">{{ email }}</a></p>
  </article>
</template>
