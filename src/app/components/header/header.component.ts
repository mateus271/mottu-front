import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public favoriteCount: number = 0;
  public activeRoute: string = '';
  public isMobile: boolean = false;

  private favoriteCountSubscription: Subscription;

  constructor(public router: Router, private favoritesService: FavoritesService) {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.activeRoute = router.url;
      }
    })
  }

  ngOnInit(): void {
    this.favoriteCountSubscription = this.favoritesService.favoritesCount.subscribe(count => {
      this.favoriteCount = count;
    })

    if (window.screen.width < 600) {
      this.isMobile = true;
    }
  }

  ngOnDestroy(): void {
    this.favoriteCountSubscription.unsubscribe();
  }

  public goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  public goToFavoritesPage(): void {
    this.router.navigate(['/favorites']);
  }

}
