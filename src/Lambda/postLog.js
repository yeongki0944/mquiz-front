var AWS = require('aws-sdk');
var documentClinet = new AWS.DynamoDB.DocumentClient
({ apiVersion: "2012-08-10" });

const tableName = "bs-22-devTeam-02-log";


exports.handler = async (event) => {
    console.log("Received: "
        + JSON.stringify(event, null, 2));

    let response = "";

    try {
        /**
         * 신규 등록을 위해 id 가 필요.
         */


        const body = JSON.parse(event.body);
        const id = event.requestContext.requestId;

        var params = {
            TableName: tableName,
            Item: {
                id: id,
                showid:body.showid,
                showtitle:body.showtitle,
                playdate:body.playdate,
                quizcount:body.quizcount,
                usercount:body.usercount,
                userdata:body.userdata
            }
        };

        // 신규 데이터 등록
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
