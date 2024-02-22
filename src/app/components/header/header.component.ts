import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public favoriteCount: number = 0;
  public activeRoute: string = '';

  constructor(public router: Router, private favoritesService: FavoritesService) {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.activeRoute = router.url;
      }
    })
  }

  ngOnInit(): void {
    this.favoritesService.favoritesCount.subscribe(count => {
      this.favoriteCount = count;
    })
  }

  public goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  public goToFavoritesPage(): void {
    this.router.navigate(['/favorites']);
  }

}
