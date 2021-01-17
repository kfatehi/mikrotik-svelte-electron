import { writable } from 'svelte/store';

export const neighbors = writable([]);

export const connectForm = writable({
    ipAddress:'',
    login:'',
    password:''
});

export const errorMessage = writable('');

export const mainProcessStateLoaded = writable(false);

export const connected = writable(false);

export const savedTargets = writable([]);

export const addresses = writable([]);