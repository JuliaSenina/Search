import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  filter,
  debounceTime,
  catchError,
  switchMap,
} from "rxjs/operators";

import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
} from "../actions";

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType("CHANGE_SEARCH_FIELD"),
    map((o) => o.payload.search.trim()),
    debounceTime(100),
    map((o) => searchSkillsRequest(o))
  );

export const searchSkillsEpic = (action$) =>
  action$.pipe(
    ofType("SEARCH_SKILLS_REQUEST"),
    map((o) => o.payload.search),
    filter((o) => o.trim() !== ""),
    map((o) => new URLSearchParams({ q: o })),
    switchMap((o) =>
      ajax.getJSON(`http://localhost:7070/api/search?${o}`).pipe(
        map((o) => searchSkillsSuccess(o)),
        catchError((e) => of(searchSkillsFailure(e)))
      )
    )
  );
