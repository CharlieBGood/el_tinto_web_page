export type SuscribePaymentCardProps = {
    name: string;
    price: string;
    code: string | undefined;
    recommended: boolean;
    country: string;
    benefits: Array<string>;
    windowWidth: number;
};