'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { useT } from "../../../i18n/useT";

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('parameter');

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('parameters')}
      </Title>
    </div>
  );
}
