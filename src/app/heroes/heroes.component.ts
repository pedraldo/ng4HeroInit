import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from './../hero.service';
import { Hero } from './../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  public getHeroes(): void {
    this.heroService.getHeroes().then((heroes: Hero[]) => {
      this.heroes = heroes;
    });
  }

  public addHero(name: string): void {
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  public deleteHero(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

  public goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
