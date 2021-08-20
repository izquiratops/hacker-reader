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
      this.componentCssClass = theme;
      localStorage.setItem('theme', theme);
    });
  }
}
