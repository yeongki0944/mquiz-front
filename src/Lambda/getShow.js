var AWS = require('aws-sdk');
var documentClinet = new AWS.DynamoDB.DocumentClient
({ apiVersion: "2012-08-10" });


const tableName = "bs-22-devTeam-02-show";

exports.handler = async (event) => {
    // 클라이언트의 요청 내용을 콘솔에 출력
    console.log("Received: "
        + JSON.stringify(event, null, 2));

    let response = "";

    try {


        const id = event.pathParameters.id;

        var params = {
            TableName: tableName,
            Key: {
                id: id
            }
        }

        const show = await documentClinet.get(params).promise();
        // const show = await documentClinet.scan(params).promise();


        response = {
            statusCode: 200, //성공
            body: JSON.stringify(show) //조회된 결과
        };

    } catch (exception) {
        console.error(exception);

        response = {
            statusCode: 500, //백엔드에서 에러가 발생해서 500 코드 전송.
            body: JSON.stringify({ "Message: ": exception }) //에러 내용
        };
    }

    //요청에 대해 처리한 결과를 반환.
    return response;
};
