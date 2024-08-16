# Application Configuration

- API Key와 같은 주요 정보는 [ ] 괄호처리를 해놓았습니다.

## General

```properties
spring.application.name=palluxy
server.port=8081

# Actuator
management.endpoints.web.exposure.include=health,info,metrics,env,beans,loggers,threaddump,heapdump,conditions,prometheus
management.endpoint.health.show-details=always
management.endpoint.health.probes.enabled=true
management.info.java.enabled=true
management.info.os.enabled=true
management.info.info.enabled=true
management.endpoint.metrics.enabled=true
management.endpoint.env.show-values=when-authorized
management.server.port=9092
spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
spring.jwt.secret=[your_jwt_Secret]
```

## Redis

```properties
spring.data.redis.host=[your_redis_host]
spring.data.redis.port=6379
```

## Email

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=[your_gmail]
spring.mail.password=[your_gmail_password]
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000
```

## OPENVIDU

```properties
OPENVIDU_URL=[your_OpenVidu_URL]
OPENVIDU_SECRET=[your_OpenVidu_secret]
```

## AWS S3

```properties
cloud.aws.credentials.accessKey=[your_S3_key]
cloud.aws.credentials.secretKey=[your_S3_accesskey]

cloud.aws.region.static=[your_S3_region]
cloud.aws.stack.auto=false
```

## File Upload

```properties
spring.servlet.multipart.maxFileSize=50MB
spring.servlet.multipart.maxRequestSize=50MB
```

## Claude

```properties
claude.api.url=https://api.anthropic.com/v1/messages
claude.api.key=[your_Claude_Key]
```

## Gemini

```properties
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
gemini.api.key=[your_Gemini_Key]
```
