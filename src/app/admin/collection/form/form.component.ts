import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'
import {tap} from 'rxjs/operators'

import {CollectionService} from '@resources/collection/collection.service'
import {ThemeService} from '@resources/theme/theme.service'
import {Collection} from '@resources/collection/collection.model'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-collection-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  env = environment
  collectionForm: FormGroup
  homeFile: File
  homeUrl: SafeUrl
  collectionFile: File
  collectionUrl: SafeUrl
  detailsFile: File[] = []
  detailsUrls: {url: SafeUrl, name: string}[] = []
  submitted = false

  themes$ = this.themeService.themes$.pipe(
    tap(themes => {if (!themes) {this.themeService.getThemes()}})
  )

  @Input() public collection: Collection
  @Output() public submitForm: EventEmitter<any> = new EventEmitter()

  @ViewChild('home') homeInput: ElementRef
  @ViewChild('col') collectionInput: ElementRef
  @ViewChild('details') detailsInput: ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private themeService: ThemeService,
    private domSanitizer: DomSanitizer,
  ) {
    this.buildForm()
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.collection) {
     this.buildForm()
    }
  }

  onSubmit(collection: Collection) {
    this.submitted = true
    if (this.collectionForm.valid) {
      const params = {
        id: this.collection?._id,
        collection: {
          ...collection,
          images: {
            home: this.homeFile ? {
              data: this.homeFile.name,
              contentType: this.homeFile.type,
            } : {},
            collections: this.collectionFile ? {
              data: this.collectionFile.name,
              contentType: this.collectionFile.type,
            } : {},
            details: this.detailsFile.length ? this.detailsFile.map(detail => ({
              data: detail.name,
              contentType: detail.type,
            })) : [],
          }
        },
        homeFile: this.homeFile,
        collectionFile: this.collectionFile,
        detailsFile: this.detailsFile,
      }

      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.collectionForm = this.formBuilder.group({
      label: new FormControl(this.collection?.label || '', [Validators.required]),
      theme: new FormControl(this.collection?.theme || '', [Validators.required]),
      description: new FormControl(this.collection?.description || '', [Validators.required]),
      collaboration: new FormControl(this.collection?.collaboration || false, []),
      collaborationDescription: new FormControl(this.collection?.collaborationDescription || '', []),
    })
  }

  selectHome(): void {
    this.homeInput.nativeElement.click()
  }

  onSelectHome(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.homeFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {this.homeUrl = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)}
      reader.readAsDataURL(this.homeFile)
    }
  }

  selectCollection(): void {
    this.collectionInput.nativeElement.click()
  }

  onSelectCollection(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.collectionFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {this.collectionUrl = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)}
      reader.readAsDataURL(this.collectionFile)
    }
  }

  selectDetails(): void {
    this.detailsInput.nativeElement.click()
  }

  onSelectDetails(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.detailsFile.push(event.target.files[0])
      const reader = new FileReader()
      reader.onload = () => {
        this.detailsUrls.push({url: this.domSanitizer.bypassSecurityTrustUrl(reader.result as string), name: event.target.files[0].name})
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onDeleteDetail(collection, detail) {
    if (detail) {
      this.collectionService.deleteDetail(collection._id, detail).subscribe(() => {
        this.collection.images.details = this.collection.images.details.filter(d => d !== detail)
      })
    } else {
      this.detailsUrls = this.detailsUrls.filter(d => d.url !== detail.url)
      this.detailsFile = this.detailsFile.filter(file => file.name !== detail.name)
    }
  }

}
