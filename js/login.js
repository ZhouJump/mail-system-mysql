const login = new Vue
    (
        {
        el: '#login',
        data:
        {
            error:false,
            account:
            {
                account:'',
                password:''
            },
        },
        methods:
        {
            async login()
            {
            const res = await axios
            ({
            url:'http://mail.zhoujump.club:8080/get/login',
            params:
        {
            account:login.account.account,
            password: login.account.password
        }
        })
            console.log(res)
            if(res.data === 'Success')
        {
            localStorage.setItem('account',JSON.stringify(login.account))
            location.href='index.html'
        }
            else
        {
            login.error = true
            setTimeout(function()
        {
            login.error = false
        }, 2000);


        }


        }

    }
    }
    )
