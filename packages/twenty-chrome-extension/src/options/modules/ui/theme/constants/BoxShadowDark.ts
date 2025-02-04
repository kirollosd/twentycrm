import { GRAY_SCALE } from '@/ui/theme/constants/GrayScale';
import { RGBA } from '@/ui/theme/constants/Rgba';

export const BOX_SHADOW_DARK = {
  light: `0px 2px 4px 0px ${RGBA(
    GRAY_SCALE.gray100,
    0.04,
  )}, 0px 0px 4px 0px ${RGBA(GRAY_SCALE.gray100, 0.08)}`,
  strong: `2px 4px 16px 0px ${RGBA(
    GRAY_SCALE.gray100,
    0.16,
  )}, 0px 2px 4px 0px ${RGBA(GRAY_SCALE.gray100, 0.08)}`,
  underline: `0px 1px 0px 0px ${RGBA(GRAY_SCALE.gray100, 0.32)}`,
  superHeavy: `2px 4px 16px 0px ${RGBA(
    GRAY_SCALE.gray100,
    0.12,
  )}, 0px 2px 4px 0px ${RGBA(GRAY_SCALE.gray100, 0.04)}`,
};
