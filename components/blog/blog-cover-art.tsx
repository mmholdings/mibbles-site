const palettes: Record<string, [string, string, string]> = {
  "best-cat-camera": ["#d8efff", "#f7f2ff", "#5187ad"],
  "cat-anxiety-symptoms": ["#dcecff", "#f8e9e1", "#6f83b9"],
  "cat-boredom-signs": ["#e1f6dc", "#fff3d3", "#7b9b45"],
  "cat-tv": ["#d6f6f7", "#e7e0ff", "#568bc8"],
  "first-time-cat-owner-guide": ["#fff0d9", "#e3f7e7", "#b07c42"],
  "how-long-should-cats-watch-cat-tv": ["#d8f4ff", "#eee6ff", "#599bd3"],
  "how-to-entertain-a-cat-while-at-work": ["#e6f4dc", "#e0efff", "#648a48"],
  "indoor-cat-enrichment-ideas": ["#ddf8e9", "#fff1d6", "#4b9b72"],
  "is-cat-tv-good-for-cats": ["#e2edff", "#f4e1ff", "#6a80bd"],
  "mental-stimulation-for-cats": ["#e0f5ed", "#e8e6ff", "#518c79"],
  "signs-of-a-depressed-cat": ["#dce7f7", "#f4e9eb", "#728098"],
  "signs-of-a-happy-cat": ["#fff0c9", "#e0f7e8", "#d29a37"],
};

const motifs: Record<string, string> = {
  "best-cat-camera": "camera",
  "cat-anxiety-symptoms": "heart",
  "cat-boredom-signs": "butterfly",
  "cat-tv": "screen",
  "first-time-cat-owner-guide": "paw",
  "how-long-should-cats-watch-cat-tv": "clock",
  "how-to-entertain-a-cat-while-at-work": "mouse",
  "indoor-cat-enrichment-ideas": "toys",
  "is-cat-tv-good-for-cats": "screen",
  "mental-stimulation-for-cats": "spark",
  "signs-of-a-depressed-cat": "cloud",
  "signs-of-a-happy-cat": "sun",
};

