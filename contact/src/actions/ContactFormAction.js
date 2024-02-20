import { CONTACT_FORM_UPDATE } from "./types"


export const contactFormUpdate = ({ prop, value }) => {
    return {
        type: CONTACT_FORM_UPDATE,
        payload: { prop, value }
    }
}