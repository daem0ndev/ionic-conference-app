import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ActivatedRouteService } from '../../providers/activated-route.service';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage implements AfterViewInit, OnDestroy {
  @ViewChild(IonTabs)
  ionTabs: IonTabs;

  private onDestroy$ = new Subject();

  constructor(private activatedRouteService: ActivatedRouteService) {}

  ngAfterViewInit() {
    if (this.ionTabs) {
      this.ionTabs.outlet.activateEvents
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(component => {
          console.log('activate with', component, this.ionTabs.outlet.activatedRoute);
          this.activatedRouteService.update(component, this.ionTabs.outlet.activatedRoute);
        });
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
