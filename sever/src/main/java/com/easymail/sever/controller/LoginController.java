package com.easymail.sever.controller;

import com.easymail.sever.entity.Mail;
import com.easymail.sever.entity.User;
import com.easymail.sever.mapper.MailMapper;
import com.easymail.sever.mapper.UserMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping(value = "/get")
public class LoginController
{
    @Resource
    UserMapper userMapper;
    @Resource
    MailMapper mailMapper;

    @GetMapping("/login")
    public String Login(String account,String password)
    {
        User User = userMapper.findByAccount(account);
        if(User == null)
            return "NoAccount";
        else if (!Objects.equals(User.getPassword(), password))
            return "WrongPassword";
        else
            return "Success";
    }

    @GetMapping("/sentmail")
    public String SentMail(String account,String password,String text,String theme,String from)
    {
        if (!Objects.equals(Login(account, password), "Success"))
        {
            System.out.println("InsertMail:FAIL");
            return "AccountError";
        }
        else
        {
            mailMapper.InsertMail(account, text, theme, from);
            System.out.println("InsertMail:OK");
            return "Success";
        }
    }

    @GetMapping("/getmail")
    public List<Mail> Getmail(String account, String password)
    {
        if (!Objects.equals(Login(account, password), "Success"))
        {
            System.out.println("InsertMail:FAIL");
            return null;
        }
        else
        {
            List<Mail> Mail = mailMapper.findMailByAccount(account);
            mailMapper.delMailByAccount(account);
            return Mail;
        }

    }

    @GetMapping("/test")
    public String Test()
    {
        return "Success";
    }
}
