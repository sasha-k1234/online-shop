
const EditState = {
    editId:-1,
    editContact:null,
    editables:[],
    nameInput:'',
    phoneINput:'',
    emailInput:''
}

const SETEDITABLES = 'SETEDITABLES';
const EDITING = 'EDITING';
const SET_EDIT_CONTACT = 'SETEDITCONTACT';
const SETNAME = 'SETNAME';
const SETEMAIL = 'SETEMAIL';
const SETPHONE = 'SETPHONE';

export const EditReducer = (state=EditState,action) =>{

    switch(action.type){
        case SETEDITABLES:
            let edArr = [...state.editables,action.payload]
            return {...state,editables:edArr}
        case EDITING:
            let edit = state.editables.find(el=>el.id == action.payload.id);
            return {...state}
        case SET_EDIT_CONTACT:
            return {...state,editContact:action.payload}
        case SETNAME:
            return {nameInput:action.payload}
        case SETEMAIL:
            return {emailInput:action.payload}
        case SETPHONE:
            return {phoneINput:action.payload}
    }
    return state;
}

export const setter = (value) =>({type:SETEDITABLES,payload:value})
export const editing = (id) => ({type:EDITING,payload:id})
export const setEditContact = (editContact) => ({type:SET_EDIT_CONTACT,payload:editContact})
export const setName = (nameVal) => ({type:SETNAME,payload:nameVal})
export const setEmail = (emailVal) => ({type:SETEMAIL,payload:emailVal})
export const setPhone = (phoneVal) => ({type:SETPHONE,payload:phoneVal})
