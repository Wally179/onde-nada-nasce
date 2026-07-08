'use client';

/**
 * StatusBarsSVG — Renders the FULL pixel-art HUD as inline SVG:
 *   - Left: circular portrait frame with embedded character image
 *   - Center: HP / Stamina / Sanity bars with dynamic clipPath
 *   - Right: decorative vine panel with status icons
 *
 * The portrait image is placed behind the pixel-art circle frame
 * using a circular clipPath, so the frame overlays the image naturally.
 */

interface StatusBarsSVGProps {
  hpPercent: number;      // 0–100
  staminaPercent: number; // 0–100
  sanityPercent: number;  // 0–100
}

// Constants for bar geometry
const BAR_X_START = 135.225;
const BAR_X_END = 333.296;
const BAR_WIDTH = BAR_X_END - BAR_X_START; // ~198.07

export default function StatusBarsSVG({
  hpPercent,
  staminaPercent,
  sanityPercent,
}: StatusBarsSVGProps) {
  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  const hpWidth = (clamp(hpPercent) / 100) * BAR_WIDTH;
  const staWidth = (clamp(staminaPercent) / 100) * BAR_WIDTH;
  const sanWidth = (clamp(sanityPercent) / 100) * BAR_WIDTH;

  return (
    <svg
      viewBox="0 0 379 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="w-full h-auto"
      style={{ imageRendering: 'pixelated' }}
    >
      <defs>
        {/* Clip paths for dynamic bars */}
        <clipPath id="clip-hp-bar">
          <rect x={BAR_X_START} y="0" width={hpWidth} height="45" />
        </clipPath>
        <clipPath id="clip-stamina-bar">
          <rect x={BAR_X_START} y="44" width={staWidth} height="40" />
        </clipPath>
        <clipPath id="clip-sanity-bar">
          <rect x={BAR_X_START} y="82" width={sanWidth} height="40" />
        </clipPath>
        {/* Circular clip for the portrait image */}
        <clipPath id="clip-portrait">
          <circle cx="61" cy="61" r="37" />
        </clipPath>
      </defs>

      {/* The portrait image will be rendered BEHIND this SVG via HTML */}
      {/* Outer black frame (#140C1C) */}

      {/* Outer black frame (#140C1C) */}
      <rect x="76.1809" y="3.80902" width="57.1357" height="3.80905" fill="#140C1C"/>
      <rect x="45.7086" width="30.4724" height="3.80905" fill="#140C1C"/>
      <rect x="38.0905" y="3.80902" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="26.6633" y="7.6181" width="11.4271" height="3.80905" fill="#140C1C"/>
      <rect x="22.8542" y="3.80902" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="7.6181" width="15.2362" height="3.80905" fill="#140C1C"/>
      <rect x="3.80902" y="3.80902" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect y="7.6181" width="3.80905" height="15.2362" fill="#140C1C"/>
      <rect x="3.80902" y="22.8542" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="7.6181" y="26.6633" width="3.80905" height="11.4271" fill="#140C1C"/>
      <rect x="3.80902" y="38.0905" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect y="45.7086" width="3.80905" height="30.4724" fill="#140C1C"/>
      <rect x="3.80902" y="76.1809" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="7.6181" y="83.799" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="11.4271" y="91.4171" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="15.2362" y="99.0352" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="19.0452" y="102.844" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="22.8542" y="106.653" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="26.6633" y="110.462" width="11.4271" height="3.80905" fill="#140C1C"/>
      <rect x="38.0905" y="114.271" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="45.7086" y="118.08" width="30.4724" height="3.80905" fill="#140C1C"/>
      <rect x="76.1809" y="114.271" width="57.1357" height="3.80905" fill="#140C1C"/>
      <rect x="83.799" y="110.462" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="91.4171" y="106.653" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="95.2261" y="102.844" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="102.844" y="99.0352" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="106.653" y="91.4171" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="110.462" y="83.799" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="114.271" y="79.9899" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="118.08" y="76.1809" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="121.889" y="79.9899" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="125.698" y="76.1809" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="129.508" y="79.9899" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="114.271" y="60.9447" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="114.271" y="41.8995" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="118.08" y="38.0905" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="121.889" y="41.8995" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="125.698" y="38.0905" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="129.508" y="41.8995" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="110.462" y="30.4724" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="106.653" y="22.8542" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="99.0352" y="15.2362" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="91.4171" y="11.4271" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="83.799" y="7.6181" width="7.61809" height="3.80905" fill="#140C1C"/>

      {/* Inner circle black outline */}
      <rect x="49.5176" y="15.2362" width="22.8543" height="3.80905" fill="#140C1C"/>
      <rect x="72.3718" y="19.0452" width="11.4271" height="3.80905" fill="#140C1C"/>
      <rect x="83.799" y="22.8542" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="87.608" y="26.6633" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="91.4171" y="30.4724" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="95.2261" y="34.2814" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="99.0352" y="38.0905" width="3.80905" height="11.4271" fill="#140C1C"/>
      <rect x="102.844" y="49.5176" width="3.80905" height="22.8543" fill="#140C1C"/>
      <rect x="99.0352" y="72.3718" width="3.80905" height="11.4271" fill="#140C1C"/>
      <rect x="95.2261" y="83.799" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="91.4171" y="87.608" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="87.608" y="91.4171" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="83.799" y="95.2261" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="72.3718" y="99.0352" width="11.4271" height="3.80905" fill="#140C1C"/>
      <rect x="49.5176" y="102.844" width="22.8543" height="3.80905" fill="#140C1C"/>
      <rect x="38.0905" y="99.0352" width="11.4271" height="3.80905" fill="#140C1C"/>
      <rect x="34.2814" y="95.2261" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="30.4724" y="91.4171" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="26.6633" y="87.608" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="22.8542" y="83.799" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="19.0452" y="72.3718" width="3.80905" height="11.4271" fill="#140C1C"/>
      <rect x="15.2362" y="49.5176" width="3.80905" height="22.8543" fill="#140C1C"/>
      <rect x="19.0452" y="38.0905" width="3.80905" height="11.4271" fill="#140C1C"/>
      <rect x="22.8542" y="34.2814" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="26.6633" y="30.4724" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="30.4724" y="26.6633" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="34.2814" y="22.8542" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="38.0905" y="19.0452" width="11.4271" height="3.80905" fill="#140C1C"/>

      {/* Green vine frame — medium green (#709775) */}
      <rect x="95.2266" y="7.61853" width="38.0905" height="3.80905" fill="#709775"/>
      <rect x="99.0356" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="110.463" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="125.699" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="129.508" y="15.2366" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="121.89" y="15.2366" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="125.699" y="19.0457" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="114.272" y="15.2366" width="3.80905" height="15.2362" fill="#709775"/>
      <rect x="118.081" y="19.0457" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="26.6638" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="121.89" y="34.2819" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="15.2366" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="110.463" y="19.0457" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="76.1813" y="7.61853" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="45.7089" y="3.80951" width="30.4724" height="3.80905" fill="#709775"/>
      <rect x="68.5632" y="7.61853" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="60.9451" y="7.61853" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="64.7542" y="11.4276" width="26.6633" height="3.80905" fill="#709775"/>
      <rect x="76.1813" y="15.2366" width="22.8543" height="3.80905" fill="#709775"/>
      <rect x="83.7994" y="19.0457" width="19.0452" height="3.80905" fill="#709775"/>
      <rect x="91.4175" y="22.8547" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="95.2266" y="26.6638" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="99.0356" y="30.4728" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="99.0356" y="34.2819" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="102.845" y="38.0909" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="102.845" y="41.9" width="7.61809" height="7.61809" fill="#709775"/>
      <rect x="110.463" y="45.709" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="118.081" y="45.709" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="121.89" y="49.5181" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="129.508" y="49.5181" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="125.699" y="53.3271" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="53.3271" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="57.1362" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="57.1362" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="110.463" y="60.9452" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="60.9452" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="125.699" y="64.7542" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="64.7542" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="64.7542" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="110.463" y="68.5633" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="121.89" y="68.5633" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="106.654" y="72.3723" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="76.1814" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="110.463" y="79.9904" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="102.845" y="83.7994" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="83.7994" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="121.89" y="87.6085" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="129.508" y="87.6085" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="114.272" y="87.6085" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="99.0356" y="87.6085" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="95.2266" y="91.4175" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="91.4175" y="95.2266" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="87.6085" y="99.0356" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="83.7994" y="102.845" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="72.3723" y="106.654" width="15.2362" height="3.80905" fill="#709775"/>
      <rect x="110.463" y="91.4175" width="3.80905" height="15.2362" fill="#709775"/>
      <rect x="106.654" y="95.2266" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="102.845" y="102.845" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="99.0356" y="106.654" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="106.654" y="106.654" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="114.272" y="95.2266" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="118.081" y="91.4175" width="3.80905" height="15.2362" fill="#709775"/>
      <rect x="114.272" y="102.845" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="121.89" y="95.2266" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="125.699" y="91.4175" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="129.508" y="95.2266" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="125.699" y="106.654" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="68.5632" y="110.463" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="64.7542" y="106.654" width="3.80905" height="11.4271" fill="#709775"/>
      <rect x="38.0909" y="110.463" width="26.6633" height="3.80905" fill="#709775"/>
      <rect x="45.7089" y="114.272" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="57.1361" y="114.272" width="1.90452" height="3.80905" fill="#709775"/>
      <rect x="53.327" y="106.654" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="30.4728" y="102.845" width="19.0452" height="7.61809" fill="#709775"/>
      <rect x="30.4728" y="99.0356" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="22.8547" y="95.2266" width="7.61809" height="11.4271" fill="#709775"/>
      <rect x="22.8547" y="91.4175" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="19.0457" y="83.7994" width="3.80905" height="19.0452" fill="#709775"/>
      <rect x="15.2366" y="76.1814" width="3.80905" height="22.8543" fill="#709775"/>
      <rect x="11.4276" y="64.7542" width="3.80905" height="26.6633" fill="#709775"/>
      <rect x="7.61847" y="76.1814" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="3.80945" y="45.709" width="3.80905" height="30.4724" fill="#709775"/>
      <rect x="7.61847" y="68.5633" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="7.61847" y="60.9452" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="11.4276" y="57.1362" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="11.4276" y="45.709" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="7.61847" y="38.0909" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="15.2366" y="38.0909" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="11.4276" y="30.4728" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="19.0457" y="30.4728" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="22.8547" y="26.6638" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="26.6637" y="22.8547" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="30.4728" y="19.0457" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="38.0909" y="15.2366" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="45.7089" y="11.4276" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="38.0909" y="7.61853" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="26.6637" y="11.4276" width="11.4271" height="3.80905" fill="#709775"/>
      <rect x="22.8547" y="15.2366" width="7.61809" height="3.80905" fill="#709775"/>
      <rect x="22.8547" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="22.8547" y="22.8547" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="57.1361" y="11.4276" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="19.0457" y="19.0457" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="15.2366" y="22.8547" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="11.4276" y="19.0457" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="7.61847" y="15.2366" width="3.80905" height="7.61809" fill="#709775"/>
      <rect x="3.80945" y="19.0457" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="3.80945" y="7.61853" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="7.61847" y="3.80951" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="15.2366" y="7.61853" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="19.0457" y="3.80951" width="3.80905" height="11.4271" fill="#709775"/>

      {/* Light green (#8FB996) */}
      <rect x="102.845" y="11.4276" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="110.463" y="15.2366" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="114.272" y="11.4276" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="118.081" y="15.2366" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="121.89" y="11.4276" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="129.508" y="11.4276" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="125.699" y="15.2366" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="72.3723" y="7.61853" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="64.7542" y="7.61853" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="45.7089" y="7.61853" width="15.2362" height="3.80905" fill="#8FB996"/>
      <rect x="38.0909" y="11.4276" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="30.4728" y="15.2366" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="22.8547" y="19.0457" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="19.0457" y="15.2366" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="22.8547" y="7.61853" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="15.2366" y="11.4276" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="11.4276" y="15.2366" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="11.4276" y="3.80951" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="7.61847" y="7.61853" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="3.80945" y="11.4276" width="3.80905" height="7.61809" fill="#8FB996"/>
      <rect x="15.2366" y="19.0457" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="19.0457" y="22.8547" width="3.80905" height="7.61809" fill="#8FB996"/>
      <rect x="7.61847" y="22.8547" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="15.2366" y="30.4728" width="3.80905" height="7.61809" fill="#8FB996"/>
      <rect x="11.4276" y="38.0909" width="3.80905" height="7.61809" fill="#8FB996"/>
      <rect x="7.61847" y="45.709" width="3.80905" height="15.2362" fill="#8FB996"/>
      <rect x="7.61847" y="64.7542" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="7.61847" y="72.3723" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="49.518" y="106.654" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="60.9451" y="106.654" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="68.5632" y="106.654" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="72.3723" y="102.845" width="11.4271" height="3.80905" fill="#8FB996"/>
      <rect x="83.7994" y="99.0356" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="99.0356" y="83.7994" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="102.845" y="72.3723" width="3.80905" height="11.4271" fill="#8FB996"/>
      <rect x="114.272" y="91.4175" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="118.081" y="87.6085" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="125.699" y="87.6085" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="121.89" y="91.4175" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="129.508" y="91.4175" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="106.654" y="68.5633" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="106.654" y="60.9452" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="106.654" y="49.5181" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="118.081" y="49.5181" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="121.89" y="53.3271" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="125.699" y="49.5181" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="129.508" y="53.3271" width="3.80905" height="3.80905" fill="#8FB996"/>

      {/* Dark green (#415D43) */}
      <rect x="11.4284" y="7.61945" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="7.61938" y="11.4285" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="11.4284" y="11.4285" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="15.2375" y="15.2375" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="11.4284" y="26.6647" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="19.0465" y="34.2828" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="22.8556" y="30.4737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="26.6646" y="26.6647" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="30.4736" y="22.8557" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="34.2827" y="19.0466" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="45.7098" y="15.2375" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="53.3279" y="11.4285" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="60.946" y="11.4285" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="72.3732" y="15.2375" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="91.4184" y="7.61945" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="95.2274" y="11.4285" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="87.6093" y="22.8557" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="102.846" y="15.2375" width="3.80905" height="7.61809" fill="#415D43"/>
      <rect x="91.4184" y="26.6647" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="95.2274" y="30.4737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="110.464" y="26.6647" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="118.082" y="22.8557" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="121.891" y="26.6647" width="3.80905" height="7.61809" fill="#415D43"/>
      <rect x="125.7" y="30.4737" width="3.80905" height="7.61809" fill="#415D43"/>
      <rect x="129.509" y="26.6647" width="3.80905" height="15.2362" fill="#415D43"/>
      <rect x="114.273" y="30.4737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="110.464" y="34.2828" width="11.4271" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="38.0918" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="121.891" y="38.0918" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="110.464" y="41.9009" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="118.082" y="41.9009" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="125.7" y="41.9009" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="45.7099" width="3.80905" height="7.61809" fill="#415D43"/>
      <rect x="114.273" y="57.137" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="64.7551" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="121.891" y="64.7551" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="118.082" y="68.5641" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="125.7" y="68.5641" width="7.61809" height="7.61809" fill="#415D43"/>
      <rect x="129.509" y="76.1823" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="72.3732" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="110.464" y="76.1823" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="121.891" y="76.1823" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="118.082" y="79.9913" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="125.7" y="79.9913" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="83.8004" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="106.655" y="87.6094" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="102.846" y="95.2275" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="95.2274" y="87.6094" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="91.4184" y="91.4185" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="87.6093" y="95.2275" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="99.0365" y="99.0366" width="3.80905" height="7.61809" fill="#415D43"/>
      <rect x="106.655" y="102.846" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="114.273" y="99.0366" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="110.464" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="125.7" y="102.846" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="118.082" y="106.655" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="129.509" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="102.846" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="95.2274" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="91.4184" y="110.464" width="41.8995" height="3.80905" fill="#415D43"/>
      <rect x="87.6093" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="79.9913" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="68.5641" y="114.273" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="60.946" y="114.273" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="53.3279" y="114.273" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="30.4736" y="95.2275" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="26.6646" y="91.4185" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="22.8556" y="87.6094" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="15.2375" y="72.3732" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="11.4284" y="60.9461" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="11.4284" y="53.328" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="15.2375" y="45.7099" width="3.80905" height="3.80905" fill="#415D43"/>

      {/* Inner circle dark outline (#111D13) */}
      <rect x="49.5168" y="19.0445" width="22.8543" height="3.80905" fill="#111D13"/>
      <rect x="38.0897" y="22.8535" width="11.4271" height="3.80905" fill="#111D13"/>
      <rect x="72.3711" y="22.8535" width="11.4271" height="3.80905" fill="#111D13"/>
      <rect x="83.7982" y="26.6626" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="87.6072" y="30.4716" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="91.4163" y="34.2807" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="95.2253" y="38.0897" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="34.2806" y="26.6626" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="30.4716" y="30.4716" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="26.6625" y="34.2807" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="22.8535" y="38.0897" width="3.80905" height="11.4271" fill="#111D13"/>
      <rect x="19.0444" y="49.5168" width="3.80905" height="22.8543" fill="#111D13"/>
      <rect x="22.8535" y="72.3712" width="3.80905" height="11.4271" fill="#111D13"/>
      <rect x="26.6625" y="83.7983" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="30.4716" y="87.6073" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="34.2806" y="91.4164" width="3.80905" height="3.80905" fill="#111D13"/>
      <rect x="38.0897" y="95.2254" width="3.80905" height="3.80905" fill="#111D13"/>

      {/* Bottom detail pixels (#757161) */}
      <rect x="53.3252" y="99.0337" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="64.7523" y="99.0337" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="72.3704" y="95.2246" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="79.9885" y="95.2246" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="83.7975" y="91.4156" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="87.6066" y="87.6066" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="91.4156" y="83.7975" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="95.2247" y="79.9885" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="95.2247" y="72.3704" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="99.0338" y="64.7523" width="3.80905" height="3.80905" fill="#757161"/>
      <rect x="99.0338" y="53.3251" width="3.80905" height="3.80905" fill="#757161"/>

      {/* ═══════════════════════════════════════════════════
          BAR FRAMES — always visible
          ═══════════════════════════════════════════════════ */}

      {/* HP frame */}
      <rect x="131.424" y="7.6217" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="131.424" y="34.285" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="333.303" y="7.6217" width="3.80905" height="30.4724" fill="#140C1C"/>
      <rect x="131.424" y="7.6217" width="3.80905" height="30.4724" fill="#140C1C"/>

      {/* Stamina frame */}
      <rect x="131.424" y="45.7134" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="131.424" y="72.3767" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="333.303" y="45.7134" width="3.80905" height="30.4724" fill="#140C1C"/>
      <rect x="131.424" y="45.7134" width="3.80905" height="30.4724" fill="#140C1C"/>

      {/* Sanity frame */}
      <rect x="131.424" y="83.8008" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="131.424" y="110.464" width="205.688" height="3.80905" fill="#140C1C"/>
      <rect x="333.303" y="83.8008" width="3.80905" height="30.4724" fill="#140C1C"/>
      <rect x="131.424" y="83.8008" width="3.80905" height="30.4724" fill="#140C1C"/>

      {/* Inter-bar connectors */}
      <rect x="131.422" y="76.1845" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="333.301" y="76.1845" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="131.422" y="38.0941" width="3.80905" height="7.61809" fill="#140C1C"/>
      <rect x="333.301" y="38.0941" width="3.80905" height="7.61809" fill="#140C1C"/>

      {/* Inner frame borders (gray #4E4A4E) */}
      <rect x="135.225" y="11.4303" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="135.225" y="30.4755" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="329.487" y="15.2393" width="3.80905" height="15.2362" fill="#4E4A4E"/>
      <rect x="135.225" y="49.5175" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="135.225" y="68.5627" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="329.487" y="53.3265" width="3.80905" height="15.2362" fill="#4E4A4E"/>
      <rect x="135.225" y="87.6085" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="135.225" y="106.654" width="198.07" height="3.80905" fill="#4E4A4E"/>
      <rect x="329.487" y="91.4175" width="3.80905" height="15.2362" fill="#4E4A4E"/>

      {/* ═══════════════════════════════════════════════════
          HP BAR (RED) — clipped by hpPercent
          ═══════════════════════════════════════════════════ */}
      <g clipPath="url(#clip-hp-bar)">
        <rect x="135.226" y="15.2425" width="3.34852" height="15.2362" fill="#D04648"/>
        <rect x="138.574" y="22.8606" width="167.426" height="7.61809" fill="#D04648"/>
        <rect x="138.574" y="15.2425" width="167.426" height="7.61809" fill="#D2AA99"/>
      </g>

      {/* ═══════════════════════════════════════════════════
          STAMINA BAR (BLUE) — clipped by staminaPercent
          ═══════════════════════════════════════════════════ */}
      <g clipPath="url(#clip-stamina-bar)">
        <rect x="135.226" y="53.3297" width="2.76028" height="15.2362" fill="#597DCE"/>
        <rect x="137.986" y="60.9478" width="138.014" height="7.61809" fill="#597DCE"/>
        <rect x="137.986" y="53.3297" width="138.014" height="7.61809" fill="#6DC2CA"/>
      </g>

      {/* ═══════════════════════════════════════════════════
          SANITY BAR (GREEN) — clipped by sanityPercent
          ═══════════════════════════════════════════════════ */}
      <g clipPath="url(#clip-sanity-bar)">
        <rect x="135.226" y="91.4207" width="2.5446" height="15.2362" fill="#6DAA2C"/>
        <rect x="137.77" y="99.0388" width="127.23" height="7.61809" fill="#6DAA2C"/>
        <rect x="137.77" y="91.4207" width="127.23" height="7.61809" fill="#709775"/>
      </g>

      {/* ═══════════════════════════════════════════════════
          RIGHT-SIDE DECORATIVE PANEL
          ═══════════════════════════════════════════════════ */}

      {/* Panel frame */}
      <rect x="337.102" y="3.81085" width="22.8543" height="3.80905" fill="#140C1C"/>
      <rect x="359.957" y="7.61987" width="3.80905" height="106.653" fill="#140C1C"/>
      <rect x="337.102" y="114.273" width="22.8543" height="3.80905" fill="#140C1C"/>

      {/* Right side notches */}
      <rect x="363.765" y="110.462" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="371.383" y="106.653" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="375.192" y="91.4167" width="3.80905" height="15.2362" fill="#140C1C"/>
      <rect x="371.383" y="87.6076" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="363.765" y="83.7986" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="363.765" y="72.3715" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="371.383" y="68.5624" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="375.192" y="53.3262" width="3.80905" height="15.2362" fill="#140C1C"/>
      <rect x="371.383" y="49.5172" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="363.765" y="45.7081" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="363.765" y="34.2837" width="7.61809" height="3.80905" fill="#140C1C"/>
      <rect x="371.383" y="30.4746" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="375.192" y="15.2385" width="3.80905" height="15.2362" fill="#140C1C"/>
      <rect x="371.383" y="11.4294" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="363.765" y="7.62036" width="7.61809" height="3.80905" fill="#140C1C"/>

      {/* Plant decoration — top cluster */}
      <rect x="337.103" y="7.61987" width="22.8543" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="11.4289" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="11.4289" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="11.4289" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="15.238" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="15.238" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="19.047" width="22.8543" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="15.238" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="11.4289" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="337.103" y="11.4289" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="340.912" y="15.238" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="348.53" y="15.238" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="352.34" y="11.4289" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="356.149" y="15.238" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="337.103" y="22.8561" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="22.8561" width="11.4271" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="26.6651" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="26.6651" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="30.4741" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="30.4741" width="7.61809" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="34.2832" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="34.2832" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="26.6651" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="22.8561" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="26.6651" width="7.61809" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="22.8561" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="30.4741" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="30.4741" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="34.2832" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="38.0922" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="38.0922" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="34.2832" width="11.4271" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="38.0922" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="41.9013" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="41.9013" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="41.9013" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="45.7103" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="41.9013" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="340.912" y="38.0922" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="348.53" y="38.0922" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="356.149" y="38.0922" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="344.721" y="41.9013" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="352.34" y="41.9013" width="3.80905" height="3.80905" fill="#140C1C"/>

      {/* Center column vine */}
      <rect x="342.817" y="68.5646" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="346.626" y="53.3284" width="3.80905" height="15.2362" fill="#8FB996"/>
      <rect x="342.817" y="49.5193" width="3.80905" height="3.80905" fill="#8FB996"/>

      {/* Vine columns x=337 through x=356 */}
      <rect x="337.103" y="45.7103" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="49.5193" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="337.103" y="53.3284" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="60.9465" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="64.7556" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="68.5646" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="72.3737" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="76.1827" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="79.9918" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="337.103" y="83.8008" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="87.6098" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="337.103" y="91.4189" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="99.037" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="337.103" y="102.846" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="106.655" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="337.103" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      <rect x="340.912" y="49.5193" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="53.3284" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="340.912" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="60.9465" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="64.7556" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="68.5646" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="72.3737" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="76.1827" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="340.912" y="79.9918" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="83.8008" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="87.6098" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="91.4189" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="340.912" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="99.037" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="102.846" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="340.912" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="340.912" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      <rect x="344.721" y="45.7103" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="49.5193" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="344.721" y="53.3284" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="60.9465" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="64.7556" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="68.5646" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="72.3737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="76.1827" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="79.9918" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="344.721" y="83.8008" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="87.6098" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="344.721" y="91.4189" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="99.037" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="102.846" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="344.721" y="106.655" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="344.721" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      <rect x="348.53" y="45.7103" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="49.5193" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="53.3284" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="348.53" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="60.9465" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="64.7556" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="68.5646" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="72.3737" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="76.1827" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="348.53" y="79.9918" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="83.8008" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="87.6098" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="91.4189" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="348.53" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="99.037" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="102.846" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="348.53" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="348.53" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      <rect x="352.34" y="45.7103" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="49.5193" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="352.34" y="53.3284" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="60.9465" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="64.7556" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="68.5646" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="72.3737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="76.1827" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="79.9918" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="352.34" y="83.8008" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="87.6098" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="352.34" y="91.4189" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="99.037" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="102.846" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="352.34" y="106.655" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="352.34" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      <rect x="356.149" y="45.7103" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="49.5193" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="53.3284" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="356.149" y="57.1375" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="60.9465" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="64.7556" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="68.5646" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="72.3737" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="76.1827" width="3.80905" height="3.80905" fill="#140C1C"/>
      <rect x="356.149" y="79.9918" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="83.8008" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="87.6098" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="91.4189" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="356.149" y="95.2279" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="99.037" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="102.846" width="3.80905" height="3.80905" fill="#8FB996"/>
      <rect x="356.149" y="106.655" width="3.80905" height="3.80905" fill="#415D43"/>
      <rect x="356.149" y="110.464" width="3.80905" height="3.80905" fill="#415D43"/>

      {/* ═══════════════════════════════════════════════════
          STATUS ICONS (heart, lightning, eye)
          ═══════════════════════════════════════════════════ */}

      {/* HP icon (heart — red) */}
      <rect x="363.764" y="11.429" width="3.80905" height="15.2362" fill="#D04648"/>
      <rect width="3.80905" height="3.80905" transform="matrix(1 0 0 -1 363.764 34.2832)" fill="#D04648"/>
      <rect x="367.573" y="26.6652" width="7.61809" height="3.80905" fill="#D04648"/>
      <rect x="367.573" y="19.0471" width="3.80905" height="7.61809" fill="#D04648"/>
      <rect x="371.382" y="15.238" width="3.80905" height="7.61809" fill="#D04648"/>
      <rect x="367.573" y="11.429" width="3.80905" height="3.80905" fill="#D04648"/>
      <rect x="367.573" y="15.238" width="3.80905" height="3.80905" fill="#D2AA99"/>
      <rect x="363.764" y="26.6652" width="3.80905" height="3.80905" fill="#442434"/>
      <rect x="371.382" y="22.8561" width="3.80905" height="3.80905" fill="#442434"/>
      <rect x="367.573" y="30.4742" width="3.80905" height="3.80905" fill="#442434"/>

      {/* Stamina icon (lightning — blue) */}
      <rect x="363.764" y="49.5161" width="3.80905" height="15.2362" fill="#597DCE"/>
      <rect width="3.80905" height="3.80905" transform="matrix(1 0 0 -1 363.764 72.3704)" fill="#597DCE"/>
      <rect x="367.573" y="64.7523" width="7.61809" height="3.80905" fill="#597DCE"/>
      <rect x="367.573" y="57.1342" width="3.80905" height="7.61809" fill="#597DCE"/>
      <rect x="371.382" y="53.3251" width="3.80905" height="7.61809" fill="#597DCE"/>
      <rect x="367.573" y="49.5161" width="3.80905" height="3.80905" fill="#597DCE"/>
      <rect x="367.573" y="53.3251" width="3.80905" height="3.80905" fill="#6DC2CA"/>
      <rect x="363.764" y="64.7523" width="3.80905" height="3.80905" fill="#30346D"/>
      <rect x="371.382" y="60.9432" width="3.80905" height="3.80905" fill="#30346D"/>
      <rect x="367.573" y="68.5613" width="3.80905" height="3.80905" fill="#30346D"/>

      {/* Sanity icon (eye — green) */}
      <rect x="363.764" y="87.6072" width="3.80905" height="15.2362" fill="#6DAA2C"/>
      <rect width="3.80905" height="3.80905" transform="matrix(1 0 0 -1 363.764 110.461)" fill="#6DAA2C"/>
      <rect x="367.573" y="102.843" width="7.61809" height="3.80905" fill="#6DAA2C"/>
      <rect x="367.573" y="95.2253" width="3.80905" height="7.61809" fill="#6DAA2C"/>
      <rect x="371.382" y="91.4162" width="3.80905" height="7.61809" fill="#6DAA2C"/>
      <rect x="367.573" y="87.6072" width="3.80905" height="3.80905" fill="#6DAA2C"/>
      <rect x="367.573" y="91.4162" width="3.80905" height="3.80905" fill="#709775"/>
      <rect x="363.764" y="102.843" width="3.80905" height="3.80905" fill="#346524"/>
      <rect x="371.382" y="99.0343" width="3.80905" height="3.80905" fill="#346524"/>
      <rect x="367.573" y="106.652" width="3.80905" height="3.80905" fill="#346524"/>
    </svg>
  );
}
