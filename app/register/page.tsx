import Link from "next/link";
import RegistrationForm from "../components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div>
      <div className="py-4 px-4 max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
      <RegistrationForm />
    </div>
  );
}
