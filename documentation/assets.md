# SITE

## dev

Admin: <https://admin-developers-dev.onstove.com/a/dashboard>
Front: <https://developers-dev2.onstove.com>

Design: <https://www.figma.com/design/RGmGCL7RkJu4cI4QbVUpfw/%EC%B0%BD%EC%9E%91%EC%9E%90-%EC%84%BC%ED%84%B0--Bubblyz-Center-?node-id=28322-19819&t=86gsWBvKWU1xQAox-0>

## back-end bật introspection hoặc cung cấp schema file

Chạy lệnh sau dể tự kéo schema về

```bash
npx graphql-codegen
```

curl để test introspection

```cURL
curl --location --request POST 'https://developers-vulcanus-api-dev.onstove.com/graphql' \
--header 'DNT: 1' \
--header 'Pragma: no-cache' \
--header 'X-Client-Lang: KO' \
--header 'X-Device-Type: pc' \
--header 'X-Lang: KO' \
--header 'X-Nation: KOREA' \
--header 'X-Timezone: Asia/Bangkok' \
--header 'X-Utc-Offset: 420' \
--header 'caller-detail: 55e45527-a1e2-413c-989d-d1b7bfc2fbeb' \
--header 'caller-id: caller-id' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n  __schema {\n    types {\n      name\n    }\n  }\n}","variables":{"tags":["gnb-depth1-ko"]}}'
```
