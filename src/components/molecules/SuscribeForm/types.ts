export type SuscribeProps = {
    email: string;
    first_name?: string;
    last_name?: string;
    referral_code?: string;
    utm_source?:string;
    medium?:string;
};

export type SuscribeFormProps = {
  navigateToSuscribeConfirmation?: Function;
  handlePopUpClose?: Function;
  searchParams?: any;
  popUp: boolean;
}