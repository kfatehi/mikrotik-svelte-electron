import { write } from 'fs';
import { writable } from 'svelte/store';

export const neighbors = writable([]);

export const connectForm = writable({
    ipAddress:'',
    login:'',
    password:''
});

export const errorMessage = writable('');