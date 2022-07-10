import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ITarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage implements OnInit {
  accion: string;
  tarea: ITarea = { titulo: '', descripcion: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.tarea = this.tareaService.obtenerPorId(+id);
    }
  }

  guardar() {
    if (this.tarea.id !== undefined) {
      this.tareaService.modificar(this.tarea);
    } else {
      this.tareaService.crear(this.tarea);
    }

    this.router.navigateByUrl('/home');
  }

}
