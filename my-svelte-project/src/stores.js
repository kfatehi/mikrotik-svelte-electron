import { writable } from 'svelte/store';

export const neighbors = writable([]);

export const connectForm = writable({
    ipAddress:'',
    login:'',
    password:''
});