import { Button, Flex, Stack, Tabs, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNotification } from '../../hooks/useNotification';
import { login, register } from '../../store/AuthStore/AuthStore.action';
import { AuthCredentials } from '../../store/AuthStore/AuthStore.types';

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.authStore.error);
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState<string | null>('login');

  const form = useForm<AuthCredentials>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      password: hasLength({ min: 6 }, 'Пароль должен быть длинее 6 символов'),
      email: isEmail('Неправильный формат Email'),
    },
  });

  const handleSubmit = async () => {
    const values = form.getValues();
    if (activeTab === 'login') {
      const result = await dispatch(login({ ...values }));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Вы успешно авторизовались');
        navigate('/list');
      }
    } else {
      const result = await dispatch(register({ ...values }));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Вы успешно зарегистрировались');
        navigate('/list');
      }
    }
  };

  useEffect(() => {
    if (error) showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Flex justify="center">
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        defaultValue="login"
        w={{ base: '80%', sm: 400 }}
      >
        <Tabs.List grow justify="center">
          <Tabs.Tab value="login">Войти</Tabs.Tab>
          <Tabs.Tab value="register">Зарегистрироваться</Tabs.Tab>
        </Tabs.List>
        <form
          onSubmit={form.onSubmit(() => {
            handleSubmit();
          })}
        >
          <Tabs.Panel value="login">
            <Stack gap="md" mt="md">
              <TextInput
                withAsterisk
                radius="md"
                label="Email"
                placeholder="Введите email"
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <TextInput
                withAsterisk
                radius="md"
                label="Пароль"
                placeholder="Введите пароль"
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <Button type="submit" radius="md">
                Войти
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="register">
            <Stack gap="md" mt="md">
              <TextInput
                withAsterisk
                radius="md"
                label="Email"
                placeholder="Введите email"
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <TextInput
                withAsterisk
                radius="md"
                label="Пароль"
                placeholder="Введите пароль"
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <Button type="submit" radius="md">
                Зарегистрироваться
              </Button>
            </Stack>
          </Tabs.Panel>
        </form>
      </Tabs>
    </Flex>
  );
};

export default Auth;
