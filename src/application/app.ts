import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { Router } from './main/router/router';
import stateService from './shared/services/state.service';
import querryService from './shared/services/querry.service';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private router: Router | null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.router = null;

    this.main.node.addEventListener('click', () => this.header.render());
  }

  public async start() {
    await stateService.load();
    querryService.loadStateFromQuerry();
    this.router = new Router(this.main.container);
    this.header.render();
  }
}

export default App;
