import { siBluesky, siDiscord, siInstagram, siItchdotio, siReddit, siTiktok, siX, siYoutube } from 'simple-icons'

export interface SocialProfile {
  label: string
  url: string
  path: string
  hex: string
}

export const email = 'support@koveesoft.com'

export const discord = { username: 'koveesoft', path: siDiscord.path }

// Simple Icons doesn't ship LinkedIn, so this is a hand-drawn "in" mark (evenodd cutouts in a rounded square).
const linkedinPath = 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2.5 7.5V18h3V9.5ZM8 5.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM11.5 9.5V18h3v-4.5c0-1.2.7-1.9 1.6-1.9s1.4.6 1.4 1.9V18h3v-5.2c0-2.4-1.3-3.5-3.2-3.5-1.3 0-2.2.6-2.8 1.4V9.5Z'

const fromIcon = (label: string, url: string, icon: { path: string; hex: string }): SocialProfile =>
  ({ label, url, path: icon.path, hex: `#${icon.hex}` })

export const socialLinks: SocialProfile[] = [
  fromIcon('itch.io', 'https://koveesoft.itch.io', siItchdotio),
  fromIcon('YouTube', 'https://www.youtube.com/@Koveesoft', siYoutube),
  fromIcon('Bluesky', 'https://bsky.app/profile/koveesoft.bsky.social', siBluesky),
  fromIcon('X', 'https://x.com/Koveesoft', siX),
  fromIcon('Instagram', 'https://www.instagram.com/koveesoft', siInstagram),
  fromIcon('TikTok', 'https://www.tiktok.com/@koveesoft', siTiktok),
  fromIcon('Reddit', 'https://www.reddit.com/user/Koveesoft', siReddit),
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/koveesoft/', path: linkedinPath, hex: '#0A66C2' },
]
