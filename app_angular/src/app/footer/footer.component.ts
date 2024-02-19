import { Component } from "@angular/core";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [FontAwesomeModule, MatButtonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  socials = [
    {
      name: "xtwitter",
      icon: faXTwitter,
      data: "https://twitter.com/LupusCordoba?s=20&amp;t=NAPky4AF0glImpIHYBIw7Q",
    },
    {
      name: "instagram",
      icon: faInstagram,
      data: "https://www.instagram.com/fundacion_lupus_argentina_/",
    },

    {
      name: "facebook",
      icon: faFacebook,
      data: "https://www.facebook.com/LupusArgentina",
    },
    {
      name: "mail",
      icon: faEnvelope,
      data: "mailto:",
    },
  ];
}
