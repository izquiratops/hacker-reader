import { animate, style, transition, trigger } from '@angular/animations';

export const opacityAnimation = trigger('showItem', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('200ms', style({ opacity: '1' })),
  ]),
  transition(':leave', [
    style({ opacity: '1' }),
    animate('200ms', style({ opacity: '0' })),
  ]),
]);
