package com.palluxy.domain.user.dto;

import com.palluxy.domain.user.entity.User;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String nickname;
    private String email;
    private String password;

    public UserDto() {}

    public UserDto(User user) {
        this.id = user.getId();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }

}