export function BlogCoverArt({ slug, title, className = "" }: { slug: string; title: string; className?: string }) {
  const [top, bottom, accent] = palettes[slug] ?? ["#e4f3e9", "#fff2dd", "#6c9b78"];
  const motif = motifs[slug] ?? "spark";
  const id = slug.replace(/[^a-z0-9]/g, "");

  return (
    <svg className={className} viewBox="0 0 1200 630" role="img" aria-label={`Illustration for ${title}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`fur-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f6ba75" />
          <stop offset="1" stopColor="#d77f53" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" rx="36" fill={`url(#bg-${id})`} />
      <circle cx="160" cy="115" r="94" fill="#fff" opacity=".38" />
      <circle cx="1050" cy="520" r="150" fill="#fff" opacity=".32" />
      <path d="M0 490c170-84 311-57 440 10 154 79 278 49 405-9 132-60 253-78 355-37v176H0Z" fill="#ffffff" opacity=".55" />
      <g transform="translate(150 138)" fill="none" stroke={accent} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
        {motif === "camera" && <><rect x="18" y="44" width="248" height="166" rx="38" fill="#fff" fillOpacity=".76"/><circle cx="141" cy="127" r="48" fill="#d9efff"/><circle cx="141" cy="127" r="22" fill={accent}/><path d="m68 44 18-29h68l18 29"/></>}
        {motif === "heart" && <path d="M143 211 39 112C-29 45 70-14 143 53c72-67 171-8 103 59Z" fill="#fff" fillOpacity=".72"/>}
        {motif === "butterfly" && <><path d="M132 113C51-7-14 75 64 141c-61 69 23 107 83 20 60 87 143 49 82-20 78-66 13-148-68-28" fill="#fff" fillOpacity=".7"/><path d="M145 88v106"/></>}
        {motif === "screen" && <><rect x="8" y="13" width="270" height="188" rx="26" fill="#fff" fillOpacity=".76"/><path d="M88 238h110M142 201v37"/><path d="M55 102q48-53 98 0t92 0"/></>}
        {motif === "paw" && <><ellipse cx="141" cy="156" rx="65" ry="51" fill="#fff" fillOpacity=".76"/><ellipse cx="66" cy="77" rx="28" ry="34" fill="#fff"/><ellipse cx="120" cy="44" rx="28" ry="34" fill="#fff"/><ellipse cx="177" cy="44" rx="28" ry="34" fill="#fff"/><ellipse cx="228" cy="77" rx="28" ry="34" fill="#fff"/></>}
        {motif === "clock" && <><circle cx="144" cy="122" r="106" fill="#fff" fillOpacity=".76"/><path d="M144 54v74l53 31"/></>}
        {motif === "mouse" && <><ellipse cx="133" cy="139" rx="100" ry="64" fill="#fff" fillOpacity=".76"/><circle cx="72" cy="80" r="37" fill="#ffd6dc"/><circle cx="183" cy="80" r="37" fill="#ffd6dc"/><path d="M31 146-12 128m52 63-44 16"/></>}
        {motif === "toys" && <><path d="M30 175q43-104 97 0t98 0"/><circle cx="29" cy="178" r="25" fill="#ffcf61"/><circle cx="226" cy="178" r="25" fill="#f27ab7"/><path d="M128 45q-38 45 0 70 39-25 0-70Z" fill="#fff"/></>}
        {motif === "spark" && <><path d="m144 18 29 81 83 23-83 27-29 83-27-83-83-27 83-23Z" fill="#fff" fillOpacity=".8"/><path d="m30 25 12 33 34 11-34 11-12 34-11-34-34-11 34-11Z"/></>}
        {motif === "cloud" && <><path d="M38 165a48 48 0 0 1 5-96 74 74 0 0 1 138 13 50 50 0 1 1 20 97H38Z" fill="#fff" fillOpacity=".82"/><path d="m91 115 18 19m46-19-18 19"/></>}
        {motif === "sun" && <><circle cx="143" cy="121" r="62" fill="#fff" fillOpacity=".8"/><path d="M143 6v38m0 154v38M28 121h38m154 0h38M61 39l27 27m109 109 27 27M225 39l-27 27M88 176l-27 27"/></>}
      </g>
      <ellipse cx="814" cy="518" rx="198" ry="34" fill={accent} opacity=".16" />
      <g transform="translate(650 152)">
        <path d="M54 210c-23-92 12-163 107-170 93-7 141 59 121 170l-10 128H67Z" fill={`url(#fur-${id})`} />
        <path d="m68 83 11-105 91 73m39 0 92-74 5 112" fill="#e9a466" stroke="#b66649" strokeWidth="13" strokeLinejoin="round" />
        <path d="M102 135c10-18 37-18 47 0m65 0c10-18 37-18 47 0" fill="#fff" />
        <ellipse cx="127" cy="145" rx="12" ry="18" fill="#263c31"/><ellipse cx="237" cy="145" rx="12" ry="18" fill="#263c31"/>
        <path d="M168 184q14-14 28 0-14 21-28 0Z" fill="#b45b5b"/><path d="M183 198q-18 25-36 0m36 0q18 25 36 0" fill="none" stroke="#713e39" strokeWidth="9" strokeLinecap="round"/>
        <path d="M72 188 12 177m64 36-57 9m290-45-60 11m56 28-58-3" fill="none" stroke="#713e39" strokeWidth="6" strokeLinecap="round" opacity=".75"/>
        <path d="M167 86q18 30 36 0m-55 48q19-13 36 0m15 0q18-13 37 0" fill="none" stroke="#c77e51" strokeWidth="8" strokeLinecap="round" opacity=".7"/>
      </g>
      <circle cx="1006" cy="168" r="12" fill={accent} opacity=".6"/><circle cx="1046" cy="204" r="7" fill={accent} opacity=".4"/>
    </svg>
  );
}
