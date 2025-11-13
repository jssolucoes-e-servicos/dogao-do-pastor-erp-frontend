// components/login-form-client.tsx
"use client";

import { loginAction } from "@/actions/auth";
import { LoginForm } from "@/components/login-form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Estado inicial para o useActionState
const initialState = {
  success: true,
  message: "",
};

export function LoginFormClientWrapper() {
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    // Exibe o toast apenas se houver uma mensagem de erro
    if (!state.success && state.message) {
      toast.error(state.message);
    }

  }, [state]);

  // Passamos a 'action' do useActionState para o formulário
  return <LoginForm formAction={formAction} />;
}
//doc@registro.br  copia cnpj  contrato com alta