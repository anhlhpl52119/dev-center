# 캐릭터 조회 API

[[toc]]

## 기능 소개
    게임에서 사용 중 인 캐릭터 정보와
    스토브 캐릭터에 등록된 캐릭터 정보를 확인 할 때 조회하는 기능 입니다.

## 연동 흐름
```mermaid

sequenceDiagram
 	participant U as User
 	participant A as WEB or Game
    participant B as STOVE 캐릭터 서비스

    Note over U, A: @ 캐릭터 조회 예시

    U ->> A  : 캐릭터 조회 요청

    activate A
        A -->> A  : 1) 게임 캐릭터 조회
        A  ->>+ B : 조회 : (GET) /game/v2.1/{game_id}/character
        B -->>- A : return
    deactivate A

```

## 기본 정보
```
GET /game/v2.1/{game_id}/character
Host: https://api.onstove.com (Live)
      https://api.gate8.com (Sandbox)
Content-Type: application/x-www-form-urlencoded
```

#### Request
#### Header
| Name          | 	Type  | 	Required | 	Default Value             | 	Example | 	Description                                                   |
|:--------------|:-------|:----------|:---------------------------|:---------|:---------------------------------------------------------------|
| Authorization | String | Y         | Bearer {user access token} | -        | 사용자의 인증을 통해 발급 되는 [user access token](/pc/References/glossary) |

#### Path Variable
| Name    | Type   | Required | Default Value | Example     | Description |
|:--------|:-------|:---------|:--------------|:------------|:------------|
| game_id | String | Y        | -             | StoveGameId | 게임 아이디  |

#### Response

#### Body
| Name    | 	Type   | 	Required | 	Default Value | 	Example | 	Description |
|:--------|:--------|:----------|:---------------|:---------|:-------------|
| code    | Integer | Y         | -              | 0        | 응답 코드        |
| message | String  | Y         | -              | OK       | 응답 메시지       |
| value   | Object  | N         | -              | -        | 응답 값         |

##### value
| Name                | 	Type   | 	Required | 	Default Value | 	Example | 	Description                                   |
|:--------------------|:--------|:----------|:---------------|:---------|:-----------------------------------------------|
| id                  | String  | Y         | 시스템 제공      | 630857aaa7b11b000714b432        | 캐릭터 아이디                                        |
| game_no             | Long    | Y         | 시스템 제공      | 2014        | 	게임번호                                          |
| game_id             | Sting   | Y         | 시스템 제공      | STOVE_GAME_ID        | 	게임아이디                                         |
| member_no           | Long    | Y         | 시스템 제공      | 28776834        | 회원번호                                           |
| nickname_flag       | String  | Y         | P              | P        | 닉네임 노출 여부</br>-P: 플랫폼 닉네임 노출</br>-G: 게임 닉네임 노출 |
| reg_dt              | Long    | -         | 시스템 제공      | 1661921422944        | 생성일시(TIMESTAMP, UTC+0)                         |
| upd_dt              | Long    | -         | 시스템 제공      | 1661921422944        | 변경일시(TIMESTAMP, UTC+0)                         |
| character_infos     | Array   | -         | -              | -        | 캐릭터정보                                          |
| main_game_character | Object  | -         | -              | -        | 메인캐릭터 정보                                       |

