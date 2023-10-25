const fs = require('fs')
class ProductManager{
    constructor(){
        this.products=[];
        this.path=".\back end\arhivo.txt"
    }
    AddProduct(id,title,description,price,thumbnail,code,stock){
        id=1;
        if (this.products.length>0){
            id=this.products[this.products.length-1].id+1
        }
        let producto={
            id,title,description,price,thumbnail,code,stock
        }
        this.products.push(producto)
        fs.writeFileSync(this.path,JSON.stringify(this.products,null,"\t"))
    }
    GetProducts(){
        let lectura=JSON.parse(fs.readFileSync(this.path,"utf-8"))
        return lectura
    }
    getProductById(id){
        let productos=this.GetProducts()
        let indice=productos.findIndex((producto)=>{
            producto.id===id
        })
        if(indice===-1){
            console.log("no hay ningun producto con ese ID")
            return
        }
        return this.products[indice];
    }
    updateProduct(id,title,description,price,thumbnail,code,stock){
        let busqueda=this.getProductById(id)
        let producto={
            id:this.products[busqueda].id,title,description,price,thumbnail,code,stock
        }

        if (busqueda!==-1){
            this.products[busqueda]=producto
            fs.appendFileSync(this.path,JSON.stringify(this.products,null,"\t"))
        }
        
    }
    DeleteProduct(id){
        let productos=this.GetProducts()
        let busqueda=this.getProductById(id)
        if (busqueda!==-1){
            productos.splice(busqueda,1)
            fs.appendFileSync(this.path,JSON.stringify(productos,null,"\t"))
        }
    }
}
const elemento=new ProductManager()
elemento.AddProduct(1,"hola","chau",10,"www.img.com",12345,100)