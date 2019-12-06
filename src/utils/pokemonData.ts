import { Pokemon } from '../models/pokemon';
import pokedex from './pokedex.json';

export const pokemonData: Pokemon[] = pokedex.map((p: any) => new Pokemon(p));

export const allTypes: string[] = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
];

export const typeWeaknesses: Map<string, string[]> = new Map<string, string[]>([
    ['fairy', ['poison', 'steel']],
    ['steel', ['fire', 'fighting', 'ground']],
    ['dark', ['fighting', 'bug', 'fairy']],
    ['dragon', ['ice', 'dragon', 'fairy']],
    ['ghost', ['ghost', 'dark']],
    ['rock', [
        'water',
        'grass',
        'fighting',
        'ground',
        'steel',
    ]],
    ['bug', ['fire', 'flying', 'rock']],
    ['psychic', ['bug', 'ghost', 'dark']],
    ['flying', ['electric', 'ice', 'rock']],
    ['ground', ['water', 'ice', 'grass']],
    ['poison', ['ground', 'psychic']],
    ['fighting', ['flying', 'psychic', 'fairy']],
    ['ice', ['fire', 'fighting', 'rock', 'steel']],
    ['grass', [
        'fire',
        'ice',
        'poison',
        'flying',
        'bug',
    ]],
    ['electric', ['ground']],
    ['water', ['electric', 'grass']],
    ['fire', ['water', 'ground', 'rock']],
    ['normal', ['fighting']],
]);

export const typeEffectivenesses: Map<string, string[]> = new Map<string, string[]>([
    ['fairy', ['fighting', 'dragon', 'dark']],
    ['steel', ['ice', 'rock', 'fairy']],
    ['dark', ['ghost', 'psychic']],
    ['dragon', ['dragon']],
    ['ghost', ['ghost', 'psychic']],
    ['rock', ['fire', 'flying', 'ice', 'bug']],
    ['bug', ['grass', 'psychic', 'dark']],
    ['psychic', ['fighting', 'poison']],
    ['flying', ['grass', 'fighting', 'bug']],
    ['ground', [
      'fire',
      'electric',
      'poison',
      'rock',
      'steel',
    ]],
    ['poison', ['grass', 'fairy']],
    ['fighting', [
      'ice',
      'normal',
      'rock',
      'dark',
      'steel',
    ]],
    ['ice', [
      'grass',
      'ground',
      'flying',
      'dragon',
    ]],
    ['grass', ['water', 'ground', 'rock']],
    ['electric', ['water', 'flying']],
    ['water', ['fire', 'ground', 'rock']],
    ['fire', ['grass', 'ice', 'bug', 'steel']],
    ['normal', []],
]);


