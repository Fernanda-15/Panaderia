export class Producto{
    constructor(
        public id:number,
        public codigo:number,
        public nombre:string,
        public tipo:string,
        public precio:number,
        public cantidad:number,
        public cantidad_inve:number
    ){}
}