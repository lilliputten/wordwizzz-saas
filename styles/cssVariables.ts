/** @desc Re-export parsed and typed scss variables */

import * as cssVariables from './variables-export.scss';

// See pre-exports in `variables-export.scss`
export interface TVariables {
  // Colors
  primaryColor: string;
  primaryForegroundColor: string;
  secondaryColor: string;
  secondaryForegroundColor: string;
  appOrangeColor: string;
  appOrangeForegroundColor: string;
  appBlueColor: string;
  appBlueForegroundColor: string;

  // Adaptive layouts
  smallTreshold: string;
  smallTresholdPx: number;
  mobileTreshold: string;
  mobileTresholdPx: number;
  wideTreshold: string;
  wideTresholdPx: number;

  // Delays
  transitionTimeMs: string;
  transitionTimeMsPx: number;
  animationTimeMs: string;
  animationTimeMsPx: number;
  disappearTimeMs: string;
  disappearTimeMsPx: number;
}

const vars = cssVariables as TVariables;

const {
  // Colors
  primaryColor,
  primaryForegroundColor,
  secondaryColor,
  secondaryForegroundColor,
  appOrangeColor,
  appOrangeForegroundColor,
  appBlueColor,
  appBlueForegroundColor,

  // Adaptive layouts
  smallTreshold,
  mobileTreshold,
  wideTreshold,

  // Delays
  transitionTimeMs,
  animationTimeMs,
  disappearTimeMs,
} = vars;

const smallTresholdPx = parseInt(smallTreshold);
const mobileTresholdPx = parseInt(mobileTreshold);
const wideTresholdPx = parseInt(wideTreshold);

const transitionTimeMsPx = parseInt(transitionTimeMs);
const animationTimeMsPx = parseInt(animationTimeMs);
const disappearTimeMsPx = parseInt(disappearTimeMs);

export {
  // Colors
  primaryColor,
  primaryForegroundColor,
  secondaryColor,
  secondaryForegroundColor,
  appOrangeColor,
  appOrangeForegroundColor,
  appBlueColor,
  appBlueForegroundColor,

  // Adaptive layouts
  smallTreshold,
  smallTresholdPx,
  mobileTreshold,
  mobileTresholdPx,
  wideTreshold,
  wideTresholdPx,

  // Delays
  transitionTimeMs,
  transitionTimeMsPx,
  animationTimeMs,
  animationTimeMsPx,
  disappearTimeMs,
  disappearTimeMsPx,
};
