const fs = require('fs').promises;
const path = require('path');
const pathFile = path.resolve(__dirname, "../../public/productos.txt");
class ProductService{

    static async getAll() {
        let productos =  await fs.readFile(pathFile);

        if(productos.length > 0 ){
            productos = JSON.parse(productos);
        }else{
            productos = [];
        }
        return productos;
    }

    static async getById(id) {
        const productos = await this.getAll();
        let response = productos.find(producto => producto.id == id) || null;

        if(!response){
            response  = {
                'error' : "producto no encontrado"
            }
        }
        return response;
    }    

    static async addProduct(producto) {
        const productos = await this.getAll();
        let id = 1;
    
        if(productos.length > 0){
            id = parseInt(productos[productos.length - 1].id) + 1;
        }

        const newProducto = {...producto, id}
        productos.push(newProducto);
        await fs.writeFile(pathFile, JSON.stringify(productos));
        return {
                "msg" : `Se agrego el producto con el ID: ${id}`,
                "status" : "ok"
            };
    }    
    
    static async updateProduct(producto, id) {
        const productos = await this.getAll();
        const produIndex = productos.findIndex( produ => produ.id == id);
        console.log(produIndex)
        if(produIndex == -1){
            return {"msg" : `No existe el producto con el ID: ${id}`};
        }

        productos[produIndex] = {...producto, id};
        await fs.writeFile(path.resolve(__dirname, pathFile), JSON.stringify(productos));
        return {"msg" : `Se actualizo el producto con el ID: ${id}`};
    }   

    static async deleteProduct(id) {
            let productos = await this.getAll();

            if(productos.some(p => p.id == id)) {
                productos = productos.filter(producto => producto.id != id);
                fs.writeFile(pathFile, JSON.stringify(productos));    
                return {"msg" : `Se elimino el producto con el ID: ${id}`};                                              
            }
            return {'error' : "producto no encontrado"};
    }      

}

module.exports = ProductService;