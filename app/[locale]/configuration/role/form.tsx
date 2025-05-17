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
import RoleAPI from "@hooks/configuration/role/role";
import { notifications } from "@mantine/notifications";

interface FormProps {
  formData: any;
  setViewForm: any;
  permissions: any;
  onSuccess: () => void;
}

export default function Form({
  formData,
  setViewForm,
  permissions,
  onSuccess
}: FormProps) {
  const { isDark } = useTheme();
  const { t } = useT('role');

  const [showPermissions, setShowPermissions] = useState(false);

  const onCancel = () => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const edit = formData.values.id ? true : false;

      const { permissions: newPermissions, id: newId, ...dataWithoutPermissions } = formData.values;

      console.log('dataWithoutPermissions', dataWithoutPermissions);

      const response = edit
        ? await RoleAPI.edit(newId, dataWithoutPermissions)
        : await RoleAPI.create(dataWithoutPermissions);

      if (response) {
        const permissionsIds = (newPermissions || []).map((permission: string) => {
          const perm = permissions.find((p: any) => p.name === permission);
          return perm ? perm.id : null;
        }).filter((id: any) => id !== null);

        const originalPermissions = formData.initialValues?.permissions || [];

        const permissionsChanged = JSON.stringify(originalPermissions.sort()) !== JSON.stringify((newPermissions || []).sort());

        if (permissionsChanged && permissionsIds.length > 0) {
          await RoleAPI.managePermissions(edit ? newId : response.id, { permissionIds: permissionsIds });
        }
      }

      notifications.show({
        title: t('success'),
        message: edit ? t('edit_success') : t('create_success'),
        color: 'green',
        autoClose: 5000,
      });

      onSuccess();
      setViewForm(false);
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
            allPermissions={permissions}
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
