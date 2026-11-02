#!/usr/bin/env bash
# Copies the photos the new site uses from the current WordPress media library
# into public/images/. Run this ONCE from your computer BEFORE pointing the
# domain at Vercel (after the DNS switch the old /wp-content/ URLs disappear).
#   npm run images
# Then commit public/images and push. Pages show a soft placeholder for any
# image that is missing, so the site never shows a broken image.
set -euo pipefail
cd "$(dirname "$0")/../public/images"
BASE="https://seniorandlivingtoday.com/wp-content/uploads"
while read -r local remote; do
  [ -z "$local" ] && continue
  if [ -f "$local" ]; then echo "skip  $local"; continue; fi
  if curl -fsSL --retry 2 -o "$local" "$BASE/$remote"; then echo "saved $local"; else echo "FAIL  $local  <- $remote"; rm -f "$local"; fi
done <<'LIST'
courtney.jpg 2025/09/Courtney_03.jpg
about-hero.jpg 2025/01/witnM.A.Anderson.jpg
courtney-laughing.png 2025/01/meandjulielaugh.png
caregivers-together.jpg 2025/01/kayandMaryEllen.jpg
living-legacy-planner.webp 2025/01/WhatsApp_Image_2024-05-16_at_22.16.22-1.webp
relics-of-the-century.jpg 2025/03/WhatsApp-Image-2025-03-10-at-13.43.55_effd1bdf.jpg
consulting-plan.webp 2025/03/medium-shot-man-woman-learning_23-2149204731.webp
consulting-healthcare.webp 2025/03/anonymous-coworkers-with-papers_23-2147656687.webp
consulting-finance.webp 2025/03/medium-shot-people-learning-together_23-2149204769-e1741845094115.webp
seniors-outdoors.webp 2025/03/elderly-friends-playing-petanque_23-2149443876-e1742298513264.webp
smoke-detector.webp 2025/03/sanitary-equipment_93675-132394-e1768471678949.webp
legacy-planner-reading.webp 2025/01/Best_Senior_Care_Services_in_Dayton_Ohio_89277461-6a42-4456-a112-0f38f2c54498.webp
adult-bibs.png 2025/03/2.png
magnifier.png 2025/03/1.png
books-for-seniors.png 2025/03/3.png
community-quiz.png 2025/09/www.reallygreatsite.com-1.png
community-courses.webp 2025/09/imgi_57_close-up-senior-couple-while-learning_23-2149072442.webp
community-webinars.webp 2025/09/imgi_56_low-angle-elder-female-working-laptop_23-2148373842.webp
saltines-got-talent.png 2025/12/Brown-Minimalist-Coming-Soon-Banner-1-scaled.png
va-independence.png 2025/06/Untitled-design-20.png
va-family.png 2025/06/Untitled-design-21.png
va-savings.png 2025/06/Untitled-design-22.png
va-wellness.png 2025/06/Designed-for-Emotional-Wellness.png
logo.png 2025/01/cropped-SALTlogoCROPED-270x270.png
LIST
echo "Done. Tip: compress large files at https://squoosh.app before committing (aim < 250 KB each)."
