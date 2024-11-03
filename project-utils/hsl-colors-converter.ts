function rgbToHex(r: number, g: number, b: number) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

/** hslToRgbNumbers(13, 100, 11) -> [56.1, 12.155, 0] */
function hslToRgbNumbers(h: number, s: number, l: number): number[] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const r = (n: number) => Math.round(255 * n);
  const f = (n: number) => r(l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))));
  return [f(0), f(8), f(4)];
}

function hslStrToRgbNums(hsl: string) {
  const hslNums = hsl
    .replace(/[^0-9.]+/g, ' ')
    .split(' ')
    .map(parseFloat);
  const [hDegree, sPercent, lPercent] = hslNums;
  const rgbNums = hslToRgbNumbers(hDegree, sPercent, lPercent);
  return rgbNums;
}

function hsltoRgbColor(hsl: string) {
  const rgbNums = hslStrToRgbNums(hsl);
  return rgbNums.join(' ');
}

function hsltoHexColor(hsl: string) {
  const rgbNums = hslStrToRgbNums(hsl);
  const [r, g, b] = rgbNums;
  return rgbToHex(r, g, b);
}

function replaceHslInplace(
  _matched: string,
  _prefix: string,
  _hslStr: string,
  h: string,
  s: string,
  l: string,
) {
  const rgbNums = hslToRgbNumbers(parseFloat(h), parseFloat(s), parseFloat(l));
  const [r, g, b] = rgbNums;
  /* console.log('XXX', {
   *   rgbNums,
   *   matched,
   *   prefix,
   *   hslStr,
   * });
   */
  return ': #' + rgbToHex(r, g, b);
}

/* // DEBUG
 * const hslColor = '43, 100%, 50%'; // 255, 183, 0 = FFB700
 * const result = hsltoHexColor(hslColor);
 * console.log(hslColor, '->', result);
 * debugger;
 */

const cssText = `
    --chart1ColorHSL: 43 100% 50%; // 271.5 81.3% 55.9%;
    --chart2ColorHSL: 43 100% 60%; // 270 95% 75%;
    --chart3ColorHSL: 43 100% 70%; // 270 91% 65%;
    --chart4ColorHSL: 43 100% 80%; // 269 97% 85%;
    --chart5ColorHSL: 43 100% 90%; // 269 100% 92%;
`;

const result = cssText.replace(
  /(HSL): (([0-9.]+)[, ]+([0-9.]+)%[, ]+([0-9.]+)%)/g,
  replaceHslInplace,
);
console.log('Converted colors:\n', result);
