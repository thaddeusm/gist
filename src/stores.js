import { writable } from 'svelte/store';

export const storedMode = writable('game');

export const storedText = writable('');

export const storedSummary = writable('');

export const storedAnalysis = writable('');

export const gameProgress = writable(1);

export const storedScore = writable(0);
