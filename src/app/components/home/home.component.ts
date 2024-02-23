import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.type';
import { CharactersApiService } from 'src/app/services/characters-api.service';
import { FormControl } from '@angular/forms';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public charactersArray: Character[] = [];
  public characterIsFavorite: boolean = true;
  public characterName: string = '';
  public searchField: FormControl = new FormControl();

  private charactersArraySubscription: Subscription;

  constructor(private charactersApiService: CharactersApiService, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getCharacters();
    this.setCharacters();
  }

  ngOnDestroy(): void {
      this.charactersArraySubscription.unsubscribe();
  }

  public onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        this.searchCharacters();
        break;
      case "Backspace":
        if (this.characterName.length <= 1) {
          this.getCharacters();
        }
        break;
      default:
        return;
    }
  }

  public searchCharacters(): void {
    this.charactersApiService.searchCharacters(this.characterName);
  }

  public isFavorite(id: number): boolean {
    let characterFavoriteIndex = this.favoritesService.findCharacterFavoriteIndex(id);
    if (characterFavoriteIndex >= 0) {
      return true;
    } else {
      return false;
    }
  }

  public addOrRemoveFavorite(character: Character): void {
    this.favoritesService.addOrRemoveFavorite(character);
  }

  private getCharacters(): void {
    this.charactersApiService.getCharacters();
  }

  private setCharacters(): void {
    this.charactersArraySubscription = this.charactersApiService.charactersArray.subscribe({
      next: (charactersArray: Character[]) => {
        this.charactersArray = charactersArray;
      }
    })
  }
}
