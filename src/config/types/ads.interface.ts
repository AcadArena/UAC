import { AdjustmentsProps } from "./adjustments.interface";

export interface AdProps {
    img?: {
        url: string
        adj?: ImageAdjustmentProps
    }
    head?: {
        text: string;
        adj?: Partial<AdjustmentsProps>
    }
    content: {
        text: string;
        adj?: Partial<AdjustmentsProps>
    }
}

export interface ImageAdjustmentProps extends AdjustmentsProps { 
    h: number; 
    w: number;
}