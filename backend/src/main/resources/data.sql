INSERT INTO `user` (email, nickname, password, is_admin, is_banned, accepted_terms, accepted_terms_at, created_at, updated_at)
VALUES
('user1@example.com', 'user1', 'password1', false, false, true, NOW(), NOW(), NOW()),
('user2@example.com', 'user2', 'password2', false, false, true, NOW(), NOW(), NOW()),
('admin@example.com', 'admin', 'adminpassword', true, false, true, NOW(), NOW(), NOW());

INSERT INTO `group` (title, description, filePath, startTime, endTime, createdAt, updatedAt, status, approveKey, maxCapacity, remainingCapacity, leader_id)
VALUES
('Study Group', 'Study together for exams', '/path/to/file1', NOW(), NOW(), NOW(), NOW(), 'WAIT', 'approvekey1', 10, 5, 1),
('Book Club', 'Discuss books and literature', '/path/to/file2', NOW(), NOW(), NOW(), NOW(), 'REJECT', 'approvekey2', 15, 10, 2),
('Sports Club', 'Play sports together', '/path/to/file3', NOW(), NOW(), NOW(), NOW(), 'ACCEPT', 'approvekey3', 20, 15, 3);

INSERT INTO group_user (is_leader, is_banned, created_at, group_id, user_id)
VALUES
(true, false, NOW(), 1, 1),  -- user1 is leader of Study Group
(false, false, NOW(), 1, 2), -- user2 is member of Study Group
(false, false, NOW(), 2, 2), -- user2 is member of Book Club
(true, false, NOW(), 3, 3);  -- admin is leader of Sports Club