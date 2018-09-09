export class Recipe {
    public id: number;
    public name: string;
    public price: number;
    public description: string;
    public imagepath: string;

constructor(id: number, name: string, price: number, desc: string, imgpath: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = desc;
    this.imagepath = imgpath;
}
}
