<template>
  <div class="frame">
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
