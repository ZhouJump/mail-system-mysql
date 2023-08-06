const topbar = new Vue
(
    {
        el: '#topbar',
        data:
            {
                searchlist:[],
                keyword:'',
                mode:'none',
                account:JSON.parse(localStorage.getItem('account')),
                error: false,
                infomation: ''
            },
        methods:
            {
                logout()
                {
                    topbar.account.account = ''
                    topbar.account.password = ''
                    localStorage.setItem('account',JSON.stringify(topbar.account))
                    location.href='login.html'
                },
                sentinfo(info)
                {
                    topbar.infomation = info
                    topbar.error = true
                   setTimeout(function()
                    {
                        topbar.error = false
                    }, 2000)
                },
                setview(id)
                {

                    view.mode = 'view'
                    write.mode = 'none'
                    view.letter = app.msglist.filter(item => item.id === id)
                    view.letter = view.letter[0]
                    topbar.mode = 'none'
                },
                sear()
                {
                    let keyword = topbar.keyword
                    if(keyword === '')
                        topbar .mode= 'none'
                    else {
                        topbar.searchlist = app.msglist.filter(item => item.account.includes(keyword) === true || item.theme.includes(keyword) === true)
                        topbar.mode = 'view'
                    }
                },
                searhide()
                {
                    topbar.mode = 'none'
                }

            },
        watch:
            {
                keyword(keyword)
                {
                    if(keyword === '')
                        topbar.searchlist=[]
                    else {
                        topbar.searchlist = app.msglist.filter(item => item.account.includes(keyword) === true || item.theme.includes(keyword) === true)
                        topbar.mode = 'view'
                    }
                }
            }
    }
)
const app = new Vue
(
    {
        el: '#app',
        data:
            {
                msglist:JSON.parse(localStorage.getItem('msglist'+topbar.account.account.toString())) || []
            },
        methods:
            {
                setview(index)
                {
                    view.letter = app.msglist[index]
                    view.mode = 'view'
                    write.mode = 'none'
                },
                setwrite()
                {
                    write.mode = 'view'
                    view.mode = 'none'
                },
                async update()
                {
                    const res = await axios
                    ({
                        url:'http://mail.zhoujump.club:8080/get/getmail',
                        params:
                            {
                                account:topbar.account.account,
                                password:topbar.account.password
                            }
                    })
                    if(res.data.length === 0)
                    {
                    }
                    else
                    {
                        console.log(res.data)
                        app.msglist = res.data.concat(app.msglist)
                        topbar.sentinfo('收到新消息')
                    }
                }
            },
        mounted()
        {
            if(topbar.account.account === '')
                location.href='login.html'
            this.update
            if (this.timer) {
                clearInterval(this.timer);
            } else {
                this.timer = setInterval(this.update, 5000);
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        watch:
            {
                msglist:
                    {
                        deep: true,
                        handler(msg)
                        {
                            localStorage.setItem('msglist'+topbar.account.account.toString(),JSON.stringify(msg))
                        }
                    }
            }
    }
);
const view = new Vue
(
    {
        el: '#view',
        data:
            {
                mode:'none',
                letter:{id:'0001',type:'get',account:'张三',time:'2003/6/1 6:30:03',theme:'张三的信件',text:'text'}
            },
        methods:
            {
                close_view()
                {
                    this.mode = 'none'
                },
                del(id)
                {
                    app.msglist = app.msglist.filter(item => item.id !== id)
                    topbar.sentinfo('邮件已删除')
                    this.mode = 'none'
                }
            }
    }
)
const write = new Vue
(
    {
        el: '#write',
        data:
            {
                mode:'none',
                letter:{account:'',theme:'',text:''}
            },
        methods:
            {
                close_write()
                {
                    this.mode = 'none'
                },
                async sentmail()
                {
                    if(write.letter.theme === '' || write.letter.text ==='')
                    {
                        topbar.sentinfo('请输入主题与正文')
                        return
                    }
                    const _this = this;
                    let yy = new Date().getFullYear();
                    let mm = new Date().getMonth()+1;
                    let dd = new Date().getDate();
                    let hh = new Date().getHours();
                    let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                    let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                    _this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
                    let newletter =
                        {
                            id:Math.floor(Math.random() * 100),
                            type:'sent',
                            account:write.letter.account,
                            time:_this.gettime,
                            theme:write.letter.theme,
                            text:write.letter.text,
                            from:""
                        }
                    const res = await axios
                    ({
                        url:'http://mail.zhoujump.club:8080/get/sentmail',
                        params:
                            {
                                account:topbar.account.account,
                                password:topbar.account.password,
                                text:write.letter.text,
                                theme:write.letter.theme,
                                from:write.letter.account
                            }
                    })
                    if(res.data === 'Success')
                    {
                        console.log(res.data)
                        topbar.sentinfo('发送成功')
                        app.msglist.unshift(newletter)
                        view.letter = app.msglist[0]
                        view.mode = 'view'
                        write.mode = 'none'
                    }
                    else if (res.data === 'nouser')
                        topbar.sentinfo('收件人不存在')
                    else if (res.data === 'AccountError')
                    {
                        topbar.sentinfo('请重新登录')
                        location.href='login.html'
                    }
                    else
                        topbar.sentinfo('服务器出错拉')

                }
            }
    }
)
