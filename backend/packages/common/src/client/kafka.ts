import { Kafka } from "kafkajs";
import { env } from "../config/createEnv";


export const kafkaClient = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
  ssl:true,
  sasl:{
    mechanism:"plain",
    password:env.KAFKA_API_KEY,
    username:env.KAFKA_API_SECRET,
  }
})