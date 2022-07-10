import { Injectable } from '@angular/core';
import { ITarea } from '../models/tarea';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tareas: ITarea[] = [];

  constructor(
    private storage: Storage
  ) {
    this.init();

    this.obtener().then(
      tareas => { this.tareas = tareas == null ? [] : tareas;}
    );

  }

  async init() {
    await this.storage.create();
  }

  obtener(): Promise<ITarea[]> {
    return this.storage.get('tareas');
  }

  obtenerPorId(id: number): ITarea {
    return this.tareas.filter(t => t.id === id)[0];
  }

  crear(tarea: ITarea): Promise<ITarea[]> {
    const id = this.tareas.reduce((max, t) => t.id > max ? t.id : max, -1);
    const nuevaTarea = { ...tarea, id: id + 1 };
    this.tareas.push(nuevaTarea);

    return this.storage.set('tareas', this.tareas);
  }

  modificar(tarea: ITarea) {
    this.eliminar(tarea.id);
    this.tareas.push(tarea);
    this.tareas.sort((a, b) => a.id < b.id ? -1 : 1);

    return this.storage.set('tareas', this.tareas);
  }

  eliminar(id: number): Promise<boolean> {
    this.tareas = this.tareas.filter(t => t.id !== id);

    return this.storage.set('tareas', this.tareas);
  }

}
