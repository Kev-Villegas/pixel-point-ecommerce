import SignInForm from "@/app/_components/auth/SignInForm";
import { Modal } from "@/app/_components/Modal";

export default function InterceptedSignInPage() {
  return (
    <Modal>
      <SignInForm />
    </Modal>
  );
}
