# RESTful API

Mashup : 웹 서비스를 결합해 새로운 부가가치를 창출하는 방법 (요기서 API를 사용)
REST(Representational State Transfer) : HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것

## REST 원칙

- API가 웹 서버를 통해 제공
- 경로에 메서드를 보내 서비스를 얻음 (`GET/users/[사용자 id]`)
- API 요청이 성공했는 지에 대해 status code로 알려줌
- URL은 리소스의 위치를 나타냄
- 서버에서 JSON, XML과 같은 데이터 등이 반환 (주로 JSON)
- 클라이언트 쪽에서 관리해야 할 상태가 존재하지 않고, 매번 요청을 독립적으로 발행
