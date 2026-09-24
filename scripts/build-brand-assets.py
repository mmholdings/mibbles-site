#!/usr/bin/env python3
"""Build exact Mibbles brand assets from the approved transparent wordmark."""

from pathlib import Path
import sys
import zipfile

from PIL import Image, ImageDraw


SITE = Path(__file__).resolve().parents[1]
WORKSPACE = SITE.parent
APP_ASSETS = WORKSPACE / "mibbles-app-current/ios/MibblesCatTVWellness/Assets.xcassets"
APPROVED_ICON = SITE / "brand/approved-app-icon.png"


def trim(image: Image.Image, padding: int = 0) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        raise ValueError("The supplied logo has no visible pixels")
    left, top, right, bottom = bbox
    return image.crop((max(0, left - padding), max(0, top - padding), min(image.width, right + padding), min(image.height, bottom + padding)))


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    copy = image.copy()
    copy.thumbnail(size, Image.Resampling.LANCZOS)
    return copy


def make_icon(mark: Image.Image, size: int) -> Image.Image:
    # Apple applies its own corner mask. Keep the source square and opaque.
    canvas = Image.new("RGB", (size, size), "#FAFAF7")
    draw = ImageDraw.Draw(canvas)
    # A very soft mint-to-cream wash preserves the new black mark's contrast.
    top = (230, 249, 240)
    bottom = (255, 243, 226)
    for y in range(size):
        t = y / max(1, size - 1)
        color = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        draw.line((0, y, size, y), fill=color)

    target_width = round(size * 1.08)
    target_height = round(target_width * mark.height / mark.width)
    fitted = mark.resize((target_width, target_height), Image.Resampling.LANCZOS)
    # Carry the cropped body through the right edge so Mibbles reads as a
    # continuing character instead of a shape ending inside the icon.
    x = round(size * 0.04)
    y = (size - fitted.height) // 2 + round(size * 0.025)
    canvas.paste(fitted, (x, y), fitted)
    return canvas


def save_png(image: Image.Image, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)


def save_imageset(name: str, filename: str, image: Image.Image):
    folder = APP_ASSETS / f"{name}.imageset"
    folder.mkdir(parents=True, exist_ok=True)
    save_png(image, folder / filename)
    (folder / "Contents.json").write_text(
        """{
  \"images\" : [
    {
      \"filename\" : \"%s\",
      \"idiom\" : \"universal\",
      \"scale\" : \"1x\"
    }
  ],
  \"info\" : {
    \"author\" : \"xcode\",
    \"version\" : 1
  }
}
""" % filename,
        encoding="utf-8",
    )


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: build-brand-assets.py /path/to/approved-logo.png")

    source = Image.open(sys.argv[1]).convert("RGBA")
    wordmark = trim(source, 14)

    # The first 35% contains the complete eye-bearing M and stops before the i.
    alpha_bbox = source.getchannel("A").getbbox()
    assert alpha_bbox is not None
    left, top, right, bottom = alpha_bbox
    mark_right = left + round((right - left) * 0.35)
    mark = trim(source.crop((left, top, mark_right, bottom)), 8)

    save_png(wordmark, SITE / "public/images/mibbles-wordmark.png")
    save_png(wordmark, SITE / "public/press-kit/mibbles-wordmark.png")
    save_png(mark, SITE / "public/press-kit/mibbles-mark.png")
    save_imageset("BrandWordmark", "wordmark.png", wordmark)
    save_imageset("BrandMark", "mark.png", mark)

    if APPROVED_ICON.exists():
        approved = Image.open(APPROVED_ICON).convert("RGB")
        side = min(approved.size)
        left = (approved.width - side) // 2
        top = (approved.height - side) // 2
        master_icon = approved.crop((left, top, left + side, top + side)).resize(
            (1024, 1024), Image.Resampling.LANCZOS
        )
    else:
        master_icon = make_icon(mark, 1024)
    save_png(master_icon, APP_ASSETS / "AppIcon.appiconset/icon.png")
    save_png(master_icon, SITE / "public/images/app-icon.png")
    save_png(master_icon, SITE / "public/press-kit/app-icon.png")

    for filename, size in (
        ("apple-touch-icon.png", 180),
        ("android-chrome-192x192.png", 192),
        ("android-chrome-512x512.png", 512),
        ("favicon-16x16.png", 16),
        ("favicon-32x32.png", 32),
    ):
        save_png(master_icon.resize((size, size), Image.Resampling.LANCZOS), SITE / f"public/{filename}")

    master_icon.save(
        SITE / "public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    with zipfile.ZipFile(SITE / "public/press-kit/logos.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for filename in ("mibbles-wordmark.png", "mibbles-mark.png", "app-icon.png"):
            archive.write(SITE / "public/press-kit" / filename, arcname=filename)

    print(f"wordmark={wordmark.size} mark={mark.size} appIcon={master_icon.size}")


if __name__ == "__main__":
    main()
