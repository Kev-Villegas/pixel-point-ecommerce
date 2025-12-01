import SignUpForm from "@/app/_components/auth/SignUpForm";
import { Modal } from "@/app/_components/Modal";

export default function InterceptedSignUpPage() {
  return (
    <Modal>
      <SignUpForm />
    </Modal>
  );
}
