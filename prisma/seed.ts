import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {


    prisma.productsInStorages.deleteMany({});
    prisma.product.deleteMany({});

    prisma.size.deleteMany({});
    prisma.storage.deleteMany({});
    prisma.color.deleteMany({});
    prisma.shape.deleteMany({});


    const small = await prisma.size.create({
        data: {
            text: 'Klein',
            width: 30,
            height: 10,
        },
    });

    const medium = await prisma.size.create({
        data: {
            text: 'Mittel',
            width: 40,
            height: 15,
        },
    });

    const large = await prisma.size.create({
        data: {
            text: 'Groß',
            width: 50,
            height: 25,
        },
    });

    const ladbergen = await prisma.storage.create({
        data: {
            name: 'Ladbergen',
        },
    });

    const schoengeist = await prisma.storage.create({
        data: {
            name: 'Schöngeist',
        },
    });

    const white = await prisma.color.create({
        data: { text: 'Weiß', scanHex: '#FFFFFF', displayHex: '#FFFFFF' },
    });

    const gold = await prisma.color.create({
        data: { text: 'Gold', scanHex: '#FFD700', displayHex: '#FFD700' },
    });

    const pink = await prisma.color.create({
        data: { text: 'Pink', scanHex: '#FFC0CB', displayHex: '#FFC0CB' },
    });

    const neonGreen = await prisma.color.create({
        data: { text: 'Neongrün', scanHex: '#39FF14', displayHex: '#39FF14' },
    });

    const black = await prisma.color.create({
        data: { text: 'Schwarz', scanHex: '#000000', displayHex: '#000000' },
    });

    const creamWhite = await prisma.color.create({
        data: { text: 'Cremeweiß', scanHex: '#FFFDD0', displayHex: '#FFFDD0' },
    });

    const yellow = await prisma.color.create({
        data: { text: 'Gelb', scanHex: '#FFFF00', displayHex: '#FFFF00' },
    });

    const purple = await prisma.color.create({
        data: { text: 'Lila', scanHex: '#800080', displayHex: '#800080' },
    });

    const appleGreen = await prisma.color.create({
        data: { text: 'Apfelgrün', scanHex: '#8DB600', displayHex: '#8DB600' },
    });

    const gray = await prisma.color.create({
        data: { text: 'Grau', scanHex: '#808080', displayHex: '#808080' },
    });

    const gitdBlue = await prisma.color.create({
        data: { text: 'GITD (Blau)', scanHex: '#0D98BA', displayHex: '#0D98BA' },
    });

    const gitdGreen = await prisma.color.create({
        data: { text: 'GITD (Grün)', scanHex: '#00FF00', displayHex: '#00FF00' },
    });

    const orange = await prisma.color.create({
        data: { text: 'Orange', scanHex: '#FFA500', displayHex: '#FFA500' },
    });

    const lightBlue = await prisma.color.create({
        data: { text: 'Hellblau', scanHex: '#ADD8E6', displayHex: '#ADD8E6' },
    });

    const turquoise = await prisma.color.create({
        data: { text: 'Türkis', scanHex: '#40E0D0', displayHex: '#40E0D0' },
    });

    const copperBrown = await prisma.color.create({
        data: { text: 'Kupferbraun', scanHex: '#8E4D2E', displayHex: '#8E4D2E' },
    });

    const red = await prisma.color.create({
        data: { text: 'Rot', scanHex: '#FF0000', displayHex: '#FF0000' },
    });

    const darkBlue = await prisma.color.create({
        data: { text: 'Dunkelblau', scanHex: '#00008B', displayHex: '#00008B' },
    });

    const darkGreen = await prisma.color.create({
        data: { text: 'Dunkelgrün', scanHex: '#006400', displayHex: '#006400' },
    });

    const brownRed = await prisma.color.create({
        data: { text: 'Braunrot', scanHex: '#A52A2A', displayHex: '#A52A2A' },
    });

    const bike = await prisma.shape.create({
        data: { text: 'Fahrrad' },
    });

    const dog = await prisma.shape.create({
        data: { text: 'Hund' },
    });

    const car = await prisma.shape.create({
        data: { text: 'Auto' },
    });

    const house = await prisma.shape.create({
        data: { text: 'Haus' },
    });

    const anchor = await prisma.shape.create({
        data: { text: 'Anker' },
    });

    const motorbike = await prisma.shape.create({
        data: { text: 'Motorrad' },
    });

    const christmasTree = await prisma.shape.create({
        data: { text: 'Weihnachtsbaum' },
    });

    const angel = await prisma.shape.create({
        data: { text: 'Engel' },
    });

    const snowflake = await prisma.shape.create({
        data: { text: 'Schneeflocke' },
    });

    const caravan = await prisma.shape.create({
        data: { text: 'Wohnwagen' },
    });

    const camper = await prisma.shape.create({
        data: { text: 'Camper' },
    });

    const star = await prisma.shape.create({
        data: { text: 'Stern' },
    });

    const heart = await prisma.shape.create({
        data: { text: 'Herz' },
    });

    const product1 = await prisma.product.create({
        data: {
            price: 19.99,
            colorId: white.id,
            sizeId: small.id,
            shapeId: bike.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            price: 29.99,
            colorId: gold.id,
            sizeId: medium.id,
            shapeId: car.id,
        },
    });

    const product3 = await prisma.product.create({
        data: {
            price: 39.99,
            colorId: black.id,
            sizeId: large.id,
            shapeId: house.id,
        },
    });

    const product4 = await prisma.product.create({
        data: {
            price: 49.99,
            colorId: pink.id,
            sizeId: medium.id,
            shapeId: christmasTree.id,
        },
    });

    const product5 = await prisma.product.create({
        data: {
            price: 59.99,
            colorId: neonGreen.id,
            sizeId: small.id,
            shapeId: star.id,
        },
    });


    // Add products to the storage using the ProductsInStorages table
    const productInStorage1 = await prisma.productsInStorages.create({
        data: {
            productId: product1.id,
            storageId: ladbergen.id,
            sold: 0,
            is: 1,
            should: 10,
        },
    });

    const productInStorage2 = await prisma.productsInStorages.create({
        data: {
            productId: product2.id,
            storageId: schoengeist.id,
            sold: 0,
            is: 1,
            should: 20,
        },
    });

    const productInStorage3 = await prisma.productsInStorages.create({
        data: {
            productId: product3.id,
            storageId: ladbergen.id,
            sold: 0,
            is: 1,
            should: 30,
        },
    });

    const productInStorage4 = await prisma.productsInStorages.create({
        data: {
            productId: product4.id,
            storageId: schoengeist.id,
            sold: 0,
            is: 1,
            should: 40,
        },
    });

    const productInStorage5 = await prisma.productsInStorages.create({
        data: {
            productId: product5.id,
            storageId: ladbergen.id,
            sold: 0,
            is: 1,
            should: 50,
        },
    });





}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })