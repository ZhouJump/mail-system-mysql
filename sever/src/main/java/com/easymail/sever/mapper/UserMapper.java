package com.easymail.sever.mapper;

import com.easymail.sever.entity.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper
{
    @Select("select * from user")
    List<User> findAll();

    @Select("select * from user where account = #{account}")
    User findByAccount(String account);
}
