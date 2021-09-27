import { Rol } from "./Rol";

export interface Usuario {
    usuario_id?: string;
    nombres?: string;
    correo?:string;
    fecha_registro?: Date;
    contrasena?: string;
    roles?:Rol[];
}
