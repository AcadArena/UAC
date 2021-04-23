export interface AdjustmentsProps {
    y: number;
    x: number;
    scale: number;
    flip_x?: boolean;
    flip_y?: boolean;
    font_size?: number;
  }

export const adjustmentDefaultValues:AdjustmentsProps = {
    x: 0,
    y: 0,
    scale: 0,
    flip_x: false,
    flip_y: false,
    font_size: 0
}
