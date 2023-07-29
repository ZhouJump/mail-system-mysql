package com.easymail.sever.mapper;

import com.easymail.sever.entity.Mail;
import com.easymail.sever.entity.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface MailMapper
{
    @Select("select * from mail where fromac = '${account}'")
    List<Mail> findMailByAccount(String account);

    @Delete("delete from mail where fromac = '${account}'")
    void delMailByAccount(String account);

    @Update("insert into mail (fromac,text,theme,account) VALUES ('${from}','${text}','${theme}','${account}')")
    void InsertMail(@Param("account") String account,@Param("text") String text,@Param("theme") String theme,@Param("from") String from);

}
