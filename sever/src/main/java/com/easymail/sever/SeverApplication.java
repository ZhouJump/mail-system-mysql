package com.easymail.sever;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.easymail.sever.mapper")
public class SeverApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(SeverApplication.class, args);
    }
}
