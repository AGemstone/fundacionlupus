import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  help = [
    {
      contact: [
        { type: "facebook", address: "LupusArgentina" },
        { type: "mail", address: "fundacionlupusargentina@gmail.com" },
      ],
    },
  ];

  who_lupus = [
    `La Fundacion Lupus Argentina es un grupo de apoyo, sin fines de 
    lucro, que acompaña y da contencion a personas con diagnostico de Lupus, SAF
    y enfermedades reumaticas, como asi tambien a sus familiares y amigos que 
    soliciten ayuda.`,
    `Surgio el 19 de junio de 2012, con el objetivo de realizar una correcta 
    difusion de la enfermedad, y asi lograr la prevencion y promocion de la 
    salud en torno al LUPUS.`,
    `De la mano de un equipo conformado por pacientes, familiares, voluntarios 
    y profesionales de la salud y mediante el trabajo en red con otras 
    asociaciones de Argentina y Latinoamerica, buscamos concientizar sobre la 
    importancia de un diagnostico precoz y un tratamiento integral adecuado.`,
  ];

  what_lupus = [
    `El Lupus es una enfermedad cronica, sistemica, no contagiosa y autoinmune 
    en la que el sistema inmunitario del cuerpo erroneamente ataca celulas y 
    tejidos sanos. Puede afectar la piel, las articulaciones, los riñosnes, el 
    cerebro y otros organos`,
    `Cualquier persona puede tener Lupus, aunque suele desarrollarse entre los 
    15 y 45 años. Se presenta en niños, jovenes y adultos. El 90% de los casos 
    son mujeres.`,
    `Es una enfermedad compileInjectable, ya que los pacientes pueden tener 
    otras enfermedades como las reumaticas o el Sindrome Antifosfolipidico, 
    mas conocido como SAF`,
  ];
  how_lupus = [
    `Generamos acciones para difundir, concientizar y visibilizar la enfermedad.`,
    `Recibimos pacientes de capital y del interior en nuestra sede de Cordoba.`,
    `Brindamos acompañamiento e informacion a pacientes con Lupus y sus 
    familias.`,
    `Fomentamos el autocuidado para optimizar la calidad de vida del paciente y 
    su entorno.`,
    `Ofrecemos apoyo emocional. Contamos con un espacio terapeutico y talleres 
    con psicologos.`,
    `Damos talleres y capacitaciones sobre oficios.`,
    `Proveemos charlas para la comunidad y actividades con profesionales de la 
    salud.`,
    // `Administramos un pequeño banco con medicamentos.`,
    `Promovemos la investigacion cientifica para encontrar nuevos tratamientos 
    y la posible cura de la enfermedad.`,
  ];
}
