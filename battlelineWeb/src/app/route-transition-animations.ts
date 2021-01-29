import { trigger, transition } from '@angular/animations';
export const routeTransitionAnimations = trigger('transitionTrigger', [
 transition('One => Two, Two => Three', [])
]);