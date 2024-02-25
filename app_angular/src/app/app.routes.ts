import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ProfileListComponent } from "@profile/list/list.component";
// import { ProfileComponent } from "./profile/profile.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppComponent } from "./app.component";
import { ProfileFormComponent } from "./profile/form/form.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  // {
  //   path: "profile",
  //   component: ProfileComponent,
  // },
  {
    path: "profile/form",
    component: ProfileFormComponent,
  },
  {
    path: "admin/profile/list",
    component: ProfileListComponent,
  },
  { path: "**", pathMatch: "full", component: NotFoundComponent },
];
