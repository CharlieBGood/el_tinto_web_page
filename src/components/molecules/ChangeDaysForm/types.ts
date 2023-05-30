export type ChangeDaysProps = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    uuid: string;
};

export type ChangeDaysFormProps = {
    setPageState?: Function;
};