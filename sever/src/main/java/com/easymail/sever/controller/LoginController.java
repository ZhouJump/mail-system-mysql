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

    @GetMapping("/signup")
    public String Signup(String account,String password)
    {
        User User = userMapper.findByAccount(account);
        if(User == null)
        {
            userMapper.SignUp(account, password);
            mailMapper.InsertMail
                    (
                            "系统",
                                "<h1 style=\"text-align: center;color: #3877ec\">欢迎使用</h1><h3 style=\"text-align: center;color: #3877ec\">你可以点击‘发邮件’按钮来发送第一份邮件了</h3><h2 style=\"text-align: center;color: #c9c9c9\">关注项目:<a href=\"https://gitee.com/zhoujump/mail-system-mysql\" target=\"_blank\" style=\"color: #c9c9c9\">码云</a><a href=\"https://github.com/ZhouJump/mail-system-mysql\" target=\"_blank\" style=\"color: #c9c9c9\">github</a></h2>",
                            "欢迎使用",
                                    account
                            );
            return "Success";
        }
        else
            return "HaveAccount";
    }

    @GetMapping("/sentmail")
    public String SentMail(String account,String password,String text,String theme,String from)
    {
        if (!Objects.equals(Login(account, password), "Success"))
        {
            System.out.println("InsertMail:FAIL");
            return "AccountError";
        } else if (userMapper.findByAccount(from) == null)
        {
            return "nouser";
        } else
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
