import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';

import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) { }

  crearUsuario(usuario: Usuario) {
    const usaurioRef = collection(this.firestore, 'usuarios');
    return addDoc(usaurioRef, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    const usaurioRef = collection(this.firestore, 'usuarios');
    return collectionData(usaurioRef, { idField: 'id' }) as Observable<Usuario[]>;
  }

  borrarUsuario(usuario: Usuario) {
    const usuarioDocRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return deleteDoc(usuarioDocRef);
  }
}
