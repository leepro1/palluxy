package com.palluxy.domain.group.service;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;

import java.util.Map;

public interface OpenviduService {

    Session createSession(Map<String, Object> params);

    Session getSession(String sessionId);

    Connection getConnection(Session session, String connectionId);

    Connection createConnection(Session session, Map<String, Object> params);

    void closeSession(Session session);

    void disconnection(Session session, Connection connection);
}
