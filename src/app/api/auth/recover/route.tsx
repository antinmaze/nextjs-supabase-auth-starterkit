'use server'

import { createClient } from '@/utils/supabase/server'
import { NextRequest } from 'next/server'
import { buildResponse, isValidPassword } from '@/utils/auth/factory'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const formData = await request.formData()

  //control the input password from the request
  const password = formData.get('password') as string;
  if (!isValidPassword(password)) {
    let errorMessage = "The input password is not valid.";
    const responseBody = JSON.stringify({ error: errorMessage });
    return buildResponse(responseBody, 401, errorMessage);
  }

  //control the confirmed password from the request
  const confirmPassword = formData.get('confirm-password') as string;
  if (password !== confirmPassword){
    let errorMessage = "The input passwords are not the same.";
    const responseBody = JSON.stringify({ error: errorMessage });
    return buildResponse(responseBody, 401, errorMessage);
  }

  //Update Password from Supabase
  const { error } = await supabase.auth.updateUser({ password: password })
  if (error) {
    const responseBody = JSON.stringify({ error: error.message });
    return buildResponse(responseBody, error.status ?? 500, error.message);
  }
  //here Everything is OK
  const successMessage = "Congratulations, your password has been updated.";
  const responseBody = JSON.stringify({ message: successMessage });
  return buildResponse(responseBody, 200, successMessage);
}
