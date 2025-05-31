import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { Option } from "@atoms/Option";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { Select } from "@molecules/Select";
import { useT } from "../../../i18n/useT";
import EmployeeAPI from "@hooks/configuration/employee/employee";
import { notifications } from "@mantine/notifications";

interface FormProps {
  formData: any;
  setViewForm: any;
  roles: any;
  onSuccess: () => void;
}

export default function Form({
  formData,
  setViewForm,
  roles,
  onSuccess
}: FormProps) {
  const { isDark } = useTheme();
  const { t } = useT('employee');

  const onCancel = () => {
    formData.reset();
    setViewForm(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const edit = formData.values.role ? true : false;

      const { role: newRole, ...dataWithoutRole } = formData.values;

      edit
        ? await EmployeeAPI.edit(formData.values.id, dataWithoutRole)
        : await EmployeeAPI.create(formData.values);

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
            <Label htmlFor="last_name" label={t('last_name')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="last_name"
              placeholder={`${t('enter')} ${t('last_name')}`}
              {...formData.getInputProps("last_name")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="kind_id" label={t('kind_id')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="kind_id"
              placeholder={`${t('select')} ${t('kind_id')}`}
              {...formData.getInputProps("kind_id")}
              onCard
            >
              <Option label="CC" value="CC" isDark={isDark} />
              <Option label="TI" value="TI" isDark={isDark} />
              <Option label="CE" value="CE" isDark={isDark} />
            </Select>
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="id" label={t('identification')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="id"
              type="text"
              placeholder={`${t('enter')} ${t('identification')}`}
              {...formData.getInputProps("id")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="gender" label={t('gender')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="gender"
              placeholder={`${t('select')} ${t('gender')}`}
              {...formData.getInputProps("gender")}
              onCard
            >
              <Option label={t('m')} value="M" isDark={isDark} />
              <Option label={t('f')} value="F" isDark={isDark} />
              <Option label={t('o')} value="O" isDark={isDark} />
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="role_id" label={t('role')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="role_id"
              placeholder={`${t('select')} ${t('role')}`}
              {...formData.getInputProps("role_id")}
              onCard
            >
              {roles.map((role: any) => (
                <Option key={role.id} label={role.name} value={role.id} isDark={isDark} />
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="username" label={t('username')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="username"
              type="text"
              placeholder={`${t('enter')} ${t('username')}`}
              {...formData.getInputProps("username")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="password" label={t('password')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="password"
              type="password"
              placeholder={`${t('enter')} ${t('password')}`}
              {...formData.getInputProps("password")}
              onCard
            />
          </div>
        </div>

        <div className="flex items-center justify-between *:w-1/3 gap-14">
          <Button isCancel label={t('cancel')} isDark={isDark} onClick={onCancel} />
          <Button isSubmit label={t('submit')} type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </Card>
  )
}
