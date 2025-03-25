'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";

export default function AccessLog() {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>Access Log</Title>
    </div>
  );
}
