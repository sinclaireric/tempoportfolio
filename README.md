# Documentation relative à  l'installation


## Stack

React js
Aws dynaomodb (base de données de metadata)
Aws apigateway+lambda (Api rest)
AWS cognito ( authentification utilisateurs)
cloudfare (stockage de video)

### Configuration de cloudfare

créer un compte cloudfaire , recuperer le cloudname et l'upload preset 

placer dans le fichier 'formvideo' comme suit :

let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dbxswktcp', 
        resourceType:'video',
        uploadPreset: 'p8ppgwkh'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setUrlvideo(result.info.url)
            setUrlthumb(result.info.thumbnail_url)


          }
        }
      )



### NB : VOUS AVEZ LA POSIBILITE DE CREER UN SIMPLE BACKEND POUR GERER LE STOCKAGE DE META DONNEES




### Aws api gateway + lambda

creer un compte AWS et ajouter des appels API gateway et une fonction lambda


### Aws dynano db


### Aws cognito

creer un pool d'utilisateur 




## lambda code

const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {



    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',


    };




    try {
        switch (event.httpMethod) {
            case 'DELETE':
                
                
     
    
     let paramsdel = {

                        TableName : 'videos',
                         "Key" : {
        "PK": event.pathParameters.id
    }

                    }
                
                body = await dynamo.delete(paramsdel).promise();
                break;


            case 'GET':




                    let params = {

                        TableName : 'videos',

                    }

                    const result = await dynamo.scan(params).promise()

                    body =  result.Items




                break;



            case 'POST':


                const item = JSON.parse(event.body);
                item["PK"] = ''+Date.now()+'';

                console.log(item);
                const params1 = {
                    TableName: "videos",
                    Item: item
                }
                try {
                    body = await dynamo.put(params1).promise()
                } catch (error) {
                    let errorResponse = `Error: Execution update, caused a Dynamodb error, please look at your logs.`;
                    if (error.code === 'ValidationException') {
                        if (error.message.includes('reserved keyword')) errorResponse = `Error: You're using AWS reserved keywords as attributes`;
                    }
                    console.log(error);
                }

                break;



            case 'PUT':
                body = await dynamo.update(JSON.parse(event.body)).promise();
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }






    return {
        statusCode,
        body,
        headers,
    };
};





