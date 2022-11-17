const initialState = {
    quizList: [
        {
            "_id": "637440e817bb6d42edbf3927",
            "showInfo": {
                "email": "dudrl0944@gmail.com",
                "title": "쇼 제목",
                "category": "일단",
                "tags": [
                    "1번",
                    "2번",
                    "3번"
                ],
                "titleImg_origin": "url",
                "titleImg_thumb": "url",
                "createDate": "2022-11-11T00:00:00.000+00:00",
                "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                "state": "작성중",
                "pulic": false
            }
        },
        {
            "_id": "637440f617bb6d42edbf3929",
            "showInfo": {
                "email": "dudrl0944@gmail.com",
                "title": "쇼 제목22",
                "category": "일단",
                "tags": [
                    "1번",
                    "2번",
                    "3번"
                ],
                "titleImg_origin": "url",
                "titleImg_thumb": "url",
                "createDate": "2022-11-11T00:00:00.000+00:00",
                "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                "state": "완성",
                "pulic": false
            }
        },
        {
            "_id": "637440f817bb6d42edbf392a",
            "showInfo": {
                "email": "dudrl0944@gmail.com",
                "title": "쇼 제목2332",
                "category": "일단",
                "tags": [
                    "1번",
                    "2번",
                    "3번"
                ],
                "titleImg_origin": "url",
                "titleImg_thumb": "url",
                "createDate": "2022-11-11T00:00:00.000+00:00",
                "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                "state": "작성중",
                "pulic": false
            }
        },
        {
            "_id": "637440fa17bb6d42edbf392b",
            "showInfo": {
                "email": "dudrl0944@gmail.com",
                "title": "쇼 제11목2332",
                "category": "일단",
                "tags": [
                    "1번",
                    "2번",
                    "3번"
                ],
                "titleImg_origin": "url",
                "titleImg_thumb": "url",
                "createDate": "2022-11-11T00:00:00.000+00:00",
                "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                "state": "완성",
                "pulic": false
            }
        }
    ]

}

export default function quizListReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_QUIZ_LIST":
            return {
                ...state,
                quizInfo: action.payload
            }
        default:
            return state;
    }
}
