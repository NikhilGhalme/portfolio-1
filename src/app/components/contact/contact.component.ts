import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Notify } from "notiflix";
import { ContactUsService } from "../../module/shared/contact-us.service";
import { SharedService } from "../../module/shared/services/shared.service";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
	isMobileDevice = window.innerWidth < 920;
	isDark = true;
	protected readonly eval = eval;
	protected readonly event = event;

	constructor(protected service: ContactUsService, protected sharedService: SharedService) {
		sharedService.isDark$.subscribe(response => {
			this.isDark = response;
		});
	}

	ngOnInit(): void {
	}

	save(form: NgForm) {
		this.service.formSubmit(form).subscribe(response => {
			Notify.success("Form submitted successfully! 🎉");
			form.reset();
		}, err => {
			Notify.failure(err);
		});
	}
}
