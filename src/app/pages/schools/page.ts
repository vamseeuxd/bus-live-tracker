import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../../service/schools/schools.service";
import { AlertService } from "../../service/alert/alert.service";
import { School } from "../../interfaces/school.model";

const CONFIG = {
  DELETE_CONFIRM_HEADER: "Confirm Delete School",
  DELETE_CONFIRM_MESSAGE: "Are you sure you want to delete this school?",
  CANCEL_TEXT: "Cancel",
  CANCEL_ROLE: "cancel",
  CANCEL_CSS_CLASS: "secondary",
  CANCEL_LOG_MESSAGE: "Delete action cancelled",
  DELETE_TEXT: "Delete",
  PAGE_TITLE: "Schools",
};

@Component({
  selector: "app-schools",
  templateUrl: "./page.html",
  styleUrls: ["./page.scss"],
})
export class SchoolsPage implements OnInit {
  items: School[] = [];
  pageTitle = CONFIG.PAGE_TITLE;

  constructor(
    private itemService: SchoolService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data: School[]) => {
      this.items = data;
    });
  }

  deleteItem(id: string): void {
    this.alertService.presentAlert({
      header: CONFIG.DELETE_CONFIRM_HEADER,
      message: CONFIG.DELETE_CONFIRM_MESSAGE,
      buttons: [
        {
          text: CONFIG.CANCEL_TEXT,
          role: CONFIG.CANCEL_ROLE,
          cssClass: CONFIG.CANCEL_CSS_CLASS,
          handler: () => {
            console.log(CONFIG.CANCEL_LOG_MESSAGE);
          },
        },
        {
          text: CONFIG.DELETE_TEXT,
          handler: () => {
            this.itemService.deleteItem(id);
          },
        },
      ],
    });
  }

  getItemDetails(school: School): string {
    return `
      <div class="items-details">
        <div class="detail-item"><strong>Name:</strong> ${school.name}</div>
        <div class="detail-item"><strong>Address:</strong> ${school.address}</div>
        <div class="detail-item"><strong>City:</strong> ${school.city}</div>
        <div class="detail-item"><strong>State:</strong> ${school.state}</div>
        <div class="detail-item"><strong>Zip Code:</strong> ${school.zipCode}</div>
        <div class="detail-item"><strong>Country:</strong> ${school.country}</div>
        <div class="detail-item"><strong>Phone Number:</strong> ${school.phoneNumber}</div>
        <div class="detail-item"><strong>Email:</strong> ${school.email}</div>
        <div class="detail-item"><strong>Website:</strong> ${school.website}</div>
      </div>
    `;
  }
}
