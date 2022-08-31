/*
 * @Description: 登录页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\login\index.tsx
 */
import { useNavigate } from 'react-router-dom';
import { Button, message, Form, Input, Checkbox } from 'antd';
import useStore from '@/store';
import { register, login } from '@/service';
import { normalizeResult, useCookies, encrypt, decrypt } from '@/utils';
import { LoginData } from '@/typings/common';
import styles from './index.less';

const { getCoolie, setCookie, removeCoolie } = useCookies;

const Login = () => {
  const navigate = useNavigate();
  const { userInfoStore, commonStore } = useStore();
  const [form] = Form.useForm();

  const onRegister = async () => {
    const values = await form.validateFields();
    const password = encrypt(values.password);
    const { username } = values;
    const res = normalizeResult<LoginData>(
      await register({ username, password })
    );
    if (res.success) {
      message.success(res.message);
    } else {
      res.message && message.error(res.message);
    }
  };

  const onLogin = async () => {
    const values = await form.validateFields();
    const password = encrypt(values.password);
    const { username } = values;
    const res = normalizeResult<LoginData>(await login({ username, password }));
    if (res.success) {
      const userInfo = { ...res.data };
      delete userInfo.token;
      // 将登录信息保存到store中
      userInfoStore.setUserInfo({
        ...userInfo,
      });
      localStorage.setItem('token', res.data?.token!);
      values?.remember
        ? setCookie('100', password as string, 7)
        : removeCoolie('100');
      values?.remember
        ? setCookie('uname', username, 7)
        : removeCoolie('uname');
      navigate(`${commonStore.auth.redirectUrl}` || '/article', {
        replace: true,
      });
    } else {
      res.message && message.error(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            className={styles.form}
            form={form}
            autoComplete="off"
          >
            <Form.Item
              label={<div className={styles.userInfo}>用户名</div>}
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
              initialValue={getCoolie('uname')}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label={<div className={styles.userInfo}>密码</div>}
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              initialValue={
                getCoolie('100')
                  ? decrypt(getCoolie('100') as string)
                  : undefined
              }
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              className={styles.remember}
            >
              <Checkbox>记住本次登录密码</Checkbox>
            </Form.Item>
            <Form.Item className={styles.actions}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.login}
                onClick={onLogin}
              >
                登录
              </Button>
              <Button
                htmlType="submit"
                className={styles.login}
                onClick={onRegister}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
