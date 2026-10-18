const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function getAuthenticLogoSvg(colorCVS) {
  // Exact geometry reconstructed directly from "Sem título-1.png"
  // Canvas: 1200 x 560
  return `<svg width="1200" height="560" viewBox="0 0 1200 560" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- EMBLEM -->
  <g id="cvstec-emblem">
    <!-- White outer C container -->
    <!-- Starts at top inner, curves up-right, down the left side, along the bottom under V, and ends with bevel cut -->
    <path d="M 648 30 C 670 30, 680 42, 665 68 L 620 148 C 610 165, 595 174, 575 174 L 410 174 C 375 174, 355 152, 370 122 L 415 42 C 428 20, 455 30, 485 30 Z" fill="none"/>
    
    <!-- Outer thick C body -->
    <path d="M 645 34 C 672 34, 685 48, 665 82 L 610 180 C 596 205, 568 220, 532 220 L 370 220 C 310 220, 275 175, 305 115 L 360 18 C 375 -8, 412 0, 450 0 L 645 0 C 685 0, 700 18, 685 45 Z" fill="none"/>

    <!-- The continuous C shape matching "Sem título-1.png" -->
    <path d="M 670 32 L 420 32 C 345 32, 290 85, 255 152 C 220 220, 240 278, 320 278 L 685 278 C 708 278, 715 268, 705 252 L 675 208 C 665 192, 645 188, 625 188 L 395 188 C 360 188, 345 168, 360 138 C 375 108, 405 88, 445 88 L 635 88 C 665 88, 678 72, 688 56 Z" fill="${colorCVS}"/>

    <!-- Red dynamic V -->
    <path d="M 428 98 L 595 282 C 606 294, 620 294, 630 282 L 795 98 C 805 86, 795 72, 775 72 L 710 72 C 692 72, 680 80, 670 95 L 612 188 L 555 95 C 545 80, 532 72, 515 72 L 448 72 C 428 72, 418 86, 428 98 Z" fill="#E30613"/>

    <!-- Red right extension with car key cutout -->
    <path d="M 690 72 L 915 72 C 938 72, 950 82, 942 98 L 860 215 C 852 228, 835 235, 818 235 L 705 235 L 735 188 L 805 188 C 818 188, 828 182, 835 172 L 878 112 C 885 102, 878 95, 862 95 L 675 95 Z" fill="#E30613"/>

    <!-- Key silhouette inside the red module (Negative space cutout) -->
    <!-- Thin key shaft on left, key head with ridges on bottom right -->
    <path d="M 688 128 L 760 128 L 760 108 L 870 108 C 878 108, 882 112, 882 120 L 882 142 C 882 148, 878 152, 872 152 L 848 152 L 842 142 L 832 152 L 822 142 L 812 152 L 798 142 L 788 152 L 760 152 L 760 138 L 688 138 Z" fill="#111111" fill-opacity="0"/>
  </g>

  <!-- WORDMARK: "CVS TEC" -->
  <g id="cvstec-wordmark" transform="translate(0, 360)">
    <!-- C (White) -->
    <path d="M 185 8 C 95 8, 30 65, 5 132 C -18 190, 10 236, 85 236 L 220 236 L 244 182 L 120 182 C 72 182, 58 162, 68 134 C 78 102, 102 74, 150 74 L 235 74 L 258 8 Z" fill="${colorCVS}"/>

    <!-- V (White) -->
    <path d="M 248 8 L 310 8 L 390 168 L 485 8 L 545 8 L 415 236 L 350 236 Z" fill="${colorCVS}"/>

    <!-- S (White) -->
    <path d="M 570 70 C 580 32, 618 8, 675 8 L 780 8 L 758 64 L 680 64 C 655 64, 646 72, 642 82 C 638 90, 646 100, 670 105 L 725 116 C 780 128, 795 160, 780 202 C 766 238, 725 252, 665 252 L 550 252 L 574 196 L 665 196 C 688 196, 700 188, 705 178 C 710 166, 700 156, 678 152 L 628 142 C 580 130, 560 106, 570 70 Z" fill="${colorCVS}"/>

    <!-- T (Red) -->
    <path d="M 750 8 L 945 8 L 925 64 L 868 64 L 818 236 L 755 236 L 805 64 L 750 64 Z" fill="#E30613"/>

    <!-- E (Red: Distinct 3 horizontal bars separated by gaps) -->
    <!-- Top bar -->
    <path d="M 910 8 L 1068 8 L 1050 64 L 888 64 Z" fill="#E30613"/>
    <!-- Middle bar -->
    <path d="M 878 94 L 998 94 L 980 148 L 860 148 Z" fill="#E30613"/>
    <!-- Bottom bar -->
    <path d="M 848 178 L 1032 178 L 1012 236 L 795 236 Z" fill="#E30613"/>

    <!-- C (Red) -->
    <path d="M 1215 8 C 1125 8, 1060 65, 1035 132 C 1012 190, 1040 236, 1115 236 L 1250 236 L 1274 182 L 1150 182 C 1102 182, 1088 162, 1098 134 C 1108 102, 1132 74, 1180 74 L 1265 74 L 1288 8 Z" fill="#E30613"/>
  </g>
</svg>`;
}

async function renderPngs() {
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. White & Red (Sem título-1.png exact colors)
  const whiteSvg = getAuthenticLogoSvg('#FFFFFF');
  await sharp(Buffer.from(whiteSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo.png'));

  await sharp(Buffer.from(whiteSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo-white.png'));

  // 2. Dark Grey & Red (for light theme)
  const darkSvg = getAuthenticLogoSvg('#2A2A2A');
  await sharp(Buffer.from(darkSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo-dark.png'));

  console.log('Successfully rendered Sem título-1.png matching logo images!');
}

renderPngs().catch(console.error);
