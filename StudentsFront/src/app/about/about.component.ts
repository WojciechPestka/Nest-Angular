import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  currentDate: string;

  constructor() {
    this.currentDate = new Date().toLocaleString();
  }

  ngOnInit(): void {
  }
}
