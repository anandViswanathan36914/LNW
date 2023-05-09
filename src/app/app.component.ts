import { importType } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { myAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [myAnimation]
})
export class AppComponent {
  title = 'verification-page';

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
