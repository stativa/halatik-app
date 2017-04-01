import { Response } from '@angular/http';
import { AlertModel, AlertType } from './alert.model';

export default class ServerError {
    static _genericNotFoundErrorMessage: string = 'The requested resource was not found.';
    static _genericErrorMessage: string = 'An error has occured.';
    static _genericSecurityErrorMessage: string = 'Authorization has been denied for this request.';
    static _serviceUnvailableErrorMessage: string = 'The server is temporarily unable to service your request. Please try again later.';

    constructor(private _response: Response) {
        switch(_response.status) {
            case 401:
                this.handleUnauthorized();
                break;
            case 403:
                this.handleForbidden();
                break;
            case 404:
                this.handleNotFound();
                break;
            case 409:
                this.handleConflict();
                break;
            case 500:
                this.handleInternalServerError();
                break;
            case 503:
                this.handleServiceUnavailable();
                break;
            default:
                this.handleGenericError();
                break;
        }
        
    }

    type: AlertType;
    message: string;

    private handleNotFound(): void {
        this.populateMessge(ServerError._genericNotFoundErrorMessage);
        this.type = AlertType.danger;
    }

    private handleInternalServerError(): void {
        this.populateMessge(ServerError._genericErrorMessage);
        this.type = AlertType.danger;
    }

    private handleConflict(): void {
        this.populateMessge(ServerError._genericErrorMessage);
        this.type = AlertType.warning;
    }

    private handleUnauthorized(): void {
        this.populateMessge(ServerError._genericSecurityErrorMessage);
        this.type = AlertType.danger;
    }

    private handleForbidden(): void {
        this.populateMessge(ServerError._genericSecurityErrorMessage);
        this.type = AlertType.warning;
    }

    private handleServiceUnavailable(): void {
        this.message = ServerError._serviceUnvailableErrorMessage;
        this.type = AlertType.danger;
    }

    private handleGenericError(): void {
        this.populateMessge(ServerError._genericErrorMessage);
        this.type = AlertType.danger;
    }

    private isJsonResponse(): boolean {
        let contentType = this._response.headers.get('content-type');
        return Boolean(contentType.toLowerCase().indexOf('application/json') >= 0);
    }

    private populateMessge(alternativeErrorMessage: string): void {
        let isJsonResponse = this.isJsonResponse();
        if(isJsonResponse) {
            let jsonResponse = this._response.json();
            this.message = jsonResponse.Message;
        }

        if(!this.message) {
            this.message = alternativeErrorMessage;
        }
    }
}