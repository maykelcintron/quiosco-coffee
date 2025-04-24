import { PrismaClient } from '../app/generated/prisma/client'
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main(){
    try{
        await prisma.category.createMany({ data: categories });
        await prisma.product.createMany({ data: products });
    }catch(e){
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })