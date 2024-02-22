import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character.type';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  public favoriteCharactersArray: Character[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoriteCharactersArray = this.favoritesService.favoritesArray;
  }

  public removeFromFavorites(id: number): void {
    this.favoritesService.directlyRemoveFromFavorites(id);
  }
}
