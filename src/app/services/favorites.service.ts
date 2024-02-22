import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FavoritesService {
    public favoritesArray: number[] = [];
    public favoritesCount: Subject<number> = new Subject<number>();
    private count: number = 0;

    public checkIfFavorite(id: number): void {
        let characterIndexOnFavoritesArray = this.favoritesArray.findIndex(element => element === id);
        if (characterIndexOnFavoritesArray >= 0) {
            this.removeFromFavorites(characterIndexOnFavoritesArray);
        } else {
            this.addToFavorites(id);
        }
    }

    private addToFavorites(id: number): void {
        this.favoritesArray.push(id);
        this.count ++;
        this.favoritesCount.next(this.count);
    }

    private removeFromFavorites(index: number): void {
        this.favoritesArray.splice(index, 1);
        this.count --;
        this.favoritesCount.next(this.count);
    }
}
