import './App.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Advertisement from './modules/Advertisement/Advertisement';
import AdvertisementList from './modules/AdvertisementList/AdvertisementList';
import Auth from './modules/Auth/Auth';
import NotFound from './modules/NotFound/NotFound';
import PlacementForm from './modules/PlacementForm/PlacementForm';
import { logout } from './store/AuthStore/AuthStoreSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.authStore);
  const [opened, { toggle }] = useDisclosure();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <MantineProvider>
        <Notifications />
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { desktop: true, mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Group justify="space-between" style={{ flex: 1 }}>
                Объявления
                <Group ml="xl" gap={0} visibleFrom="sm">
                  <Link to="/list" className={classes.link}>
                    <UnstyledButton className={classes.control}>
                      Список объявлений
                    </UnstyledButton>
                  </Link>
                  {isLoggedIn ? (
                    <UnstyledButton
                      className={classes.control}
                      onClick={handleLogout}
                    >
                      Выйти
                    </UnstyledButton>
                  ) : (
                    <Link to="/auth" className={classes.link}>
                      <UnstyledButton className={classes.control}>
                        Войти
                      </UnstyledButton>
                    </Link>
                  )}
                </Group>
              </Group>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar py="md" px={2}>
            <Link to="/list" className={classes.link}>
              <UnstyledButton className={classes.control} onClick={toggle}>
                Список объявлений
              </UnstyledButton>
            </Link>
            {isLoggedIn ? (
              <UnstyledButton
                className={classes.control}
                onClick={handleLogout}
              >
                Выйти
              </UnstyledButton>
            ) : (
              <Link to="/auth" className={classes.link}>
                <UnstyledButton className={classes.control}>
                  Войти
                </UnstyledButton>
              </Link>
            )}
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/form" element={<PlacementForm />} />
              <Route path="/list" element={<AdvertisementList />} />
              <Route path="/item/:id" element={<Advertisement />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </Router>
  );
}

export default App;
