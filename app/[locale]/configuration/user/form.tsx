import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { Option } from "@atoms/Option";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { Select } from "@molecules/Select";
import { useT } from "../../../i18n/useT";

interface FormProps {
  formData: any;
  setViewForm: any;
}

export default function Form({ formData, setViewForm }: FormProps) {
  const { isDark } = useTheme();
  const { t } = useT('user');

  console.log(formData.values);
  const onCancel = () => {
    console.log('onCancel');
    formData.reset();
    setViewForm(false);
  }

  const handleSubmit = () => {
    console.log(formData.values);
    localStorage.setItem("values", JSON.stringify(formData.values));
  };

  return (
    <Card isDark={isDark} className="p-14" size="large">
      <form className="flex flex-col gap-14">
        <div className="grid grid-cols-2 gap-14">
          <div className="flex flex-col gap-3">
            <Label htmlFor="first_name" label={t('first_name')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="first_name"
              type="text"
              placeholder={`${t('enter')} ${t('first_name')}`}
              {...formData.getInputProps("first_name")}
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
            <Label htmlFor="role" label={t('role')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="role"
              placeholder={`${t('select')} ${t('role')}`}
              {...formData.getInputProps("role")}
              onCard
            >
              <Option label="Admin" value="admin" isDark={isDark} />
              <Option label="Security" value="security" isDark={isDark} />
            </Select>
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
