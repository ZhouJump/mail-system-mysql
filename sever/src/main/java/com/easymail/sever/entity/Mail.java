package com.easymail.sever.entity;

import lombok.Data;

@Data
public class Mail
{
    private int id;
    private String text;
    private String account;
    private String time;
    private String theme;
    private String type;
    private String fromac;
}
