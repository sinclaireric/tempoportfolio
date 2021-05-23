var aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


exports.handler = async (event, context,callback) => {
    const cognitoIdServiceProvider = new aws.CognitoIdentityServiceProvider({
        region: 'eu-central-1'
    });



    const tennantid = uuidv4();
    var params =  {
        UserAttributes: [
            {
                Name: 'custom:tennantid',
                Value: tennantid,
            }
        ],
        UserPoolId: event.userPoolId,
        Username: event.userName
    }

    cognitoIdServiceProvider.adminUpdateUserAttributes(params, async function(err, data) {
        if (err) { console.log(err, err.stack); // an error occurred

        }
        else  {


            const dynamo = new aws.DynamoDB.DocumentClient({
                region:'eu-central-1'
            });


            const id = uuidv4();
            const idmanager = uuidv4();

            const business = {

                TableName: 'semposAws',
                Item: {
                    PK: "business_" + id,
                    SK: "business_" + id,
                    tennantid: tennantid,
                    name: event.request.clientMetadata.businessName,
                    type: event.request.clientMetadata.businessType,
                    created: moment().format("DD-MM-YYYY h:mm:ss"),
                    expire:moment().add(15, 'day').format("DD-MM-YYYY hh:mm:ss"),
                    status: "1",

                }
            }

            const staff = {

                TableName: 'semposAws',
                Item: {
                    PK: "business_" + id,
                    SK: "staff_" + id,
                    tennantid: tennantid,
                    firstname: event.request.clientMetadata.firstname,
                    lastname: event.request.clientMetadata.lastname,
                    isOwner: true,
                    status: "1",
                    email: event.request.userAttributes.email,
                    phone: event.request.userAttributes.phone_number,

                }
            }

            const branch = {

                TableName: 'semposAws',
                Item: {
                    PK: "business_" + id,
                    SK: "branch_" + id,
                    tennantid: tennantid,
                    name: "branche 1",
                    status: "1",
                    email: event.request.userAttributes.email,
                    phone: event.request.userAttributes.phone_number,

                }
            }

            const roleManager = {

                TableName: 'semposAws',
                Item: {
                    PK: "role_" + idmanager,
                    SK: "role_" + id,
                    name: "MANAGER",
                    permission: ["manage_branch", "manage_pos", "list_product", "add_product", "delete_product", "update_product",
                        "list_staff", "add_staff", "delete_staff", "update_staff",
                        "list_category", "add_category", "delete_category", "update_category",
                        "list_staf", "add_staff", "delete_staff", "update_staff",
                    ],
                    description: "management général du business"

                }
            }

            const roleDirecteur = {

                TableName: 'semposAws',
                Item: {
                    PK: "role_" + uuidv4(),
                    SK: "role_" + id,
                    name: "DIRECTEUR",
                    permission: ["manage_pos", "list_product", "add_product", "delete_product", "update_product",
                        "list_staff", "add_staff", "delete_staff", "update_staff",
                        "list_category", "add_category", "delete_category", "update_category",
                        "list_staf", "add_staff", "delete_staff", "update_staff",
                    ],
                    description: "management général de la branche"

                }
            }

            const roleVendeur = {

                TableName: 'semposAws',
                Item: {
                    PK: "role_" + uuidv4(),
                    SK: "role_" + id,
                    name: "VENDEUR",
                    permission: ["make_sale", "manage_pos", "add_client", "update_client"],
                    description: "gestion du point de vente , caisse"

                }
            }


            try {
                await dynamo.put(business).promise()
            }  catch (e) {
                console.log(e)
            }

            try {
                await dynamo.put(staff).promise()
            }  catch (e) {
                console.log(e)
            }

            try {
                await dynamo.put(branch).promise()
            }  catch (e) {
                console.log(e)
            }

            try {
                await dynamo.put(roleManager).promise()
            }  catch (e) {
                console.log(e)
            }

            try {
                await dynamo.put(roleDirecteur).promise()
            }  catch (e) {
                console.log(e)
            }

            try {
                await dynamo.put(roleVendeur).promise()
            }  catch (e) {
                console.log(e)
            }




        }




    });





    callback(null,event);

};