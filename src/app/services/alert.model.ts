export enum AlertType {
  danger,
  warning,
  info,
  success
}

export class AlertModel {
  private _alertTitleByType: Map<AlertType, string> = new Map<AlertType, string>([
    [AlertType.danger, 'Error !'],
    [AlertType.warning, 'Warning !'],
    [AlertType.info, 'Info !'],
    [AlertType.success, 'Success !'],
  ]);

  constructor(
    type: AlertType,
    public dismissible: boolean,
    public message: string
  ) {
    this.type = AlertType[type];
    this.title = this._alertTitleByType.get(type);
  }

  title: string;
  type: string;
}