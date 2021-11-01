import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core'
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'
import {tap} from 'rxjs/operators'

import {Illustration} from '@resources/illustration/illustration.model'
import {CollectionService} from '@resources/collection/collection.service'
import {ThemeService} from '@resources/theme/theme.service'
import {CategoryService} from '@resources/category/category.service'
import {FormatService} from '@resources/format/format.service'
import {IllustrationService} from '@resources/illustration/illustration.service'
import {environment} from '@env/environment'

@Component({
  selector: 'pb-illustration-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  env = environment
  illustrationForm: FormGroup
  formats: FormArray
  settingSceneFile: File
  settingSceneUrl: SafeUrl
  packShotFile: File
  packShotUrl: SafeUrl
  detailsFile: File[] = []
  detailsUrls: {url: SafeUrl, name: string}[] = []
  submitted = false

  collections$ = this.collectionService.collections$.pipe(
    tap(collections => {if (!collections) {this.collectionService.getCollections()}})
  )

  themes$ = this.themeService.themes$.pipe(
    tap(themes => {if (!themes) {this.themeService.getThemes()}})
  )

  categories$ = this.categoryService.categories$.pipe(
    tap(categories => {if (!categories) {this.categoryService.getCategories()}})
  )

  formats$ = this.formatService.formats$.pipe(
    tap(themes => {if (!themes) {this.formatService.getFormats()}})
  )

  @Input() public illustration: Illustration
  @Output() public submitForm: EventEmitter<any> = new EventEmitter()

  @ViewChild('settingScene') settingSceneInput: ElementRef
  @ViewChild('packShot') packShotInput: ElementRef
  @ViewChild('details') detailsInput: ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private formatService: FormatService,
    private domSanitizer: DomSanitizer,
    private illustrationService: IllustrationService,
  ) {
    this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.illustration) {
     this.buildForm()
    }
  }

  onSubmit(illustration: Illustration) {
    this.submitted = true
    if (this.illustrationForm.valid) {
      const params = {
        id: this.illustration?._id,
        illustration: {
          ...illustration,
          images: {
            settingScene: this.settingSceneFile ? {
              data: this.settingSceneFile.name,
              contentType: this.settingSceneFile.type,
            } : {},
            packShot: this.packShotFile ? {
              data: this.packShotFile.name,
              contentType: this.packShotFile.type,
            } : {},
            details: this.detailsFile.length ? this.detailsFile.map(detail => ({
              data: detail.name,
              contentType: detail.type,
            })) : [],
          }
        },
        settingSceneFile: this.settingSceneFile,
        packShotFile: this.packShotFile,
        detailsFile: this.detailsFile,
      }

      this.submitForm.emit(params)
    }
  }

  buildForm() {
    this.illustrationForm = this.formBuilder.group({
      label: new FormControl(this.illustration?.label || '', [Validators.required]),
      category: new FormControl(this.illustration?.category || '', [Validators.required]),
      collec: new FormControl(this.illustration?.collec || undefined),
      theme: new FormControl(this.illustration?.theme || '', [Validators.required]),
      formats: this.formBuilder.array([]),
      stock: new FormControl(this.illustration?.stock || '', [Validators.required]),
      details: new FormControl(this.illustration?.details || '', [Validators.required]),
    })

    this.illustration?.formats?.length ? this.illustration.formats.forEach(format => this.addFormat(format)) : this.addFormat()
  }

  addFormat(format?): void {
    this.formats = this.illustrationForm.get('formats') as FormArray
    this.formats.push(this.createNewFormat(format))
  }

  resetFormat(): void {
    const formats = this.illustrationForm.get('formats') as FormArray
    formats.clear()
    this.formats.push(this.createNewFormat())
  }

  createNewFormat(format?): FormGroup {
    return this.formBuilder.group({
      format: new FormControl(format?.format || '', [Validators.required]),
      price: new FormControl(format?.price || '', [Validators.required]),
    })
  }

  selectSettingScene(): void {
    this.settingSceneInput.nativeElement.click()
  }

  onSelectSettingScene(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.settingSceneFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {this.settingSceneUrl = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)}
      reader.readAsDataURL(this.settingSceneFile)
    }
  }

  selectPackShot(): void {
    this.packShotInput.nativeElement.click()
  }

  onSelectPackShot(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.packShotFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {this.packShotUrl = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string)}
      reader.readAsDataURL(this.packShotFile)
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

  onDeleteDetail(illustration, detail) {
    if (detail) {
      this.illustrationService.deleteDetail(illustration._id, detail).subscribe(() => {
        this.illustration.images.details = this.illustration.images.details.filter(d => d !== detail)
      })
    } else {
      this.detailsUrls = this.detailsUrls.filter(d => d.url !== detail.url)
      this.detailsFile = this.detailsFile.filter(file => file.name !== detail.name)
    }
  }

}
