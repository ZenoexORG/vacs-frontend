'use client';

import React, { useState } from "react";

import { useTheme } from "@contexts/themeContext";
import { Button } from "@atoms/Button";
import { Checkbox } from "@atoms/Checkbox";
import { Label } from "@atoms/Label";
import { Input } from "@molecules/Input";
import { Text } from "@atoms/Text";
import { Logo } from "@atoms/Logo";
import { Link } from "@molecules/Link";
import { useT } from "../../i18n/useT";
import { useForm } from "@mantine/form";
import AuthAPI from "@hooks/auth/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { isDark } = useTheme();
  const [remember, setRemember] = useState(false);
  const { t } = useT("auth");

  const route = useRouter();

  const formData = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const values = formData.values;

      await AuthAPI.login(values);

      notifications.show({
        title: t("login"),
        message: t("loginSuccess"),
        color: 'green',
        autoClose: 5000,
      });

      route.push("/");
    } catch (error: any) {
      const messages = error.response.data.message;

      if (Array.isArray(messages)) {
        messages.forEach((message: string) => {
          notifications.show({
            title: 'Error',
            message: message,
            color: 'red',
            autoClose: 5000,
          });
        });
      } else {
        notifications.show({
          title: 'Error',
          message: messages,
          color: 'red',
          autoClose: 5000,
        });
      }
    }
  }

  return (
    <div className={`flex flex-col md:flex-row justify-between items-center min-h-screen ${isDark ? 'bg-dark-950' : 'bg-white-50'}`}>
      {/* Hero Section - Hidden on mobile, visible on md screens and up */}
      <div
        className="
          hidden md:block
          bg-hero bg-cover bg-right bg-opacity
          w-0 md:w-1/2 lg:w-2/3 h-screen 
          rounded-tr-[50px] md:rounded-tr-[100px] rounded-br-[50px] md:rounded-br-[100px]
        "
      >
        <div
          className="
            w-full h-full
            bg-black-950/10
            rounded-tr-[50px] md:rounded-tr-[100px] rounded-br-[50px] md:rounded-br-[100px]
            flex flex-col justify-end
          "
        >
          <div
            className="
              w-full h-1/3
              bg-gradient-to-b from-primary-600/0 to-primary-600
              rounded-br-[50px] md:rounded-br-[100px]
              flex flex-col justify-end
              p-5 md:p-10
            "
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white-50">VACS</h1>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="
          w-full md:w-1/2 lg:w-1/3 min-h-screen
          p-5 md:p-10
          flex flex-col justify-between
        "
      >
        <div className="flex flex-col gap-6 md:gap-10">
          <Logo
            alt="UTB Logo"
            src="/assets/icons/utb.svg"
            width={150} height={100}
            className="w-32 md:w-40 lg:w-48 h-auto self-center md:self-start"
          />

          {/* Mobile only VACS title */}
          <div className="md:hidden text-center mb-4">
            <h1 className="text-4xl font-bold text-primary-600">
              VA<span className={isDark ? 'text-white-50' : 'text-dark-950'}>CS</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            <h1 className="text-lg md:text-xl font-bold text-center md:text-left">{t("welcome")}</h1>

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Label isDark={isDark} htmlFor="username" label={t("username")} />

                <Input
                  isDark={isDark}
                  id="username"
                  placeholder={t("usernamePlaceholder")}
                  {...formData.getInputProps("username")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label isDark={isDark} htmlFor="password" label={t("password")} />

                <Input
                  isDark={isDark}
                  type="password"
                  id="password"
                  placeholder={t("passwordPlaceholder")}
                  {...formData.getInputProps("password")}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center">
                  <Checkbox isDark={isDark} id="remember" checked={remember} onChange={setRemember} />
                  <Label isDark={isDark} htmlFor="remember" label={t("remember")} />
                </div>

                <Link textType="ref" href="#" size="small">{t("forgot")}</Link>
              </div>

              <Button
                size="medium"
                isSubmit
                isDark={isDark}
                label={t("signin")}
                className="mt-2"
              />
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-8 md:mt-0">
          <Link
            textType="ref"
            logo="/assets/icons/zenoex.png"
            alt="ZenoexORG"
            target="_blank"
            width={24} height={24}
            href="https://github.com/ZenoexORG"
          >
            @ZenoexORG
          </Link>

          <Text isDark={isDark} className="text-sm">© 2025 ZenoexORG</Text>
        </div>
      </div>
    </div>
  );
}
