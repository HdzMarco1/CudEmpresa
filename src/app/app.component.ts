import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CrudEmpresa';
  @ViewChild('myModal') model: ElementRef | undefined;
  EmpresaOBJ: Empresa = new Empresa();
  empresaList: Empresa[] = [];


  ngOnInit(): void {
    this.MostarTodos();
  }


  MostarTodos(){
    const localData = localStorage.getItem("empresa");
    if(localData != null) {
      this.empresaList = JSON.parse(localData)
    }
  }


  abrirModel(){
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  editarEmpresa(item:any){
    this.EmpresaOBJ =  item;
    this.abrirModel();
  }

  eliminarEmpresa(item:any){
    this.EmpresaOBJ =  item;
    const Eliminar = confirm(`estas seguro que quieres eliminar esta empresa "${this.EmpresaOBJ.nombre}"`);
    if(Eliminar) {
      const currentRecord =  this.empresaList.findIndex(m=> m.id === this.EmpresaOBJ.id);
      this.empresaList.splice(currentRecord,1);
      localStorage.setItem('empresa', JSON.stringify(this.empresaList));
    }
  }

  cerrarModel(){
    this.EmpresaOBJ = new Empresa();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
    this.MostarTodos();
  }

  guardarEmpresa(){
    const isLocalPresent = localStorage.getItem("empresa");
    let validarNit = this.empresaList.findIndex(m=> m.NIT === this.EmpresaOBJ.NIT);
    if(validarNit == -1){
      if (isLocalPresent != null) {
        const arrayGuardado = JSON.parse(isLocalPresent);
        this.EmpresaOBJ.id = arrayGuardado.length + 1;
        arrayGuardado.push(this.EmpresaOBJ);
        this.empresaList = arrayGuardado;
        if(this.EmpresaOBJ.nombre == '' || this.EmpresaOBJ.direccion == ''){
          alert('no se puede agregar una epresa con capos vacio')
        }else{
          localStorage.setItem('empresa', JSON.stringify(arrayGuardado));
        } 
      } else {
        const iniciandoArray = [];
        iniciandoArray.push(this.EmpresaOBJ);
        this.EmpresaOBJ.id = 1;
        this.empresaList = iniciandoArray;
        if(this.EmpresaOBJ.nombre == '' || this.EmpresaOBJ.direccion == ''){
          alert('no se puede agregar una epresa con capos vacion')
        }else{
          localStorage.setItem('empresa', JSON.stringify(iniciandoArray));
        } 
      }
      this.cerrarModel()
    }else{
      alert('no se puede ingresar una empresa con el mismo NIT');
      this.cerrarModel()
    }
        
  }
  

  actualizarEmpresa(){
    const currentRecord =  this.empresaList.find(m=> m.id === this.EmpresaOBJ.id);
      console.log(this.empresaList);
      
      if(currentRecord?.nombre == '' || currentRecord?.direccion == '' || currentRecord?.NIT == '') {
          alert('el campo nombre no puede ir vacio') 
      }else{
        localStorage.setItem('empresa', JSON.stringify(this.empresaList));
        this.cerrarModel()
      }
  }

}

export class Empresa {
  id: number;
  nombre: any;
  NIT: string;
  fechaFundacion: string;
  direccion: string;
  

  constructor() {
    this.id = 0;
    this.direccion = '';
    this.fechaFundacion = '';
    this.NIT = '';
  }

}
