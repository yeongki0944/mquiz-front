const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    const tableName = "bs-22-devTeam-02-log";

    try {
        switch (event.httpMethod) {
            case "DELETE":
                await dynamo
                    .delete({
                        TableName: tableName,
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                body = `Deleted show ${event.pathParameters.id}`;
                break;
            case "GET":
                if (event.pathParameters && event.pathParameters.id) {
                    body = await dynamo
                        .get({
                            TableName: tableName,
                            Key: {
                                id: event.pathParameters.id
                            }
                        })
                        .promise();
                } else if (event.pathParameters && event.pathParameters.email) {
                    const email = event.pathParameters.email;
                    body = await dynamo
                        .scan({
                            TableName: tableName,
                            Key: {
                                "email": email
                            },
                            FilterExpression: "email=:email",
                            ExpressionAttributeValues: {
                                ":email": email
                            }
                        })
                        .promise();
                }
                break;
            case "POST":
                let requestJSON = JSON.parse(event.body);
                let id = event.requestContext.requestId;
                await dynamo
                    .put({
                        TableName: tableName,
                        Item: {
                            id: id,
                            showid:requestJSON.showid,
                            email:requestJSON.email,
                            showtitle:requestJSON.showtitle,
                            playdate:requestJSON.playdate,
                            quizcount:requestJSON.quizcount,
                            usercount:requestJSON.usercount,
                            userdata:requestJSON.userdata
                        }
                    })
                    .promise();
                body = `Added/Updated show ${id}`;
                break;
            default:
                throw new Error(`Unsupported route: "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};