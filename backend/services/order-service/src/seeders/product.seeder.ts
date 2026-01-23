import { prisma } from "@multi-vendor-e-commerce/common";


class ProductSeeder{
    constructor(){}
    async run(){
        
    }

    async initializeConfig(){
        const existingConfig = await prisma.site_config.findFirst();
        if(!existingConfig){
            await prisma.site_config.create({
                data:{
                    categories:[
                        "Electronic",
                        "Fashion",
                        "Home & Kitchen",
                        "Sports & Fitness"
                    ],
                    subCategories:{
                        "Electronic":["Mobile", "Laptops","Accessories","Gaming"],
                        "Fashion":["Men","Women","Kids","Footwear"],
                        "Home & Kitchen":["Furniture","Appliances","Decor"],
                        "Sports & Fitness":["Gym Equipment",
                            "Outdoor Sports",
                            "Wearables"
                        ]
                    }
                }
            })
        }
    }
}