import { Character } from "./character.type"

export type CharactersApiResponse = {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
    },
    results: Character[]
}