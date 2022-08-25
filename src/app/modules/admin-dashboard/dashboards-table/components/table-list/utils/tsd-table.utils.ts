import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export function  addUserChips($event: MatChipInputEvent, userList: string[]): void {
  const value = ($event.value || '').trim();

  if (value) {
    userList.push(value);
  }
  $event.chipInput!.clear();
}

export function deleteUserChips(user: string, userList: string[]): string[] {
  userList = userList.filter((value) => value !== user);
  return userList;
}

export const SEPARATOR_CODES = [ENTER, COMMA];

export const ADD_ON_BLUR: boolean = true;
