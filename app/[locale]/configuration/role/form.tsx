import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { Option } from "@atoms/Option";
import Permission from "@components/modals/Permission";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { Select } from "@molecules/Select";
import { useState } from "react";
import { useT } from "../../../i18n/useT";

interface FormProps {
  formData: any;
  setViewForm: any;
}

export default function Form({ formData, setViewForm }: FormProps) {
  const { isDark } = useTheme();
  const { t } = useT('role');

  console.log(formData.values);
  const [showPermissions, setShowPermissions] = useState(false);

  const onCancel = () => {
    console.log('onCancel');
    formData.reset();
    setViewForm(false);
  }

  const togglePermission = (perm: string) => {
    const current = formData.values.permissions || [];
    const updated = current.includes(perm)
      ? current.filter((p: any) => p !== perm)
      : [...current, perm];

    formData.setFieldValue("permissions", updated);
  };

  const handleSubmit = () => {
    console.log(formData.values);
    localStorage.setItem("values", JSON.stringify(formData.values));
  };

  return (
    <Card isDark={isDark} className="p-14" size="large">
      <form className="flex flex-col gap-14">
        <div className="grid grid-cols-2 gap-14">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" label={t('name')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="name"
              type="text"
              placeholder={`${t('enter')} ${t('name')}`}
              {...formData.getInputProps("name")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="color" label={t('color')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="color"
              type="text"
              placeholder={`${t('enter')} ${t('color')}`}
              {...formData.getInputProps("color")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="type" label={t('type')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="type"
              placeholder={`${t('select')} ${t('type')}`}
              {...formData.getInputProps("type")}
              onCard
            >
              <Option label="Software" value="software" isDark={isDark} />
              <Option label="UTB" value="utb" isDark={isDark} />
            </Select>
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="permissions" label={t('permissions')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="permissions"
              type="text"
              placeholder={`${t('click_to')} ${t('select')} ${t('permissions')}`}
              onClick={() => setShowPermissions(true)}
              {...formData.getInputProps("permissions")}
              onCard
            />
          </div>

          <Permission
            isOpen={showPermissions}
            onClose={() => setShowPermissions(false)}
            permissions={formData.values.permissions || []}
            togglePermission={togglePermission}
          />
        </div>

        <div className="flex items-center justify-between *:w-1/3 gap-14">
          <Button isCancel label={t('cancel')} isDark={isDark} onClick={onCancel} />
          <Button isSubmit label={t('submit')} type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </Card>
  )
}
