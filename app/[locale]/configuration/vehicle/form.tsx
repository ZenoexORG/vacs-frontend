import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { Option } from "@atoms/Option";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { Select } from "@molecules/Select";
import { useT } from "../../../i18n/useT";
import VehicleAPI from "@hooks/configuration/vehicle/vehicle";
import { notifications } from "@mantine/notifications";

interface FormProps {
  formData: any;
  setViewForm: any;
  vehicleTypes: any;
  users: any;
  onSuccess: () => void;
}

export default function Form({
  formData,
  setViewForm,
  vehicleTypes,
  users,
  onSuccess
}: FormProps) {
  const { isDark } = useTheme();
  const { t } = useT('vehicle');

  const onCancel = () => {
    formData.reset();
    setViewForm(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const edit = formData.values.type ? true : false;

      const { user: newUser, type: newType, created_at: newDate, owner_fullname: newOwner, ...dataWithoutUserAndType } = formData.values;

      edit
        ? await VehicleAPI.edit(formData.values.id, dataWithoutUserAndType)
        : await VehicleAPI.create(formData.values);

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
            <Label htmlFor="id" label={t('license_plate')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="id"
              type="text"
              placeholder={`${t('enter')} ${t('license_plate')}`}
              {...formData.getInputProps("id")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="type_id" label={t('type')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="type_id"
              placeholder={`${t('select')} ${t('type')}`}
              {...formData.getInputProps("type_id")}
              onCard
            >
              {vehicleTypes.map((type: any) => (
                <Option key={type.id} label={type.name} value={type.id} isDark={isDark} />
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="owner_id" label={t('user_id')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="owner_id"
              placeholder={`${t('select')} ${t('user_id')}`}
              {...formData.getInputProps("owner_id")}
              onCard
            >
              {users.map((user: any) => (
                <Option key={user.id} label={user.name} value={user.id} isDark={isDark} />
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="soat" label="SOAT" isDark={isDark} />
            <Input
              isDark={isDark}
              id="soat"
              type="date"
              placeholder={`${t('enter')} SOAT`}
              {...formData.getInputProps("soat")}
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
