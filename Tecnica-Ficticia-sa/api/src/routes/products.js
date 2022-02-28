const { Router } = require('express');
const axios = require ('axios');
const {Products} = require ('../db.js')
const router = Router();
//este end point me traigo los productos del json 
const Productss = async ()=>{
    try {
        const getProducts = await axios("http://localhost:5000/products")
        const allProducts = await getProducts.data.map((el)=>{
            return{
                image: el.image,
                name: el.name,
                price: el.price,
            }
        })
         await allProducts.forEach((el) => 
             Products.findOrCreate({
                 where:{image:el.image, name:el.name, price:el.price },
             })
         );
         const allPro = await Products.findAll()
         return allPro;

    } catch (error) {
        console.log(error);
        
    }
}
router.get("/", async(req, res)=>{
 try {
    let allProduct = await Productss()
    res.status(200).json(allProduct)
 } catch (error) {
     console.log(error);
 } 
})

//router.post para crear
router.post("/", async (req, res) =>{
    let {image, name, price, capacity} = req.body
    let createProduct = await Products.create({
        image,
        name,
        price,
    })
    res.send(createProduct)
})

//router.post para editar
router.post("/updateProduct", async (req, res)=>{
    try {
        const productId = req.body.id;
        const productUpdate = await Products.findOne({where: {id: productId}});
        await productUpdate.set({
            image: req.body.image,
            name: req.body.name,
            price: req.body.price,
        })
        await productUpdate.save()
        res.status(200).send({message: "Producto Editado con Exito"});
    } catch (error) {
        res.status(404).send({message: "No se pudo Editar el Producto"});
    }
})

//router.post para eliminar
router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await Products.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Deleted");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router