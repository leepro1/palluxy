package com.palluxy.domain.user.service;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OpenviduService {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String createSession(Map<String, Object> params) {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = null;

        try {
            session = openvidu.createSession(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return session.getSessionId();
    }

    public Session getSession(String sessionId) {
        Session session = openvidu.getActiveSession(sessionId);
        return session;
    }

    public String getToken(String sessionId, Map<String, Object> params) {
        Session session = this.getSession(sessionId);
        if (session == null) {
            return null;
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = null;

        try {
            connection = session.createConnection(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return connection.getToken();
    }
}
