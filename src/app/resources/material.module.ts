import {NgModule} from '@angular/core'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatMenuModule} from '@angular/material/menu'
import {MatTabsModule} from '@angular/material/tabs'
import {MatTableModule} from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'

@NgModule({
  declarations: [],
  imports: [
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
})
export class MaterialModule {}
