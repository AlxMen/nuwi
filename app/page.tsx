

import AddLoginForm from "@/components/login/AddLoginForm";
import Header from "@/components/ui/Header";
import LoginForm from "@/components/login/LoginForm";

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-full w-full">
        <AddLoginForm >
          <LoginForm />
        </AddLoginForm>
      </div>
    </>
  );
}
