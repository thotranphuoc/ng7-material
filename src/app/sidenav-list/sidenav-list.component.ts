import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription
  @Output() sidenavToggle = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authState => {
      this.isAuth = authState
    })
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onClose() {
    this.sidenavToggle.emit();
  }



}
