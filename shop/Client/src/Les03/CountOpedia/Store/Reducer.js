import { counter } from "./State";

const ATTACK  = 'ATTACK';
const DEFENCE = 'DEFENCE';
const RANDOM = 'RANDOM';
const RESET = 'RESET';

export const reducer = (state=counter,action)=> {
    switch (action.type) {
        case ATTACK:
            return {...counter,count: state.count+Math.floor(Math.random()*10)}
        case DEFENCE:
            return {...counter,count: state.count-(Math.floor(Math.random()*10))}    
        case RANDOM:
            return {...counter,count: state.count+(Math.floor(Math.random()*20)-10)}
        case RESET:
            return {...counter,count: 0}    
        default: 
            return state
    }
}

export const doAttack =()=>({type:ATTACK})
export const doDefence=()=>({type:DEFENCE})
export const doRandom=()=>({type:RANDOM})
export const doReset=()=>({type:RESET})