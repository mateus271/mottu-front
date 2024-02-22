import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.type';
import { CharactersApiService } from 'src/app/services/characters-api.service';
import { FormControl } from '@angular/forms';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public charactersArray: Character[] = [];
  public characterIsFavorite: boolean = false;
  public characterName: string = '';
  public searchField: FormControl = new FormControl();

  constructor(private charactersApiService: CharactersApiService, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.getCharacters();
    this.setCharacters();
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

  public checkIfFavorite(character: Character): void {
    this.favoritesService.checkIfFavorite(character);
  }

  private getCharacters(): void {
    this.charactersApiService.getCharacters();
  }

  private setCharacters(): void {
    this.charactersApiService.charactersArray.subscribe({
      next: (charactersArray: Character[]) => {
        this.charactersArray = charactersArray;
      }
    })
  }
}
