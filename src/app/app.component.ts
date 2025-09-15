import { Component } from '@angular/core';
import { LayoutComponent } from "./shared/components/common/layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sil-movie-app';
}
