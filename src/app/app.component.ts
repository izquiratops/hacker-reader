import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Theme } from './shared/hn.model';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  @HostBinding('class') componentCssClass: string;

  constructor(public shared: SharedService) {}

  ngOnInit() {
    this.shared.isDark$.subscribe((isDark) => {
      const theme = isDark ? Theme.DARK : Theme.LIGHT;

      // Set the color of the app
      this.componentCssClass = theme;

      // Set the color of the browser bar
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', isDark ? '#536dfe' : '#ff6e40');

      // Keep preference on local
      localStorage.setItem('theme', theme);
    });
  }
}
