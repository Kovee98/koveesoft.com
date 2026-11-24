<script setup lang="ts">
useSiteSeo({
  path: '/games',
  title: 'Games | Koveesoft',
  description: 'Games from Koveesoft, an independent software studio, including Paper Sudoku: a sudoku you write in by hand, like paper. Follow along for release news.',
})

interface GameSlot {
  slot: string
  title?: string
  tagline?: string
  genre?: string
  logo?: string
  color?: string
}

const games: GameSlot[] = [
  {
    slot: '01',
    title: 'Paper Sudoku',
    tagline: 'Write it in. Like paper.',
    genre: 'Puzzle',
    logo: '/images/paper-sudoku.svg',
    color: '#4c679a',
  },
  { slot: '02' },
  { slot: '03' },
]
</script>

<template>
  <section class="games" aria-labelledby="games-title">
    <div class="games-head">
      <div>
        <p class="eyebrow">Game Catalog</p>
        <h1 id="games-title">Games<span class="dot">.</span></h1>
      </div>
    </div>

    <ul class="slots" aria-label="Games">
      <li v-for="game in games" :key="game.slot" class="slot" :class="{ 'slot-filled': game.title }">
        <div
          class="slot-art"
          :style="game.color ? { '--slot-color': game.color } : undefined"
          :aria-hidden="game.logo ? undefined : 'true'"
        >
          <span class="slot-tag" aria-hidden="true">{{ game.genre ?? `Slot ${game.slot}` }}</span>
          <img v-if="game.logo" class="slot-logo" :src="game.logo" :alt="`${game.title} logo`" width="360" height="360">
          <span v-else class="slot-glyph">?</span>
          <span class="slot-status" aria-hidden="true">Status // {{ game.title ? 'Coming soon' : 'TBA' }}</span>
        </div>
        <div class="slot-meta">
          <h2 v-if="game.title" class="slot-title">{{ game.title }}</h2>
          <p v-else class="slot-title">Coming soon</p>
          <span class="slot-sub">{{ game.title ? 'Coming soon' : 'Title TBA' }}</span>
        </div>
        <p v-if="game.tagline" class="slot-tagline">{{ game.tagline }}</p>
      </li>
    </ul>
  </section>
</template>
