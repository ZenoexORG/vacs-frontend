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

export default function Auth() {
  const { isDark } = useTheme();
  const [remember, setRemember] = useState(false);

  return (
    <div className={`flex justify-between items-center ${isDark ? 'bg-dark-950' : 'bg-white-50'}`}>
      <div
        className="
          bg-hero bg-cover bg-right bg-opacity
          w-2/3 h-screen 
          rounded-tr-[100px] rounded-br-[100px]
        "
      >
        <div
          className="
            w-full h-full
            bg-black-950/10
            rounded-tr-[100px] rounded-br-[100px]
            flex flex-col justify-end
          "
        >
          <div
            className="
              w-full h-1/3
              bg-gradient-to-b from-primary-600/0 to-primary-600
              rounded-br-[100px]
              flex flex-col justify-end
              p-10
            "
          >
            <h1 className="text-8xl font-bold text-white-50">VACS</h1>
          </div>
        </div>
      </div>

      <div
        className="
          w-1/3 h-screen
          p-10
          flex flex-col justify-between
        "
      >
        <div className="flex flex-col gap-10">
          <Logo
            alt="UTB Logo"
            src="/assets/icons/utb.svg"
            width={258} height={200}
          />

          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold">Nice to see you again</h1>

            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label isDark={isDark} htmlFor="email" label="Email" />
                <Input isDark={isDark} type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="flex flex-col gap-2">
                <Label isDark={isDark} htmlFor="password" label="Password" />
                <Input isDark={isDark} type="password" id="password" placeholder="Enter your password" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Checkbox isDark={isDark} id="remeber" checked={remember} onChange={setRemember} />
                  <Label isDark={isDark} htmlFor="remember" label="Remember me" />
                </div>

                <Link textType="ref" href="#" size="small">Forgot password?</Link>
              </div>

              <Button size="medium" isSubmit isDark={isDark} label="Sign in" />
            </form>
          </div>
        </div>

        <div className="flex justify-between items-center">
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

          <Text isDark={isDark}>© 2025 ZenoexORG</Text>
        </div>
      </div>
    </div>
  );
}
