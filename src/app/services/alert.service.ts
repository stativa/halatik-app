import { Injectable, EventEmitter } from '@angular/core';
import { AlertModel, AlertType } from './alert.model';


@Injectable()
export class AlertService {

  constructor() { 
    this.showAlert = new EventEmitter<AlertModel>(true);
    this.hideAlerts = new EventEmitter();
  }

  showAlert: EventEmitter<AlertModel>;
  hideAlerts: EventEmitter<any>;
  
  error(message): void {
    this.alert(AlertType.danger, message);
  }

  warning(message): void {
    this.alert(AlertType.warning, message);
  }

  info(message): void {
    this.alert(AlertType.info, message);
  }

  success(message): void {
    this.alert(AlertType.success, message);
  }

  clearAlerts() : void {
    this.hideAlerts.emit();
  }

  alert(type: AlertType, message: string, dismissible: boolean = true) {
    let alertModel = new AlertModel(type, dismissible, message);
    this.showAlert.emit(alertModel);
  }
}
