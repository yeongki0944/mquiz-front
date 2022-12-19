const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    const tableName = "bs-22-devTeam-02-show";

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
                            ProjectExpression: "id,quizInfo",
                            FilterExpression: "quizInfo.email=:email",
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
                            quizInfo: requestJSON.quizInfo,
                            quizData: requestJSON.quizData
                        }
                    })
                    .promise();
                body = `Added/Updated show ${requestJSON.id}`;
                break;
            case "PUT":
                let requestJSON_PUT = JSON.parse(event.body);
                await dynamo
                    .put({
                        TableName: tableName,
                        Item: {
                            id: requestJSON_PUT.id,
                            quizInfo: requestJSON_PUT.quizInfo,
                            quizData: requestJSON_PUT.quizData
                        }
                    })
                    .promise();
                body = `Added/Updated show ${requestJSON_PUT.id}`;
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