const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

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
                body = await dynamo.delete(JSON.parse(event.body)).promise();
                break;




            case 'GET':

                let params = {

                    TableName : 'semposAws',
                    IndexName:'tennantid-SK-index',
                    KeyConditionExpression: 'tennantid = :gsi1 AND begins_with(SK, :sk)',
                    ExpressionAttributeValues: {

                        ':gsi1': event.requestContext.authorizer.claims['custom:tennantid'],
                        ':sk': 'staff'

                    },
                    ProjectionExpression:"SK,istatus,email,created,phone,iname,role_name,branche_name",


                }

                const result = await dynamo.query(params).promise()

                body =  result.Items

                break;



            case 'POST':


                const item = JSON.parse(event.body);
                item["PK"] = "business_"+ event.requestContext.authorizer.claims['custom:tennantid'];
                item["SK"] = "staff_"+ uuidv4();
                item["created"] = moment();
                const params1 = {
                    TableName: "semposAws",
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
