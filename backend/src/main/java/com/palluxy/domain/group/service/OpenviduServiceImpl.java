package com.palluxy.domain.group.service;

import com.palluxy.global.common.error.NotFoundException;
import com.palluxy.domain.group.exception.OpenviduException;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OpenviduServiceImpl implements OpenviduService {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public Session createSession(Map<String, Object> params) {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = null;
        try {
            session = openvidu.createSession(properties);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new OpenviduException("Problem with some body parameter");
        }

        return session;
    }

    public Session getSession(String sessionId) {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new NotFoundException("session");
        }

        return session;
    }

    public Connection getConnection(Session session, String connectionId) {
        Connection connection = session.getConnection(connectionId);
        if (connection == null) {
            throw new NotFoundException("connection");
        }

        return connection;
    }

    public Connection createConnection(Session session, Map<String, Object> params) {
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = null;

        try {
            connection = session.createConnection(properties);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new OpenviduException("Problem with some body parameter");
        }

        return connection;
    }

    public void closeSession(Session session) {
        try {
            session.close();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new NotFoundException("session");
        }
    }

    public void disconnection(Session session, Connection connection) {
        try {
            session.forceDisconnect(connection);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new NotFoundException("connection");
        }
    }
}
