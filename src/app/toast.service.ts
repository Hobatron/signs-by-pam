import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum ToastrMethod {
    Success,
    Error,
    Warning,
    Info,
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastr: ToastrService) {}
    showNotification(
        message: string,
        timeout: number = 5000,
        type: ToastrMethod = ToastrMethod.Success
    ): void {
        switch (type) {
            case ToastrMethod.Success:
                this.toastr.success(message, undefined, { timeOut: timeout });
                break;
            case ToastrMethod.Error:
                this.toastr.error(message, undefined, { timeOut: timeout });
                break;
            case ToastrMethod.Warning:
                this.toastr.warning(message, undefined, { timeOut: timeout });
                break;
            case ToastrMethod.Info:
                this.toastr.info(message, undefined, { timeOut: timeout });
                break;
            default:
                console.error(`Invalid toastr type: ${type}`);
                break;
        }
    }
}
