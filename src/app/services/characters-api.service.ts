import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { CharactersApiResponse } from "../interfaces/charactersApiResponse.type";
import { Character } from "../interfaces/character.type";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CharactersApiService {
    private apiUrl: string = environment.url;
    public charactersApiResponse: CharactersApiResponse;
    public charactersArray: Subject<Character[]> = new Subject<Character[]>();

    constructor(private httpClient: HttpClient) {}

    public getCharacters(): void {
        this.httpClient.get<CharactersApiResponse>(`${this.apiUrl}/character`).subscribe({
            next: (charactersApiResponse: CharactersApiResponse) => {
                this.charactersArray.next(charactersApiResponse.results);
            }
        })
    }
}