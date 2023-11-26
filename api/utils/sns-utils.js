import AWS from 'aws-sdk';
import dotenv from "dotenv";

// Load the environment variables
dotenv.config();

export const publishToSns = async (message) => {
    AWS.config.update({
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
    });
    
    // Create publish parameters
    const params = {
      Message: JSON.stringify(message),
      TopicArn: process.env.SNS_TOPIC_ARN
    };
    
    // Create promise and SNS service object
    const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    
    const data = await publishTextPromise;
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
}