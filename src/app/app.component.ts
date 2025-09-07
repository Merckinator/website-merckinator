import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'merck-root',
  imports: [RouterModule, RouterOutlet, NzLayoutModule, NzMenuModule, NzAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
