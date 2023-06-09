import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (fg: AbstractControl): ValidationErrors | null => {
        const formGroup = fg as FormGroup;
        const passwordControl = formGroup.get('password');
        const confirmPasswordControl = formGroup.get('confirmPassword');

        if (passwordControl && confirmPasswordControl) {
            const passwordValue = passwordControl.value;
            const confirmPasswordValue = confirmPasswordControl.value;

            if (passwordValue.length < 6) {
                passwordControl.setErrors({ minlength: true });
                return { minlength: true };
            }

            if (passwordValue.length > 26) {
                passwordControl.setErrors({ maxlength: true });
                return { maxlength: true };
            }

            if (!/\d/.test(passwordValue)) {
                passwordControl.setErrors({ requireNumber: true });
                return { requireNumber: true };
            }

            if (passwordValue !== confirmPasswordValue) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            }

            // Reset the errors if the validation passes
            confirmPasswordControl.setErrors(null);
            passwordControl.setErrors(null);
        }

        return null;
    };
}
