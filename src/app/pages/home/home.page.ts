import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ITarea } from 'src/app/models/tarea';
import { TareaService } from '../../services/tarea.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tareas: ITarea[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private tareaService: TareaService,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.tareaService.obtener().then(tareas => {
      this.tareas = tareas;
    });
  }

  abrirPaginaTarea(id?: number) {
    this.router.navigateByUrl(`/tarea${id !== undefined ? `/${id}` : ''}`);
  }

  async eliminar(tarea: ITarea) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: `¿Confirmas el borrado de <strong> ${tarea.titulo}? </strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { console.log('Cancel clicked'); }
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => { this.eliminarTarea(tarea.id); }
        }
      ]
    });

    await alert.present();
  }

  eliminarTarea(id: number) {
    this.tareaService.eliminar(id).then(
      () => this.tareaService.obtener().then(
        data => this.tareas = data
      )
    );
  }
}
