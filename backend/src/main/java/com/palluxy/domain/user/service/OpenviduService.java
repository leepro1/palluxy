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
    System.out.println(OPENVIDU_URL);
    System.out.println(OPENVIDU_SECRET);
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public Session createSession(Map<String, Object> params) {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = null;

        try {
            session = openvidu.createSession(properties);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return session;
    }

    public Session getSession(String sessionId) {
        Session session = openvidu.getActiveSession(sessionId);
        return session;
    }

    public Connection createConnection(Session session, Map<String, Object> params) {
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = null;

        try {
            connection = session.createConnection(properties);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return connection;
    }

    public boolean closeSession(Session session) {
        try {
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public boolean disconnection(Session session, String connectionId) {
        Connection connection = session.getConnection(connectionId);

        if (connection == null) {
            return false;
        }

        try {
            session.forceDisconnect(connection);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
