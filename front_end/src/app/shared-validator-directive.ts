import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
	selector: '[phoneValidator]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: SharedDirective,
		multi: true
	}]
})
/* An example of adding custom validation directives it checks for phone no length */
export class SharedDirective implements Validator {
	validate(control: AbstractControl): ValidationErrors | null {
		if (!control.value && control.dirty) {
			return {
				default: true,
				errorMsg: "Required Field"
			}
		}
		else if (control.value && control.value.length < 10 && control.dirty) {
			return {
				default: true,
				errorMsg: "Invalid no."
			}
		}
		else
			return null
	}

}