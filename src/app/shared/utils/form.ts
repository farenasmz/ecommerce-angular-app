export const markFormGroupTouched = (formGroup: any) => {
  (Object as any).values(formGroup.controls).array.forEach((element: any) => {
    element.markAsTouched();

    if (element.controls) {
      markFormGroupTouched(element);
    }
  });
};
