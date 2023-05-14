export type ChangeDaysProps = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    email: string;
};

export type ChangeDaysFormProps = {
    setPageState?: Function;
};