const fs = require('fs');

const content = fs.readFileSync('src/components/hud/StatusBarsSVG.tsx', 'utf8');

// Extract the SVG portion (from <svg to </svg>)
const svgStart = content.indexOf('<svg');
const svgEnd = content.lastIndexOf('</svg>') + 6;
let svg = content.substring(svgStart, svgEnd);

// Convert JSX to Angular HTML template
// 1. className -> class
svg = svg.replace(/className=/g, 'class=');

// 2. xmlnsXlink -> xmlns:xlink
svg = svg.replace(/xmlnsXlink=/g, 'xmlns:xlink=');

// 3. Remove JSX comments {/* ... */}
svg = svg.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

// 4. Convert style={{ imageRendering: 'pixelated' }} -> style="image-rendering: pixelated"
svg = svg.replace(/style=\{\{ imageRendering: 'pixelated' \}\}/g, 'style="image-rendering: pixelated"');

// 5. Convert dynamic width/x values
svg = svg.replace(/x=\{BAR_X_START\}/g, '[attr.x]="BAR_X_START"');
svg = svg.replace(/width=\{hpWidth\}/g, '[attr.width]="hpWidth()"');
svg = svg.replace(/width=\{staWidth\}/g, '[attr.width]="staWidth()"');
svg = svg.replace(/width=\{sanWidth\}/g, '[attr.width]="sanWidth()"');

// 6. clipPath -> clip-path in Angular (SVG attributes)
// Actually clipPath is valid SVG, keep it

// Write the result
fs.writeFileSync('src/app/components/hud/status-bars-svg.component.html', svg, 'utf8');
console.log('SVG template converted successfully!');
console.log('Output length:', svg.length, 'chars');
