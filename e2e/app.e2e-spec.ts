import { HalatikAppPage } from './app.po';

describe('halatik-app App', () => {
  let page: HalatikAppPage;

  beforeEach(() => {
    page = new HalatikAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
