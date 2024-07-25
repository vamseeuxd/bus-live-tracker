import { Component, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SchoolService } from "../../../service/schools/schools.service";
import { LoadingService } from "../../../service/loading/loading.service";
import { ToastService } from "../../../service/toast/toast.service";
import { School } from "../../../interfaces/school.model";
import { Router } from "@angular/router";

const CONFIG = {
  DEFAULT_HREF: "app/tabs/schools",
  ADD_SUCCESS_MESSAGE: "School Added Successfully",
  ADD_ERROR_MESSAGE: "Error while Adding School",
  UPDATE_SUCCESS_MESSAGE: "School Updated Successfully",
  UPDATE_ERROR_MESSAGE: "Error while Updating School",
  PAGE_TITLE: "Add Schools",
  ADD_BUTTON_LABEL: "Add School",
  UPDATE_BUTTON_LABEL: "Update School",
};

@Component({
  selector: "app-schools",
  templateUrl: "./page.html",
  styleUrls: ["./page.scss"],
})
export class AddSchoolPage {
  @ViewChild("ngFormRef") ngFormRef: NgForm;
  itemToEdit: School | undefined;
  readonly defaultHref = CONFIG.DEFAULT_HREF;
  readonly pageTitle = CONFIG.PAGE_TITLE;
  readonly addButtonLabel = CONFIG.ADD_BUTTON_LABEL;
  readonly updateButtonLabel = CONFIG.UPDATE_BUTTON_LABEL;
  private _Itemld = "";

  public get itemId(): string {
    return this._Itemld;
  }

  @Input()
  public set itemId(value: string) {
    this._Itemld = value;
    if (value?.trim()) {
      this.getItemToEdit();
    }
  }

  constructor(
    private itemService: SchoolService,
    private loadingService: LoadingService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async getItemToEdit(): Promise<void> {
    const sub = this.itemService.getItem(this.itemId).subscribe(
      (item: School) => {
        this.itemToEdit = item;
        this.ngFormRef.resetForm(item);
        sub.unsubscribe();
      },
      (error: any) => {
        console.error(error);
        sub.unsubscribe();
      }
    );
  }

  addItem(form: NgForm): void {
    this.loadingService.showLoader();
    this.itemService
      .createItem(form.value)
      .then(() => {
        this.handleSuccess(form, CONFIG.ADD_SUCCESS_MESSAGE);
      })
      .catch(() => {
        this.handleError(CONFIG.ADD_ERROR_MESSAGE);
      });
  }

  updateItem(form: NgForm): void {
    if (!this.itemToEdit) return;

    this.loadingService.showLoader();
    this.itemService
      .updateItem(this.itemToEdit.id, form.value)
      .then(() => {
        this.handleSuccess(form, CONFIG.UPDATE_SUCCESS_MESSAGE);
      })
      .catch(() => {
        this.handleError(CONFIG.UPDATE_ERROR_MESSAGE);
      });
  }

  private handleSuccess(form: NgForm, message: string): void {
    console.log(message);
    this.loadingService.hideLoader();
    form.resetForm({});
    this.toastService.presentSuccessToast(message);
    this.router.navigateByUrl(this.defaultHref);
  }

  private handleError(message: string): void {
    console.error(message);
    this.loadingService.hideLoader();
    this.toastService.presentErrorToast(message);
  }
}
