// Coloring book pages: simple, bold line art with large areas that are easy to tap.
// Every fillable shape has class "c". Shapes with fill="none" are outlines only.
export interface ColoringPage { id: string; name: string; emoji: string; svg: string }

const bg = '<rect class="c" x="0" y="0" width="400" height="400" />';

export const COLORING: ColoringPage[] = [
  { id: 'flowers', name: 'Flower pot', emoji: '🌷', svg: `${bg}
    <path class="c" d="M120 290h160l-20 90H140z"/><rect class="c" x="110" y="270" width="180" height="26" rx="6"/>
    <path class="c" d="M200 270V150M200 220c-30-10-50-30-55-55 30 0 50 20 55 55zM200 200c30-10 50-30 55-55-30 0-50 20-55 55z"/>
    <circle class="c" cx="200" cy="120" r="22"/><ellipse class="c" cx="200" cy="80" rx="18" ry="24"/><ellipse class="c" cx="200" cy="160" rx="18" ry="24"/><ellipse class="c" cx="160" cy="120" rx="24" ry="18"/><ellipse class="c" cx="240" cy="120" rx="24" ry="18"/>
    <path class="c" d="M120 270V190"/><circle class="c" cx="120" cy="175" r="14"/><circle class="c" cx="104" cy="160" r="12"/><circle class="c" cx="136" cy="160" r="12"/><circle class="c" cx="104" cy="190" r="12"/><circle class="c" cx="136" cy="190" r="12"/>
    <path class="c" d="M280 270V200"/><path class="c" d="M280 200c-20-30-20-55 0-75 20 20 20 45 0 75z"/><circle class="c" cx="340" cy="60" r="34"/>` },
  { id: 'cottage', name: 'Cottage', emoji: '🏡', svg: `<rect class="c" x="0" y="0" width="400" height="300"/><rect class="c" x="0" y="300" width="400" height="100"/>
    <circle class="c" cx="330" cy="70" r="30"/><path class="c" d="M90 170 200 80l110 90z"/><rect class="c" x="100" y="170" width="200" height="140"/>
    <rect class="c" x="180" y="230" width="44" height="80" rx="4"/><rect class="c" x="120" y="195" width="44" height="40"/><rect class="c" x="240" y="195" width="44" height="40"/>
    <rect class="c" x="250" y="95" width="26" height="45"/><path class="c" d="M180 310 160 400h84l-20-90z"/>
    <circle class="c" cx="60" cy="280" r="26"/><circle class="c" cx="340" cy="285" r="22"/><path class="c" d="M30 120c20-25 60-25 80 0-20 10-60 10-80 0z"/>` },
  { id: 'butterfly', name: 'Butterfly', emoji: '🦋', svg: `${bg}
    <path class="c" d="M196 190C150 90 60 80 50 130s40 90 146 70z"/><path class="c" d="M204 190c46-100 136-110 146-60s-40 90-146 70z"/>
    <path class="c" d="M196 210C120 210 80 260 110 300s80 0 86-90z"/><path class="c" d="M204 210c76 0 116 50 86 90s-80 0-86-90z"/>
    <circle class="c" cx="110" cy="140" r="18"/><circle class="c" cx="290" cy="140" r="18"/><circle class="c" cx="135" cy="265" r="14"/><circle class="c" cx="265" cy="265" r="14"/>
    <ellipse class="c" cx="200" cy="215" rx="12" ry="70"/><circle class="c" cx="200" cy="135" r="14"/>
    <path class="c" d="M60 360c30-30 60-30 90 0zM250 360c30-30 60-30 90 0z"/>` },
  { id: 'teatime', name: 'Teatime', emoji: '☕', svg: `${bg}
    <ellipse class="c" cx="200" cy="320" rx="150" ry="30"/><path class="c" d="M90 180h220c0 90-40 140-110 140S90 270 90 180z"/>
    <path class="c" d="M310 200c50 0 50 70-10 70l6-20c30 0 30-34 0-34z"/><ellipse class="c" cx="200" cy="180" rx="110" ry="18"/>
    <circle class="c" cx="160" cy="240" r="16"/><circle class="c" cx="200" cy="260" r="16"/><circle class="c" cx="240" cy="240" r="16"/>
    <path class="c" d="M170 140c-10-20 10-30 0-50M200 140c-10-20 10-30 0-50M230 140c-10-20 10-30 0-50" fill="none"/>
    <path class="c" d="M310 60c10-20 40-20 40 5 0 20-40 40-40 40s-40-20-40-40c0-25 30-25 40-5z"/>` },
  { id: 'xmas-tree', name: 'Christmas tree', emoji: '🎄', svg: `${bg}
    <path class="c" d="M200 40 280 150h-40l60 80h-50l70 90H80l70-90h-50l60-80h-40z"/>
    <rect class="c" x="175" y="320" width="50" height="50"/><path class="c" d="M200 20l8 18 20 2-15 13 5 20-18-11-18 11 5-20-15-13 20-2z"/>
    <circle class="c" cx="180" cy="130" r="10"/><circle class="c" cx="230" cy="190" r="10"/><circle class="c" cx="160" cy="220" r="10"/><circle class="c" cx="250" cy="280" r="10"/><circle class="c" cx="140" cy="290" r="10"/><circle class="c" cx="205" cy="265" r="10"/>
    <rect class="c" x="60" y="335" width="60" height="45"/><rect class="c" x="280" y="330" width="70" height="50"/><path class="c" d="M90 335v45M280 355h70" fill="none"/>` },
  { id: 'snowman', name: 'Snowman', emoji: '⛄', svg: `${bg}
    <circle class="c" cx="200" cy="300" r="80"/><circle class="c" cx="200" cy="180" r="58"/><circle class="c" cx="200" cy="95" r="42"/>
    <rect class="c" x="160" y="30" width="80" height="40"/><rect class="c" x="145" y="66" width="110" height="12"/>
    <path class="c" d="M200 95l40 8-40 8z"/><path class="c" d="M150 130h100l-10 22h-80z"/><path class="c" d="M230 140l10 60-22 0z"/>
    <circle class="c" cx="200" cy="170" r="7"/><circle class="c" cx="200" cy="200" r="7"/><circle class="c" cx="200" cy="270" r="8"/><circle class="c" cx="200" cy="300" r="8"/>
    <path class="c" d="M145 180 80 140M255 180l65-40" fill="none"/><circle class="c" cx="60" cy="60" r="10"/><circle class="c" cx="330" cy="50" r="8"/><circle class="c" cx="350" cy="120" r="6"/>` },
  { id: 'bird', name: 'Songbird', emoji: '🐦', svg: `${bg}
    <path class="c" d="M20 300c100-20 260-20 360 10" fill="none"/><path class="c" d="M60 300c10-20 30-25 40-10M300 305c10-25 35-25 45-8"/>
    <ellipse class="c" cx="200" cy="210" rx="90" ry="65"/><circle class="c" cx="270" cy="150" r="42"/><path class="c" d="M308 145l40 10-40 12z"/>
    <circle class="c" cx="280" cy="140" r="8"/><path class="c" d="M150 190c40-40 100-30 110 20-40 10-80 10-110-20z"/>
    <path class="c" d="M115 220 40 190l30 50z"/><path class="c" d="M190 270v30M220 270v30" fill="none"/>` },
  { id: 'fish', name: 'Happy fish', emoji: '🐠', svg: `${bg}
    <path class="c" d="M60 200c60-90 200-90 250 0-50 90-190 90-250 0z"/><path class="c" d="M300 200l70-60v120z"/>
    <path class="c" d="M140 140c20-40 80-40 100 0z"/><path class="c" d="M150 260c20 30 60 30 80 0z"/>
    <circle class="c" cx="115" cy="185" r="16"/><path class="c" d="M180 130c-20 40-20 100 0 140M230 135c-20 40-20 90 0 130" fill="none"/>
    <circle class="c" cx="60" cy="90" r="14"/><circle class="c" cx="40" cy="50" r="9"/><circle class="c" cx="340" cy="330" r="12"/>
    <path class="c" d="M20 380c40-40 80-40 120 0zM260 380c40-30 80-30 120 0z"/>` },
  { id: 'sailboat', name: 'Sailboat', emoji: '⛵', svg: `<rect class="c" x="0" y="0" width="400" height="280"/><rect class="c" x="0" y="280" width="400" height="120"/>
    <circle class="c" cx="80" cy="80" r="40"/><path class="c" d="M200 60v180"/><path class="c" d="M205 70l100 160H205z"/><path class="c" d="M195 90l-90 140h90z"/>
    <path class="c" d="M100 250h220l-30 50H130z"/><path class="c" d="M20 330c40-20 80-20 120 0s80 20 120 0 80-20 120 0" fill="none"/>
    <path class="c" d="M280 60c15-15 35-15 50 0-15 8-35 8-50 0z"/>` },
  { id: 'cat', name: 'Sleepy cat', emoji: '🐈', svg: `${bg}
    <ellipse class="c" cx="210" cy="280" rx="140" ry="80"/><circle class="c" cx="120" cy="230" r="70"/>
    <path class="c" d="M70 190 60 120l50 40zM170 190l10-70-50 40z"/><path class="c" d="M95 230q10 8 20 0M135 230q10 8 20 0" fill="none"/>
    <path class="c" d="M118 250l7 7 7-7z"/><path class="c" d="M330 300c40 0 50-60 20-80"/>
    <ellipse class="c" cx="200" cy="350" rx="40" ry="16"/><ellipse class="c" cx="290" cy="350" rx="40" ry="16"/>
    <path class="c" d="M240 60c0 30 40 30 40 0" fill="none"/><path class="c" d="M300 40c0 20 30 20 30 0" fill="none"/>` },
  { id: 'apple-tree', name: 'Apple tree', emoji: '🍎', svg: `${bg}
    <rect class="c" x="175" y="230" width="50" height="150"/><circle class="c" cx="200" cy="150" r="110"/>
    <circle class="c" cx="140" cy="120" r="16"/><circle class="c" cx="230" cy="90" r="16"/><circle class="c" cx="260" cy="170" r="16"/><circle class="c" cx="160" cy="200" r="16"/><circle class="c" cx="200" cy="150" r="16"/>
    <path class="c" d="M0 380h400v20H0z"/><circle class="c" cx="300" cy="370" r="14"/><path class="c" d="M60 340c20-30 40-30 60 0z"/>` },
  { id: 'phone', name: 'Rotary phone', emoji: '☎️', svg: `${bg}
    <path class="c" d="M80 360l40-150h160l40 150z"/><path class="c" d="M60 170c0-40 280-40 280 0v30H60z"/>
    <path class="c" d="M60 170c-20 0-30 30-10 40h40v-30zM340 170c20 0 30 30 10 40h-40v-30z"/>
    <circle class="c" cx="200" cy="285" r="62"/><circle class="c" cx="200" cy="285" r="22"/>
    <circle class="c" cx="200" cy="240" r="9"/><circle class="c" cx="234" cy="254" r="9"/><circle class="c" cx="246" cy="287" r="9"/><circle class="c" cx="232" cy="320" r="9"/><circle class="c" cx="168" cy="320" r="9"/><circle class="c" cx="154" cy="287" r="9"/><circle class="c" cx="166" cy="254" r="9"/>
    <path class="c" d="M320 340c40 0 60-40 40-80" fill="none"/>` },
  { id: 'radio', name: 'Vintage radio', emoji: '📻', svg: `${bg}
    <path class="c" d="M60 360V170c0-80 280-80 280 0v190z"/><path class="c" d="M90 180c0-50 220-50 220 0v80H90z"/>
    <path class="c" d="M120 180v80M150 170v90M180 165v95M210 165v95M240 165v95M270 170v90" fill="none"/>
    <rect class="c" x="90" y="285" width="140" height="40" rx="8"/><circle class="c" cx="270" cy="305" r="22"/><circle class="c" cx="310" cy="305" r="12"/>
    <rect class="c" x="80" y="360" width="40" height="20"/><rect class="c" x="280" y="360" width="40" height="20"/>
    <path class="c" d="M330 60l20-20M340 80l30-10M320 40l5-28" fill="none"/>` },
  { id: 'car', name: 'Classic car', emoji: '🚗', svg: `<rect class="c" x="0" y="0" width="400" height="300"/><rect class="c" x="0" y="300" width="400" height="100"/>
    <path class="c" d="M40 270v-50c0-20 20-30 40-30h40l40-50h110l40 50h30c20 0 30 15 30 30v50z"/>
    <path class="c" d="M170 150h45v40h-80zM225 150h45l35 40h-80z"/><circle class="c" cx="110" cy="275" r="35"/><circle class="c" cx="300" cy="275" r="35"/>
    <circle class="c" cx="110" cy="275" r="14"/><circle class="c" cx="300" cy="275" r="14"/><rect class="c" x="345" y="215" width="20" height="16"/>
    <circle class="c" cx="330" cy="70" r="34"/><path class="c" d="M40 70c20-25 60-25 80 0-20 10-60 10-80 0z"/>` },
  { id: 'sunflower', name: 'Sunflower', emoji: '🌻', svg: `${bg}
    <path class="c" d="M200 230v160"/><path class="c" d="M200 320c-40-20-60-50-60-80 40 10 60 40 60 80zM200 300c40-20 60-50 60-80-40 10-60 40-60 80z"/>
    <ellipse class="c" cx="200" cy="70" rx="22" ry="40"/><ellipse class="c" cx="200" cy="230" rx="22" ry="40"/><ellipse class="c" cx="120" cy="150" rx="40" ry="22"/><ellipse class="c" cx="280" cy="150" rx="40" ry="22"/>
    <ellipse class="c" cx="143" cy="93" rx="22" ry="40" transform="rotate(-45 143 93)"/><ellipse class="c" cx="257" cy="93" rx="22" ry="40" transform="rotate(45 257 93)"/>
    <ellipse class="c" cx="143" cy="207" rx="22" ry="40" transform="rotate(45 143 207)"/><ellipse class="c" cx="257" cy="207" rx="22" ry="40" transform="rotate(-45 257 207)"/>
    <circle class="c" cx="200" cy="150" r="52"/>` },
  { id: 'heart', name: 'Heart pattern', emoji: '💖', svg: `${bg}
    <path class="c" d="M200 350C80 260 40 190 70 130s110-50 130 10c20-60 100-70 130-10s-10 130-130 220z"/>
    <path class="c" d="M200 290c-60-45-80-80-65-110s55-25 65 5c10-30 50-35 65-5s-5 65-65 110z"/>
    <path class="c" d="M200 240c-25-18-32-32-26-44s22-10 26 2c4-12 20-14 26-2s-1 26-26 44z"/>
    <circle class="c" cx="60" cy="50" r="18"/><circle class="c" cx="340" cy="50" r="18"/><circle class="c" cx="40" cy="360" r="14"/><circle class="c" cx="360" cy="360" r="14"/>` },
];
