CREATE TABLE `group` (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    filePath VARCHAR(255),
    startTime DATETIME,
    endTime DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME,
    status VARCHAR(20),
    approveKey VARCHAR(255),
    maxCapacity INT,
    remainingCapacity INT,
    leader_id BIGINT,
    PRIMARY KEY (id)
);

CREATE TABLE group_user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    is_leader TINYINT(1) DEFAULT 0,
    is_banned TINYINT(1) DEFAULT 0,
    created_at DATETIME,
    group_id BIGINT,
    user_id BIGINT,
    PRIMARY KEY (id)
);

CREATE TABLE `user` (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255),
    is_admin TINYINT(1) DEFAULT 0,
    is_banned TINYINT(1) DEFAULT 0,
    accepted_terms TINYINT(1) DEFAULT 0,
    accepted_terms_at DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE group_history (
    id BIGINT NOT NULL AUTO_INCREMENT,
    action VARCHAR(50),
    created_at DATETIME,
    user_id BIGINT,
    group_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES `user`(id),
    FOREIGN KEY (group_id) REFERENCES `group`(id)
);


-- leader_id 컬럼에 대한 외래 키 추가
ALTER TABLE `group`
ADD CONSTRAINT fk_group_leader_id
FOREIGN KEY (leader_id) REFERENCES `user`(id);

-- group_id 컬럼에 대한 외래 키 추가
ALTER TABLE group_user
ADD CONSTRAINT fk_group_user_group_id
FOREIGN KEY (group_id) REFERENCES `group`(id);

-- user_id 컬럼에 대한 외래 키 추가
ALTER TABLE group_user
ADD CONSTRAINT fk_group_user_user_id
FOREIGN KEY (user_id) REFERENCES `user`(id);

-- user_id 컬럼에 대한 외래 키 추가
ALTER TABLE group_history
ADD CONSTRAINT fk_group_history_user_id
FOREIGN KEY (user_id) REFERENCES `user`(id);

-- group_id 컬럼에 대한 외래 키 추가
ALTER TABLE group_history
ADD CONSTRAINT fk_group_history_group_id
FOREIGN KEY (group_id) REFERENCES `group`(id);
