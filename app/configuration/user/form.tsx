import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { Option } from "@atoms/Option";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";
import { Select } from "@molecules/Select";

interface FormProps {
  formData: any;
  setViewForm: any;
}

export default function Form({ formData, setViewForm }: FormProps) {
  const { isDark } = useTheme();

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
            <Label htmlFor="first_name" label="First Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="first_name"
              type="text"
              placeholder="Enter first name"
              {...formData.getInputProps("first_name")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="last_name" label="Last Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="last_name"
              placeholder="Enter last name"
              {...formData.getInputProps("last_name")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="id" label="Identification" isDark={isDark} />
            <Input
              isDark={isDark}
              id="id"
              type="text"
              placeholder="Enter identification"
              {...formData.getInputProps("id")}
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="role" label="Role" isDark={isDark} />
            <Select
              isDark={isDark}
              id="role"
              placeholder="Select role"
              {...formData.getInputProps("role")}
              onCard
            >
              <Option label="Admin" value="admin" isDark={isDark} />
              <Option label="Security" value="security" isDark={isDark} />
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between *:w-1/3 gap-14">
          <Button isCancel label="Cancel" isDark={isDark} onClick={onCancel} />
          <Button isSubmit label="Submit" type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </Card>
  )
}
