import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RegisterModule } from './register/register.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    TaskComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    ForgotPasswordModule,
    RegisterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
