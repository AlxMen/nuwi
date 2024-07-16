import LoginForm from "@/components/login/LoginForm";
import Header from "@/components/ui/Header";
import ToastNotification from "@/components/ui/ToastNotification";

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-full w-full">
        <LoginForm />
      </div>
      <ToastNotification />
    </>
  );
}
