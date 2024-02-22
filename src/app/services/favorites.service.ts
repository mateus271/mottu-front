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

    public findCharacterFavoriteIndex(id: number): number {
        let characterIndexOnFavoritesArray = this.favoritesArray.findIndex(character => character.id === id);
        return characterIndexOnFavoritesArray;
    }

    public addOrRemoveFavorite(character: Character): void {
        let characterFavoriteIndex = this.findCharacterFavoriteIndex(character.id);
        if (characterFavoriteIndex >= 0) {
            this.removeFromFavorites(characterFavoriteIndex);
        } else {
            this.addToFavorites(character);
        }
    }

    public directlyRemoveFromFavorites(id: number): void {
        let characterFavoriteIndex = this.findCharacterFavoriteIndex(id);
        this.removeFromFavorites(characterFavoriteIndex);
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
