const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient({
    region:'eu-central-1'
});

const addItem = async data => {

    const business1 = {

        TableName:'semposAws',
        Item: {
            PK:"bus_1234",
            SK:"bus_1234",
            name:"efood",
            EntityType:"business"
        }
    }


    const business2 = {

        TableName:'semposAws',
        Item: {
            PK:"bus_1235",
            SK:"bus_1235",
            name:"lefax",
            EntityType:"business"
        }
    }


    const branche1 = {

        TableName:'semposAws',
        Item: {
            PK:"bus_1234",
            SK:"branch_1",
            GSI1:"branch",
            name:"efood Yaounde",
            EntityType:"branch"
        }

    }


    const branche2 = {

        TableName:'semposAws',
        Item: {
            PK:"bus_1234",
            SK:"branch_2",
            GSI1:"branch",
            name:"efood douala",
            EntityType:"branch"
        }

    }

    const branche3 = {

        TableName:'semposAws',
        Item: {
            PK:"bus_1235",
            SK:"branch_1",
            GSI1:"branch",
            name:"lefax cameroun",
            EntityType:"branch"
        }

    }

    await dynamo.put(business1).promise()
    await dynamo.put(business2).promise()
    await dynamo.put(branche1).promise()
    await dynamo.put(branche2).promise()
    await dynamo.put(branche3).promise()


}

addItem()