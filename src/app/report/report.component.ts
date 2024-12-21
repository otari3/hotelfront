import { Component } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { FormControl } from '@angular/forms';
import { Report } from '../shared/types';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  date = new FormControl('');
  reports: Report[] = [];
  constructor(private api: ApiServiceService) {}
  onSearch() {
    this.api.get_report(this.date.value).subscribe({
      next: (data) => {
        this.reports = data['data'];
      },
      error: (e) => {
        alert(e['error']['error']);
      },
    });
  }
  onDownload() {
    this.api
      .dowloand_report(
        `https://hotelreservationbackend.onrender.com/dowloand_report/${this.date.value}/`
      )
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.date.value}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (e) => {
          alert(e['error']['error']);
        },
      });
  }
}
