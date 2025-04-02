import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Label } from "@atoms/Label";
import { useTheme } from "@contexts/themeContext";
import { Input } from "@molecules/Input";

export default function Form(formData: any, setViewForm: any) {
  const { isDark } = useTheme();

  const onCancel = () => {
    console.log('onCancel');
    formData.onReset();
    setViewForm(false);
  }

  return (
    <Card isDark={isDark} className="p-14">
      <form className="flex flex-col gap-14">
        <div className="grid grid-cols-2 gap-14">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" label="Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="name"
              type="text"
              placeholder="Enter name"
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="name" label="Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="name"
              type="text"
              placeholder="Enter name"
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="name" label="Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="name"
              type="text"
              placeholder="Enter name"
              onCard
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="name" label="Name" isDark={isDark} />
            <Input
              isDark={isDark}
              id="name"
              type="text"
              placeholder="Enter name"
              onCard
            />
          </div>
        </div>

        <div className="flex items-center justify-between *:w-1/3 gap-14">
          <Button isCancel label="Cancel" onClick={onCancel} />
          <Button isSubmit label="Submit" type="submit" />
        </div>
      </form>
    </Card>
  )
}
