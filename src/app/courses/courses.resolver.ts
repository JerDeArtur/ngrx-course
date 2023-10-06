import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { filter, finalize, first, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseEntityService } from './services/course-entity.service';

  // export const resolveCourses: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  //   const store = inject(Store<AppState>);
  //   let loading = false;
  //   return store.pipe(
  //     select(areCoursesLoaded),
  //     tap((coursesLoaded) => {
  //       if(!loading && !coursesLoaded){
  //         loading = true;
  //         store.dispatch(CoursesActions.loadAllCourses())
  //       }
  //     }),
  //     filter(coursesLoaded => coursesLoaded),
  //     first(),
  //     finalize(() => loading = false)
  //   )
  // }

  export const resolveCourses: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const coursesService = inject(CourseEntityService);
    return coursesService.loaded$.pipe(
      tap(loaded => {
        if(!loaded){
          coursesService.getAll();
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
