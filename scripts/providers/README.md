# TikTok event providers

Drop a provider module here and select it with `TIKTOK_PROVIDER=<filename-without-ext>`.

A provider is a small module that exports a `TikTokSource` (see `lib/live/tiktok-adapter.ts`):

```ts
import type { TikTokSource } from "../../lib/live/tiktok-adapter";
import { normalizeTikTokEvent } from "../../lib/live/tiktok-adapter";

const provider: TikTokSource = {
  name: "my-provider",
  async connect(username, onEvent, onStatus) {
    // 1. open the provider's connection for `username`
    // 2. for each raw provider event:  const ev = normalizeTikTokEvent(kind, raw); if (ev) onEvent(ev);
    // 3. call onStatus("connected") / onStatus("disconnected: …") as appropriate
  },
  async disconnect() { /* close */ },
};
export default provider;
```

Rules:

- Use only an integration that is permitted for the account/environment at deploy time.
- Never let the game depend on provider-specific fields — normalize everything through `normalizeTikTokEvent`.
- Gift streaks: forward the *final* repeat update only (the normalizer drops in-progress updates for streakable gifts).
- No provider is bundled in this repo on purpose.
