import { Page } from './../../models/pageable.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  constructor(private afAuth:AngularFireAuth) { }


public login(email, password){
  return this.afAuth.signInWithEmailAndPassword(email, password)
}

public signup(email, password){
  return this.afAuth.createUserWithEmailAndPassword(email, password)
}
}
