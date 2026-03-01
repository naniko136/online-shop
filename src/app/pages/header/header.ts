import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../../services/cartservice';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authservice = inject(AuthService);
  public cartservice = inject(Cartservice);

  totalCount$ = this.cartservice.totalCount$;
}
