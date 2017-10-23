import { Component, OnInit } from '@angular/core';
import { HeroService } from './../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().then((heroes: Hero[]) => {
      this.heroes = heroes.slice(1, 5);
    });
  }

}