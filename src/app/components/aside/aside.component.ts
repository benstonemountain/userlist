import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../user.interface';
import { users } from '../../users';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  ordialForm!: FormGroup;

  users: User[] = users;
  textByUser = '';
  filteredUsers: User[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.filteredUsers = this.users;
    const formGroup: any = {};

    this.filteredUsers.forEach((_, index) => {
      formGroup[index] = new FormControl(false);
    });

    this.ordialForm = this.formBuilder.group(formGroup);
  }

  onSearch() {
    this.filteredUsers = this.users.filter((user) =>
      user.id.toLowerCase().includes(this.textByUser.toLowerCase())
    );
    //harcsabajuszba tettem, és úgy nem működött
    //miért nem??
  }

  showSelectedValue(controlIndex: number, control: FormControl) {
    const sendableObject: User[] = [];

    if (
      sendableObject.length === 0 &&
      !sendableObject.includes(this.filteredUsers[controlIndex]) &&
      control.value
    ) {
      sendableObject.push(this.filteredUsers[controlIndex]);

      Object.keys(this.ordialForm.controls).forEach((key) => {
        const control = this.ordialForm.get(key);
        if (control?.value === false) {
          control.disable();
        }
      });
     
      
    } 
    
    else 
     {
      
      Object.keys(this.ordialForm.controls).forEach((key) => {
        const control = this.ordialForm.get(key);
        if (control?.value === false) {
          control.enable();
        }
      });

      sendableObject.pop();
    }

    console.log(sendableObject);
  }

  getControl(id: number): FormControl {
    return this.ordialForm.controls[id] as FormControl;
  }

  showForm() {
    Object.keys(this.ordialForm.controls).forEach((key) => {
      const control = this.ordialForm.get(key);
      if (control?.value === false) {
        control.disable();
      }
    });
  }
}

// this.ordialForm.controls[0].value --> true, vagy false; nulladik indexen lévő kontroll értéke
