import { Injectable, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivatedRouteService {

  private currentActivated$ = new BehaviorSubject<{ component: Component; activatedRoute: ActivatedRoute }>(null);

  constructor() {}

  /**
   * Update the current Component/ActivatedRoute
   */
  update(component: Component, activatedRoute: ActivatedRoute) {
    this.currentActivated$.next({
      component,
      activatedRoute
    });
  }

  /**
   * Expose the current root ion-router-outlet state
   */
  getCurrentState(): Observable<{ component: Component; activatedRoute: ActivatedRoute }> {
    return this.currentActivated$.asObservable().pipe(filter(x => !!x));
  }

  /**
   * Provides the latest ActivatedRoute for a given component that was loaded by ion-router-outlet
   * Warning: this method will only work on root page components, child components will fail to match.
   */
  getActivatedRoute(component: Component): Observable<ActivatedRoute> {
    return this.getCurrentState().pipe(
      filter(current => current.component === component),
      map(current => current.activatedRoute),
      shareReplay(1)
    );
  }

}
