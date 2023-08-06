package com.easymail.sever.mapper;

import com.easymail.sever.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserMapper
{
    @Select("select * from user")
    List<User> findAll();

    @Select("select * from user where account = #{account}")
    User findByAccount(String account);

    @Update("insert into user (account,password) VALUES ('${account}','${password}')")
    void SignUp(@Param("account") String account, @Param("password") String password);
}
