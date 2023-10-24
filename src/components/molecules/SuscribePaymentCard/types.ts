export type SuscribePaymentCardProps = {
    name: string;
    price: string;
    image: string;
    code: string | undefined;
    recommended: boolean;
    benefits: Array<string>;
    windowWidth: number;
};