import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Character } from "../interfaces/character.type";

@Injectable({
    providedIn: 'root'
})

export class FavoritesService {
    public favoritesArray: Character[] = [];
    public favoritesCount: Subject<number> = new Subject<number>();
    private count: number = 0;

    public checkIfFavorite(character: Character): void {
        let characterId = character.id;
        let characterIndexOnFavoritesArray = this.favoritesArray.findIndex(character => character.id === characterId);
        if (characterIndexOnFavoritesArray >= 0) {
            this.removeFromFavorites(characterIndexOnFavoritesArray);
        } else {
            this.addToFavorites(character);
        }
    }

    public directlyRemoveFromFavorites(id: number): void {
        let characterIndexOnFavoritesArray = this.favoritesArray.findIndex(character => character.id === id);
        this.removeFromFavorites(characterIndexOnFavoritesArray);
    }

    private addToFavorites(character: Character): void {
        this.favoritesArray.push(character);
        this.count ++;
        this.favoritesCount.next(this.count);
    }

    private removeFromFavorites(index: number): void {
        this.favoritesArray.splice(index, 1);
        this.count --;
        this.favoritesCount.next(this.count);
    }
}
