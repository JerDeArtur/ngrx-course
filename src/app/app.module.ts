import {BrowserModule} from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {metaReducers, reducers} from './reducers';
import {AuthGuard} from './auth/auth.guard';
import {EntityDataModule} from '@ngrx/data';
import { authGuard } from './auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot({router: routerReducer}, { metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true
      }
    }),
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    // StoreRouterConnectingModule.forRoot({
    //   stateKey: 'router',
    //   routerState: RouterState.Minimal
    // })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
