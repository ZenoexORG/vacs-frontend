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
  const { t } = useT('vehicle');

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
            <Label htmlFor="license_plate" label={t('license_plate')} isDark={isDark} />
            <Input
              isDark={isDark}
              id="license_plate"
              type="text"
              placeholder={`${t('enter')} ${t('license_plate')}`}
              {...formData.getInputProps("license_plate")}
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
              <Option label="Authorized" value="authorized" isDark={isDark} />
              <Option label="Visitor" value="visitor" isDark={isDark} />
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="user_id" label={t('user_id')} isDark={isDark} />
            <Select
              isDark={isDark}
              id="user_id"
              placeholder={`${t('select')} ${t('user_id')}`}
              {...formData.getInputProps("user_id")}
              onCard
            >
              <Option label="123456789" value="123456789" isDark={isDark} />
              <Option label="987654321" value="987654321" isDark={isDark} />
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
