import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { environment } from '../../environment';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-upload-file';

  selectedFile: File | null = null

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('No file selected')
      return;
    }

    const formData = new FormData()
    formData.append('image', this.selectedFile)

    this.http.post<any>(`http://api.imgbb.com/1/upload?key=${environment.IMBB_API_KEY}`, formData)
    .pipe(
      switchMap(response => {
        alert(`Upload successful: ${JSON.stringify(response)}`)
        return response
      })
    ).subscribe(
      result => {
        alert(`Upload successful: ${JSON.stringify(result)}`)
      },
      err => {
        console.error(err)
      }
    )
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text('Helloworld', 10, 10)
    doc.save()
  }
}
