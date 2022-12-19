var AWS = require('aws-sdk');
var documentClinet = new AWS.DynamoDB.DocumentClient
({ apiVersion: "2012-08-10" });

const tableName = "bs-22-devTeam-02-show";

exports.handler = async (event) => {
    console.log("Received: "
        + JSON.stringify(event, null, 2));

    let response = "";

    try {
        /**
         * 삭제를 위해 id 가 필요.
         * event 에서 클라이언트가 보내온 id를 가져옴.
         */
        const id = event.pathParameters.id;

        var params = {
            TableName: tableName,
            Key: {
                id: id
            }
        }

        // 해당하는 id에 데이터를 삭제
        await documentClinet.delete(params).promise();

        response = {
            statusCode: 200
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
