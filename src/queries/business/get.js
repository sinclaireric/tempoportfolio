const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient({
    region:'eu-central-1'
});

const getAll = async data => {


    const params = {

        TableName : 'semposAws',

        IndexName:'tennantid-SK-index',
        KeyConditionExpression: 'tennantid = :gsi1 AND begins_with(SK, :sk)',

        ExpressionAttributeValues: {

            ':gsi1': 'aa4d3de4-5979-4ead-8ea0-9dee2296a810',
            ':sk': 'staff'

        },
        ProjectionExpression:"isOwner,email,SK,phone",


    }

    const result = await dynamo.query(params).promise()
    return result.Items

}

getAll().then(x => {
    console.log(x)

})