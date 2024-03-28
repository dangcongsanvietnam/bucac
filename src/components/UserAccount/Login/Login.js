import './Login.css';
import config from '../config.json';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Checkbox } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from '../Icon';



const Login = () => {
  const cfg = config.login
  const signUpLink = cfg.actions[0].links[0]
  const forgetPWLink = cfg.actions[0].links[1]

  const handleGoogleLogin = () => {
    // Thực hiện các thao tác để bắt đầu quá trình đăng nhập bằng Google
    // Ví dụ: chuyển hướng đến URL xác thực của Google
    window.location.href = 'URL của trang xác thực của Google';
  };

  const formFields = cfg.fields[0].input.reduce((obj, val) => {
    obj[val.name] = "";
    obj["rememberMe"] = false;
    return obj
  }, {})

  const [formData, setFormData] = useState(formFields)

  const onSubmit = () => {
    console.log("Submitted values:", formData);
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Form className="login-form" onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
        <h1 className="form-title">{cfg.title}</h1>
        <div className='social-group'>
          <Button type="default" className='social-link' onClick={handleGoogleLogin} style={{ width: '100%', height: '100%' }}>
            <div>
              <i class="fa-brands fa-facebook-f fa-lg icon"></i>
            </div>
            <div>
              Đăng nhập bằng Facebook
            </div>
            <span></span>
          </Button>
          <Button type="default" className='social-link' onClick={handleGoogleLogin} style={{ width: '100%', height: '100%' }}>
            <div>
              <i class="fa-brands fa-google fa-lg icon"></i>
            </div>
            <div>
              Đăng nhập bằng Google
            </div>
            <span></span>
          </Button>
          <Button type="default" className='social-link' onClick={handleGoogleLogin} style={{ width: '100%', height: '100%' }}>
          <div>
              <i class="fa-brands fa-github fa-lg icon"></i>
            </div>
            <div>
              Đăng nhập bằng Github
            </div>
            <span></span>
          </Button>
        </div>
        <div className='hr-container'>
          <h2 className='hr-line'><span>OR</span></h2>
        </div>
        {cfg.fields[0].input.map((input, inputIdx) => (
          <Form.Item
            key={inputIdx}
            name={input.name}
            rules={input.rules}
          >
            <Input
              prefix={<Icon name={input.options.icon} />}
              type={input.type}
              placeholder={input.placeholder}
              autoComplete={input.options.autocomplete.toString()}
              onChange={(e) => setFormData({ ...formData, [input.name]: e.target.value })}
              value={formData.name}
            />
          </Form.Item>
        ))}
        <Form.Item>
          <Checkbox
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            value={formData.name}
          >
            Remember me
          </Checkbox>
          <a className="login-form-forgot" href={forgetPWLink.url}>
            Forgot password
          </a>
          {cfg.actions[0]
            .buttons.filter(button => button.display === true)
            .map((btn, btnIdx) => (
              <Button
                key={btnIdx}
                type={btn.type}
                htmlType="submit"
                className="login-form-button"
              >
                {btn.value}
              </Button>
            ))}
          <div className='signup-link'>
            {signUpLink.prefix}
            <a href={signUpLink.url}>
              {" "} {signUpLink.value}
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>


  )

}

export default Login