##### character_infos
| Name              | 	Type  | 	Required | 	Default Value | 	Example | 	Description                                                                                                                                                                                                                                                   |
|:------------------|:-------|:----------|:---------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| character_id      | String | Y	     | -	          |game_server_genearte_id        | 캐릭터 아이디                                                                                                                                                                                                                                                        |
| world_id          | String | Y	     | -	          |world_kor        | 월드 아이디                                                                                                                                                                                                                                                         |
| character_seq     | Long   | N	     | -	          |1000078        | 캐릭터 아이디 Long Type                                                                                                                                                                                                                                              |
| name              | String | Y	     | ""	          |"스토브게임케릭터명"        | 캐릭터명                                                                                                                                                                                                                                                           |
| character_info    | String | N	     | -              |{\"level\":70,\"hair\":1502,\"hair_color\":2502,\"eye_color\":5502,\"skin_color\":3501}        | 게임사별 캐릭터 정의 정보</br>-ex. 소울워커 → {\"level\":70,\"hair\":1502,\"hair_color\":2502,\"eye_color\":5502,\"skin_color\":3501}</br>-ex. 테일즈런너 →  {\"exp\":\"88959646\",\"Likeability\":\"970\",\"rank\":\"128365\",\"ladderPoint\":\"10045\",\"gameMoney\":\"339041\"} |
| profile_image_url | String | N	     | -	          | image url         | 프로필 이미지 경로                                                                                                                                                                                                                                                     |
| is_main_character | String | Y	     | N	          | N        | 메인 캐릭터 여부(Y/N)                                                                                                                                                                                                                                                 |
| level             | String | N	     | -              |"SIVLER"</br>52        | 레벨                                                                                                                                                                                                                                                             |
| reg_dt            | Long   | N         | -              |1661921422944       | 생성일시 (TIMESTAMP, UTC+0)                                                                                                                                                                                                                                        |
| upd_dt            | Long   | N         | -              |1661921422944        | 변경일시 (TIMESTAMP, UTC+0)                                                                                                                                                                                                                                        |
| exp               | Long   | N	     | -	          |89433        | 경험치                                                                                                                                                                                                                                                            |

##### main_game_character
| Name              | 	Type  | 	Required | 	Default Value | 	Example | 	Description                                                                                                                                                                                                                                                   |
|:------------------|:-------|:----------|:---------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| character_id      | String | Y         | -              | game_server_genearte_id        | 캐릭터 아이디                                                                                                                                                                                                                                                        |
| world_id          | String | N         | -              | world_kor        | 월드 아이디                                                                                                                                                                                                                                                         |
| character_seq     | Long   | N         | -              | 1000078        | 캐릭터 아이디 Long Type                                                                                                                                                                                                                                              |
| name              | String | Y         | -              | "스토브게임케릭터명"        | 캐릭터명                                                                                                                                                                                                                                                           |
| character_info    | String | N         | -              | {\"level\":70,\"hair\":1502,\"hair_color\":2502,\"eye_color\":5502,\"skin_color\":3501} | 게임사별 캐릭터 정의 정보</br>-ex. 소울워커 → {\"level\":70,\"hair\":1502,\"hair_color\":2502,\"eye_color\":5502,\"skin_color\":3501}</br>-ex. 테일즈런너 →  {\"exp\":\"88959646\",\"Likeability\":\"970\",\"rank\":\"128365\",\"ladderPoint\":\"10045\",\"gameMoney\":\"339041\"} |
| profile_image_url | String | N         | -              | image url        | 프로필 이미지 경로                                                                                                                                                                                                                                                     |
| is_main_character | String | Y         | -              | N        | 메인 캐릭터 여부(Y/N)                                                                                                                                                                                                                                                 |
| level             | String | N         | -              | "SIVLER"</br>52        | 레벨                                                                                                                                                                                                                                                             |
| reg_dt            | Long   | Y         | -              | 1661921422944        | 생성일시 (TIMESTAMP, UTC+0)                                                                                                                                                                                                                                        |
| upd_dt            | Long   | Y         | -              | 1661921422944        | 변경일시 (TIMESTAMP, UTC+0)                                                                                                                                                                                                                                        |
| exp               | Long   | N         | -              | 89433        | 경험치                                                                                                                                                                                                                                                            |

#### Sample

#### Request
```
curl --location --request GET 'https://api.onstove.com/game/v2.1/StoveGameId/character' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVfdGltZSI6MTY2MjQ1MjA1MzM0NCwibWVtYmVyX25vIjoxMDAwMDAwMDEyOTcsImFwcGxpY2F0aW9uX25vIjoxMDAwMn0.llanAiKn7TD1Z__coIGYtKnA1dUJPOYqMCUVzC-G0mN-A1Kvv-2VShldTSAne1ewPh6Dt1286Sfoj8Zm2qEeimWD2Jq0PrYCrFyVx7AAA_G8XZmTfBv-4PjlrEOyOpmY3JqGVpWxELPxfaKb05dURD8czVOCcCZJe2TuO7u8U9cCKJpiz7X16CJH99cnRynTXSP91HsmVBeOSVRZCbfDziZ7T13uQXZZM7UzH_2KnrtqKlEcrQtAelmL5GkKwHJ6oWl2lrWwK27my9qEB77bDR8h7n_WRNVavmo1pMP8opQ'
```

#### Response
```
{
    "code": 0,
    "message": "OK",
    "value": {
        "id": "630857aaa7b11b000714b432",
        "game_no": 281,
        "game_id": "StoveGameId",
        "member_no": 20005065776,
        "character_infos": [
            {
                "character_id": "woo",
                "world_id": "ko",
                "world_nm": null,
                "character_seq": 0,
                "name": "두둥",
                "character_info": "뭘까요",
                "profile_image_url": null,
                "is_main_character": "Y",
                "level": "뭘까요",
                "reg_dt": 1661913011773,
                "upd_dt": 1661913011773,
                "exp": 0
            },
            {
                "character_id": "woo11",
                "world_id": "ko",
                "world_nm": null,
                "character_seq": 1,
                "name": "두둥",
                "character_info": "뭘까요",
                "profile_image_url": null,
                "is_main_character": null,
                "level": "뭘까요",
                "reg_dt": 1661921422944,
                "upd_dt": 1661921422944,
                "exp": 0
            }
        ],
        "nickname_flag": "P",
        "reg_dt": 1661491114205,
        "upd_dt": 1661921435274,
        "main_game_character": {
            "character_id": "woo",
            "world_id": "ko",
            "world_nm": null,
            "character_seq": 0,
            "name": "두둥",
            "character_info": "뭘까요",
            "profile_image_url": null,
            "is_main_character": "Y",
            "level": "뭘까요",
            "reg_dt": 1661913011773,
            "upd_dt": 1661913011773,
            "exp": 0
        },
        "empty": false
    }
}
```

#### Return Code
| HTTP Status code | response_code | response_message     | Description                                                  |
|:-----------------|:--------------|:---------------------|:-------------------------------------------------------------|
| 200              | 0             | OK                   | 성공                                                           |
| 404              | 400           | Bad request          | 잘못된 end point로 호출할 경우                                        |
| 200              | 501           | Data not found.      | 캐릭터가 존재하지 않을 경우(member_no, game_no,game_id, character_id 기준) |
| 200              | 502           | Invalid parameter    | 유효하지 않거나 잘못된 파라미터로 호출할 경우                                    |
| 200              | 515           | Invalid AccessToken. | AccessToken이 유효하지 않을 경우                                      |
| 200              | 701           | Game not found.      | 존재하지 않은 게임일 경우(game_id 기준)                                   |
