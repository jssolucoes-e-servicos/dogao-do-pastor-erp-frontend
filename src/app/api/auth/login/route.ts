// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Lógica de validação de credenciais
    if (username !== 'teste' || password !== 'teste') {
      return NextResponse.json({ message: 'Email ou senha incorretos.' }, { status: 401 });
    }
  
    // Retorna os dados do usuário em caso de sucesso
    const userData = { username, role: 'admin' }; // Adicione outros dados relevantes
    return NextResponse.json({ success: true, user: userData });

  } catch (error) {
    console.error('Erro na rota de login:', error);
    return NextResponse.json({ message: 'Ocorreu um erro interno do servidor.' }, { status: 500 });
  }
}
