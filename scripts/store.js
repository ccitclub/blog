import {writable} from 'svelte/store'

export const darkmode = writable(localStorage.getItem('darkmode') == "true");
export const notification = writable("");
export const sortBy = writable(localStorage.getItem("sortBy") || "TIME");
