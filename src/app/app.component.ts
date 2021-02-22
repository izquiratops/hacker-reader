import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  @HostBinding('class') componentCssClass: string;

  @HostListener('window:resize', ['$event'])
  private onResize(e: any): void {
    this.shared.isMobile$.next(e.target.innerWidth < 760);
  };

  constructor(
    public shared: SharedService
  ) {
    this.shared.currentTheme$.subscribe(theme => {
      this.componentCssClass = theme;
      localStorage.setItem('theme', theme);
    });
  }

}
