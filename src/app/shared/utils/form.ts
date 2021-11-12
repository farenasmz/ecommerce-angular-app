import { ControlItem } from '@app/models/frontend/';
import { map } from 'rxjs/operators';
export const markFormGroupTouched = (formGroup: any) => {
  (Object as any).values(formGroup.controls).array?.forEach((element: any) => {
    element.markAsTouched();

    if (element.controls) {
      markFormGroupTouched(element);
    }
  });
};

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: (() => void) | any;
}

export interface controlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: controlEntities): void => {
  Object.keys(controls).forEach((key: string) => {
    if (controls[key].map) {
      controls[key].map();
    }
  });
};
