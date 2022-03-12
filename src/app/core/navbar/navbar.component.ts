import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public href: string = '/';
  // public user = {
  //   username: 'Atul Bharadwaj',
  //   displayAvatarURL: 'https://avatars.dicebear.com/api/croodles-neutral/' + 'Atul-Bharadwaj' + '.svg'
  // };

  constructor(
    public authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.href = this.route.url;
  }

  router() {
    window.location.assign(`/`);
  }

}
