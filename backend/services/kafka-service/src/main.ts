import { kafkaClient } from "@multi-vendor-e-commerce/common";

const consumer  = kafkaClient.consumer({ groupId: 'test-group' })

const eventQueue:any[] = [];

const validateActions = [
            "add_to_wishlist",
            "product_view",
            "add_to_cart",
            "remove_from_wishlist",
        ]

const processingQueue = async()=>{
    if(eventQueue.length == 0) return;

    const events = [...eventQueue];
    eventQueue.length=0;

    for (const event of events) {
        if(event.action =="shop_visit"){
            // update the shop analysitic
        }

        if(!event.action || !validateActions.includes(event.action)){
            continue;
        }

        try {
            // await updateUserAnalytic(event);
        } catch (error) {
            console.log('processing Event Error',error)
        }
    }
}

setInterval(processingQueue,3000);

export const consumerKafkaMessage = async ()=>{
    try {
        await consumer.connect();
        await consumer.subscribe({topic:"user-event",fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ message }) => {
                if(!message.value) return;
                const event = JSON.parse(message.value.toString());
                eventQueue.push(event);
    },  
  })
    } catch (error) {
        console.log(error);
    }
}

consumerKafkaMessage().catch((e)=>console.error(`[example/consumer] ${e.message}`, e))