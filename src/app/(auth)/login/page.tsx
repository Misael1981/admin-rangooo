import CardForm from "./components/CardForm";
import CardLogo from "./components/CardLogo";

export default function LoginPage() {
  return (
    <div className="flex p-4 items-center justify-center min-h-screen">
      <div className="flex flex-col rounded-xl border bg-white shadow-sm p-8">
        <CardLogo />
        <CardForm />
      </div>
    </div>
  );
}
