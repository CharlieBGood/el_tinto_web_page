import axios from '../axios';
import { ParamType } from './types';

// // TINTOS

// export const getTinto = (id: string | undefined) => {
//     return axios.get(`/tintos/${id}/`)
// }

// // export const getTintoMail = (id: string | undefined) => {
// //     return axios.get(`/tintos/${id}/mail/`)
// // }

// // export const fetchTintoBlocksEntries = (id: string) => {
// //     return axios.get(`tintos/${id}/blocks-entries/`);
// };

// // TINTOS BLOCKS

// export const createTintoBlock = (data: any) => {
//     return axios.post('tinto-blocks/', data);
// };

// export const patchTintoBlock = (id: string, data: any) => {
//     return axios.patch(`tinto-blocks/${id}/`, data);
// };

// // TINTOS BLOCKS ENTRIES
// export const patchTintoBlockEntry = (id: string, data: any) => {
//     return axios.patch(`tinto-blocks-entries/${id}/`, data)
// }

// export const deleteTintoBlockEntry = (id: string) => {
//     return axios.delete(`tinto-blocks-entries/${id}/`)
// }

// export const switchPositionsInTintoBlockEntries = (data: any) => {
//     return axios.post('tinto-blocks-entries/switch-positions/', data)
// }

// // TINTO BLOCK ENTRY TYPES

// export const getTintoBlockEntryTypes = () => {
//     return axios.get(`tinto-block-entry-types/`)
// }

// // NEWS TYPES

// export const getNewsTypes = () => {
//     return axios.get(`news-types/`)
// }

// USERS

export const postRegister = (data: ParamType) => {
    return axios.post('users/suscribe/', data)
}

export const deleteRegister = (data: ParamType) => {
    return axios.post('users/unsuscribe/', data)
}

export const updatePreferredDays = (data: ParamType) => {
    return axios.patch('users/update_preferred_days/', data)
}

export const getReferralHub = (getParams: ParamType) => {
    return axios.get('users/referral_hub/', {params: getParams})
}

export const postMilestoneEmail = (data: ParamType) => {
    return axios.post('users/send_milestone_mail/', data)
}

export const postUserVisits = (data: ParamType) => {
    return axios.post('users/user_visits/', data)
}

export const postUserButtonInteraction = (data: ParamType) => {
    return axios.post('users/user_button_interaction/', data)
}

// TEMPLATES

// export const getTemplates = () => {
//     return axios.get('mails/templates/')
// }

// MAILS

export const getMail = (getParams: ParamType) => {
    return axios.get('mails/', {params: getParams})
}

export const getDailyMail = (getParams: ParamType) => {
    return axios.get('mails/get_todays_tinto/', {params: getParams})
}

// NEWS
export const getNews = (id: string) => {
    return axios.get(`tinto-blocks-entries/${id}/get_web_news/`)
}