var AWS = require('aws-sdk');
var documentClinet = new AWS.DynamoDB.DocumentClient
({ apiVersion: "2012-08-10" });

const tableName = "bs-22-devTeam-02-show";


exports.handler = async (event) => {
    console.log("Received: "
        + JSON.stringify(event, null, 2));

    let response = "";

    try {

        const id = event.pathParameters.id;
        const body = JSON.parse(event.body);

        var params = {
            TableName: tableName,
            Item: {
                id: id,
                quizInfo : body.quizInfo,
                quizData : body.quizData
            }
        };

        // 데이터
        await documentClinet.put(params).promise();

        response = {
            statusCode: 200,
            body: JSON.stringify({ id: id })
        };

    } catch (exception) {
        console.error(exception);

        response = {
            statusCode: 500, //백엔드에서 에러가 발생해서 500 코드 전송.
            body: JSON.stringify({ "Message: ": exception }) //에러 내용
        };
    }

    return response;
};
