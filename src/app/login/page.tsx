import { LoginForm } from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/418439069_864165065712092_6088230298237830209_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4--BHJjiS88Q7kNvgENoeHL&_nc_oc=AdmWnhc5YYR1O34SAbxjNP6imwPviMN9W_asmD7-KiwTlLwyfqludbWSNEye6sgbcOs&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=3z9Bs4-o4Ox9yHwxB6U15A&oh=00_AYEOi5KHTPK1cQ5JEQiTRn1EE95B6H47BWi7u-ImN6NoVg&oe=67EAA9FD"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:contrast-less"
        />
      </div>
    </div>
  );
}
