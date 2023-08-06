const signup = new Vue
(
    {
        el: '#signup',
        data:
            {
                error:false,
                infomation: '',
                account:
                    {
                        account:'',
                        password:''
                    },
            },
        methods:
            {
                async signup()
                {
                    const res = await axios
                    ({
                        url:'http://mail.zhoujump.club:8080/get/signup',
                        params:
                            {
                                account:signup.account.account,
                                password: signup.account.password
                            }
                    })
                    console.log(res)
                    if(res.data === 'HaveAccount')
                    {
                        signup.infomation = '名称已被注册'
                        signup.error = true
                        setTimeout(function ()
                        {
                            signup.error = false
                        }, 2000);
                    }
                    else if(res.data === 'Success')
                    {
                        signup.infomation = '注册成功'
                        signup.error = true
                        setTimeout(function () {
                            signup.error = false
                        }, 2000);
                        location.href='login.html'
                    }
                    else
                    {
                        signup.infomation = '服务器出错拉'
                        signup.error = true
                        setTimeout(function () {
                            signup.error = false
                        }, 2000);
                    }
                }
            }
    }
)