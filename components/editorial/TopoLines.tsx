/**
 * Subtle PNW topographic contour line pattern, used as a section
 * background accent. Modeled on a USGS elevation map of a Cascades-style
 * ridge. Pure SVG, scales infinitely.
 */
type Props = {
  className?: string;
  /** 0–1, where 1 is fully opaque moss. Default 0.06. */
  intensity?: number;
};

export function TopoLines({ className, intensity = 0.06 }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={intensity}
      >
        {/* Concentric contour lines suggesting a ridge with a summit
            slightly right of center. Each path is one elevation band. */}
        <path d="M 0 540 C 200 520 380 510 540 500 C 700 490 860 480 1060 470 C 1130 466 1200 462 1200 462" />
        <path d="M 0 500 C 180 478 360 466 520 452 C 690 438 850 426 1040 414 C 1120 410 1200 406 1200 406" />
        <path d="M 0 462 C 160 440 340 422 500 408 C 680 394 840 382 1020 370 C 1110 364 1200 358 1200 358" />
        <path d="M 0 430 C 150 408 320 390 480 376 C 660 360 820 348 1000 334 C 1100 326 1200 318 1200 318" />
        <path d="M 0 400 C 130 378 300 360 460 348 C 640 332 800 318 980 304 C 1090 294 1200 284 1200 284" />
        <path d="M 0 372 C 120 352 280 334 440 322 C 620 308 780 296 960 282 C 1080 270 1200 256 1200 256" />
        <path d="M 0 344 C 110 326 260 310 420 298 C 600 284 760 274 940 262 C 1070 250 1200 234 1200 234" />
        <path d="M 0 320 C 100 304 240 290 400 280 C 580 266 740 256 920 246 C 1060 234 1200 216 1200 216" />
        <path d="M 0 298 C 90 284 220 274 380 264 C 560 252 720 244 900 232 C 1050 220 1200 200 1200 200" />
        <path d="M 0 280 C 80 268 200 258 360 250 C 540 240 700 232 880 222 C 1040 210 1200 188 1200 188" />
        <path d="M 100 262 C 200 252 320 246 460 238 C 600 230 720 224 860 216 C 980 208 1100 198 1180 188" />
        <path d="M 180 246 C 260 240 360 234 480 228 C 600 222 700 218 820 212 C 920 206 1020 200 1100 192" />
        <path d="M 240 232 C 320 226 400 222 500 218 C 600 214 680 212 780 208 C 880 204 980 200 1060 196" />
        <path d="M 300 222 C 360 218 420 216 520 212 C 620 208 680 206 760 204 C 840 200 920 198 1000 196" />
        <path d="M 360 214 C 400 212 460 210 540 208 C 620 206 660 204 740 202 C 800 200 860 198 940 196" />
        <path d="M 420 208 C 460 206 500 204 560 202 C 620 200 660 198 720 196 C 760 194 800 192 880 190" />
        <path d="M 480 202 C 510 200 540 198 580 196 C 620 194 660 192 700 190 C 740 188 780 186 820 184" />
        <path d="M 530 196 C 560 194 590 192 620 190 C 660 188 680 186 700 184 C 740 182 760 180 790 178" />
        <path d="M 570 190 C 590 188 610 186 640 184 C 660 182 680 180 700 178 C 720 176 740 174 760 172" />
        <path d="M 600 184 C 615 182 630 180 645 178 C 660 176 675 174 690 172 C 705 170 720 168 735 166" />
      </g>
    </svg>
  );
}
